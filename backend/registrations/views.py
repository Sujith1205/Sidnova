import json
import os

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import IntegrityError
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from openpyxl import Workbook

from .models import Event, Registration

ADMIN_SESSION_KEY = "sidnova_admin_authenticated"


def _admin_password() -> str:
    return os.getenv("DJANGO_ADMIN_PASSWORD", "Sidnova@2026")


def _is_admin_authenticated(request: HttpRequest) -> bool:
    return bool(request.session.get(ADMIN_SESSION_KEY))


def _serialize_registration(registration: Registration) -> dict:
    return {
        "id": registration.id,
        "name": registration.name,
        "email": registration.email,
        "phone": registration.phone,
        "college": registration.college,
        "course": registration.course,
        "hallTicketNumber": registration.hall_ticket_number,
        "branch": registration.branch,
        "year": registration.year,
        "teamName": registration.team_name,
        "teamMembers": registration.team_members,
        "extraDetails": registration.extra_details,
        "submittedAt": timezone.localtime(registration.submitted_at).isoformat(),
    }


def _build_registrations_workbook(registrations) -> Workbook:
    workbook = Workbook()
    worksheet = workbook.active
    worksheet.title = "Registrations"
    worksheet.append(
        [
            "Submitted At",
            "Event",
            "Name",
            "Email",
            "Phone",
            "College",
            "Course",
            "Hall Ticket",
            "Branch",
            "Year",
            "Team Name",
            "Team Members",
            "Extra Details",
        ]
    )

    for registration in registrations:
        worksheet.append(
            [
                timezone.localtime(registration.submitted_at).strftime("%Y-%m-%d %H:%M:%S"),
                registration.event.title,
                registration.name,
                registration.email,
                registration.phone,
                registration.college,
                registration.course,
                registration.hall_ticket_number,
                registration.branch,
                registration.year,
                registration.team_name,
                "; ".join(
                    f"{member.get('name', '')} ({member.get('hallTicketNumber', '')})"
                    for member in registration.team_members
                ),
                "; ".join(f"{key}: {value}" for key, value in registration.extra_details.items()),
            ]
        )

    worksheet.freeze_panes = "A2"
    return workbook


def serialize_event(event: Event) -> dict:
    return {
        "slug": event.slug,
        "title": event.title,
        "subtitle": event.subtitle,
        "date": event.date_label,
        "time": event.time_label,
        "eligible": event.eligible,
        "description": event.description,
        "courses": event.course_options,
    }


@require_GET
def events_list(request: HttpRequest) -> JsonResponse:
    events = Event.objects.filter(is_active=True).order_by("date_label", "title")
    return JsonResponse({"events": [serialize_event(event) for event in events]})


@require_GET
def health_check(request: HttpRequest) -> JsonResponse:
    return JsonResponse({"status": "ok"})


@csrf_exempt
@require_POST
def admin_login(request: HttpRequest) -> JsonResponse:
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)

    password = str(payload.get("password", "")).strip()
    if password != _admin_password():
        return JsonResponse({"error": "Invalid admin password."}, status=401)

    request.session[ADMIN_SESSION_KEY] = True
    request.session.set_expiry(60 * 60 * 12)
    return JsonResponse({"message": "Admin login successful."})


@csrf_exempt
@require_POST
def admin_logout(request: HttpRequest) -> JsonResponse:
    request.session.pop(ADMIN_SESSION_KEY, None)
    return JsonResponse({"message": "Admin logout successful."})


@require_GET
def admin_session(request: HttpRequest) -> JsonResponse:
    return JsonResponse({"authenticated": _is_admin_authenticated(request)})


@require_GET
def admin_registrations_overview(request: HttpRequest) -> JsonResponse:
    if not _is_admin_authenticated(request):
        return JsonResponse({"error": "Admin authentication required."}, status=401)

    events = Event.objects.order_by("date_label", "title")
    registrations = Registration.objects.select_related("event").order_by("event__title", "-submitted_at")
    registrations_by_event: dict[int, list[Registration]] = {}
    for registration in registrations:
        registrations_by_event.setdefault(registration.event_id, []).append(registration)

    payload = []
    for event in events:
        event_registrations = registrations_by_event.get(event.id, [])
        payload.append(
            {
                "slug": event.slug,
                "title": event.title,
                "subtitle": event.subtitle,
                "date": event.date_label,
                "time": event.time_label,
                "registrationCount": len(event_registrations),
                "registrations": [_serialize_registration(registration) for registration in event_registrations],
            }
        )

    return JsonResponse({"events": payload})


@require_GET
def admin_export_event_registrations(request: HttpRequest, slug: str) -> HttpResponse:
    if not _is_admin_authenticated(request):
        return JsonResponse({"error": "Admin authentication required."}, status=401)

    event = get_object_or_404(Event, slug=slug)
    registrations = list(
        Registration.objects.select_related("event")
        .filter(event=event)
        .order_by("-submitted_at")
    )

    workbook = _build_registrations_workbook(registrations)
    timestamp = timezone.now().strftime("%Y%m%d-%H%M%S")
    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    response["Content-Disposition"] = f'attachment; filename="sidnova-{event.slug}-registrations-{timestamp}.xlsx"'
    workbook.save(response)
    return response


@require_GET
def admin_export_all_registrations(request: HttpRequest) -> HttpResponse:
    if not _is_admin_authenticated(request):
        return JsonResponse({"error": "Admin authentication required."}, status=401)

    registrations = list(
        Registration.objects.select_related("event").order_by("event__title", "-submitted_at")
    )
    workbook = _build_registrations_workbook(registrations)
    timestamp = timezone.now().strftime("%Y%m%d-%H%M%S")
    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    response["Content-Disposition"] = f'attachment; filename="sidnova-all-registrations-{timestamp}.xlsx"'
    workbook.save(response)
    return response


@csrf_exempt
@require_POST
def submit_registration(request: HttpRequest) -> JsonResponse:
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)

    required_fields = ("eventSlug", "name", "email", "phone", "college", "course")
    missing = [field for field in required_fields if not str(payload.get(field, "")).strip()]
    if missing:
        return JsonResponse({"error": f"Missing required fields: {', '.join(missing)}."}, status=400)

    try:
        validate_email(payload["email"])
    except ValidationError:
        return JsonResponse({"error": "Please enter a valid email address."}, status=400)

    phone = str(payload["phone"]).strip()
    if not phone.isdigit() or len(phone) != 10:
        return JsonResponse({"error": "Please enter a valid 10-digit phone number."}, status=400)

    try:
        event = Event.objects.get(slug=payload["eventSlug"], is_active=True)
    except Event.DoesNotExist:
        return JsonResponse({"error": "The selected event was not found."}, status=404)

    course = str(payload["course"]).strip()
    if course not in event.course_options:
        return JsonResponse({"error": "Selected course is not allowed for this event."}, status=400)

    team_name = ""
    team_members: list[dict[str, str]] = []
    hall_ticket_number = ""
    branch = ""
    year = ""
    extra_details: dict[str, object] = {}

    if event.slug in {"ai-summit", "hackathon", "parliament-simulation"}:
        hall_ticket_number = str(payload.get("hallTicketNumber", "")).strip()
        branch = str(payload.get("branch", "")).strip()
        year = str(payload.get("year", "")).strip()

        if not hall_ticket_number or not branch or not year:
            return JsonResponse(
                {"error": "Hall ticket number, branch, and year are required for this registration."},
                status=400,
            )

    if event.slug == "hackathon":
        team_name = str(payload.get("teamName", "")).strip()
        raw_members = payload.get("teamMembers", [])

        if not team_name:
            return JsonResponse({"error": "Team name is required for Hackathon."}, status=400)
        if not isinstance(raw_members, list):
            return JsonResponse({"error": "Team members must be provided as a list."}, status=400)

        for member in raw_members:
            if not isinstance(member, dict):
                return JsonResponse({"error": "Each team member must include name and hall ticket number."}, status=400)

            member_name = str(member.get("name", "")).strip()
            member_hall_ticket = str(member.get("hallTicketNumber", "")).strip()
            if not member_name or not member_hall_ticket:
                return JsonResponse({"error": "Each Hackathon team member needs a name and hall ticket number."}, status=400)

            team_members.append(
                {
                    "name": member_name,
                    "hallTicketNumber": member_hall_ticket,
                }
            )

        if len(team_members) == 0:
            return JsonResponse({"error": "Add at least one team member for Hackathon."}, status=400)

    elif event.slug == "parliament-simulation":
        team_name = str(payload.get("teamName", "")).strip()
        speaker_name = str(payload.get("speakerName", "")).strip()
        agenda_preference = str(payload.get("agendaPreference", "")).strip()
        english_only_confirmed = bool(payload.get("englishOnlyConfirmed", False))

        if not team_name:
            return JsonResponse({"error": "Team name is required for Parliament Simulation."}, status=400)
        if not speaker_name:
            return JsonResponse({"error": "Speaker name is required for Parliament Simulation."}, status=400)
        if not agenda_preference:
            return JsonResponse({"error": "Please select an agenda for Parliament Simulation."}, status=400)
        if not english_only_confirmed:
            return JsonResponse({"error": "You must accept the English-only rule for Parliament Simulation."}, status=400)

        extra_details = {
            "speakerName": speaker_name,
            "agendaPreference": agenda_preference,
            "englishOnlyConfirmed": english_only_confirmed,
        }

    try:
        registration = Registration.objects.create(
            event=event,
            name=str(payload["name"]).strip(),
            email=str(payload["email"]).strip().lower(),
            phone=phone,
            college=str(payload["college"]).strip(),
            course=course,
            hall_ticket_number=hall_ticket_number,
            branch=branch,
            year=year,
            team_name=team_name,
            team_members=team_members,
            extra_details=extra_details,
        )
    except IntegrityError:
        return JsonResponse({"error": "A registration already exists for this email and event."}, status=409)

    return JsonResponse({"message": "Registration submitted successfully.", "registrationId": registration.id}, status=201)

import csv

from django.contrib import admin
from django.http import HttpRequest, HttpResponse
from django.urls import reverse
from django.utils.html import format_html
from django.utils import timezone
from openpyxl import Workbook

from .models import Event, Registration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "date_label", "time_label", "is_active", "registration_count", "view_registrations_link")
    list_filter = ("is_active",)
    search_fields = ("title", "slug", "subtitle")

    def get_queryset(self, request: HttpRequest):
        queryset = super().get_queryset(request)
        return queryset.prefetch_related("registrations")

    def registration_count(self, obj: Event) -> int:
        return obj.registrations.count()

    registration_count.short_description = "Registrations"

    def view_registrations_link(self, obj: Event) -> str:
        url = f"{reverse('admin:registrations_registration_changelist')}?event__id__exact={obj.id}"
        return format_html('<a href="{}">View registrations</a>', url)

    view_registrations_link.short_description = "Open registrations"


@admin.action(description="Download selected registrations as CSV")
def export_registrations_csv(modeladmin, request, queryset):
    timestamp = timezone.now().strftime("%Y%m%d-%H%M%S")
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = f'attachment; filename="sidnova-registrations-{timestamp}.csv"'

    writer = csv.writer(response)
    writer.writerow(["Submitted At", "Event", "Name", "Email", "Phone", "College", "Course", "Lead Hall Ticket", "Branch", "Year", "Team Name", "Team Members", "Extra Details"])

    for registration in queryset.select_related("event"):
        writer.writerow(
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

    return response


@admin.action(description="Download selected registrations as Excel")
def export_registrations_excel(modeladmin, request, queryset):
    timestamp = timezone.now().strftime("%Y%m%d-%H%M%S")
    workbook = Workbook()
    worksheet = workbook.active
    worksheet.title = "Registrations"

    headers = [
        "Submitted At",
        "Event",
        "Name",
        "Email",
        "Phone",
        "College",
        "Course",
        "Lead Hall Ticket",
        "Branch",
        "Year",
        "Team Name",
        "Team Members",
        "Extra Details",
    ]
    worksheet.append(headers)

    for registration in queryset.select_related("event"):
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

    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    response["Content-Disposition"] = f'attachment; filename="sidnova-registrations-{timestamp}.xlsx"'
    workbook.save(response)
    return response


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ("name", "event", "course", "hall_ticket_number", "branch", "year", "team_name", "college", "email", "phone", "submitted_at")
    list_filter = ("event", "course", "submitted_at")
    search_fields = ("name", "email", "phone", "college")
    readonly_fields = ("submitted_at", "team_members_display", "extra_details_display")
    actions = (export_registrations_csv, export_registrations_excel)

    def team_members_display(self, obj):
        return ", ".join(
            f"{member.get('name', '')} ({member.get('hallTicketNumber', '')})"
            for member in obj.team_members
        )

    team_members_display.short_description = "Team members"

    def extra_details_display(self, obj):
        return ", ".join(f"{key}: {value}" for key, value in obj.extra_details.items())

    extra_details_display.short_description = "Extra details"

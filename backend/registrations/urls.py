from django.urls import path

from .views import (
    admin_export_all_registrations,
    admin_export_event_registrations,
    admin_login,
    admin_logout,
    admin_registrations_overview,
    admin_session,
    events_list,
    submit_registration,
)

urlpatterns = [
    path("events/", events_list, name="events-list"),
    path("registrations/", submit_registration, name="submit-registration"),
    path("admin/login/", admin_login, name="admin-login"),
    path("admin/logout/", admin_logout, name="admin-logout"),
    path("admin/session/", admin_session, name="admin-session"),
    path("admin/overview/", admin_registrations_overview, name="admin-overview"),
    path("admin/export/all/", admin_export_all_registrations, name="admin-export-all"),
    path("admin/export/<slug:slug>/", admin_export_event_registrations, name="admin-export-event"),
]

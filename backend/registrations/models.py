from django.db import models


class Event(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=120)
    subtitle = models.CharField(max_length=160, blank=True)
    date_label = models.CharField(max_length=60)
    time_label = models.CharField(max_length=80)
    eligible = models.CharField(max_length=160)
    description = models.TextField()
    course_options = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["date_label", "title"]

    def __str__(self) -> str:
        return self.title


class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.PROTECT, related_name="registrations")
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    college = models.CharField(max_length=160)
    course = models.CharField(max_length=60)
    hall_ticket_number = models.CharField(max_length=60, blank=True)
    branch = models.CharField(max_length=120, blank=True)
    year = models.CharField(max_length=30, blank=True)
    team_name = models.CharField(max_length=160, blank=True)
    team_members = models.JSONField(default=list, blank=True)
    extra_details = models.JSONField(default=dict, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]
        constraints = [
            models.UniqueConstraint(fields=["event", "email"], name="unique_registration_per_event_email")
        ]

    def __str__(self) -> str:
        return f"{self.name} - {self.event.title}"

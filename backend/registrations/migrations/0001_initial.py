from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Event",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(unique=True)),
                ("title", models.CharField(max_length=120)),
                ("subtitle", models.CharField(blank=True, max_length=160)),
                ("date_label", models.CharField(max_length=60)),
                ("time_label", models.CharField(max_length=80)),
                ("eligible", models.CharField(max_length=160)),
                ("description", models.TextField()),
                ("course_options", models.JSONField(blank=True, default=list)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={"ordering": ["date_label", "title"]},
        ),
        migrations.CreateModel(
            name="Registration",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=10)),
                ("college", models.CharField(max_length=160)),
                ("course", models.CharField(max_length=60)),
                ("submitted_at", models.DateTimeField(auto_now_add=True)),
                (
                    "event",
                    models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="registrations", to="registrations.event"),
                ),
            ],
            options={"ordering": ["-submitted_at"]},
        ),
        migrations.AddConstraint(
            model_name="registration",
            constraint=models.UniqueConstraint(fields=("event", "email"), name="unique_registration_per_event_email"),
        ),
    ]

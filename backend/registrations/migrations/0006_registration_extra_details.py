from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("registrations", "0005_registration_lead_hall_ticket"),
    ]

    operations = [
        migrations.AddField(
            model_name="registration",
            name="extra_details",
            field=models.JSONField(blank=True, default=dict),
        ),
    ]

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("registrations", "0003_registration_team_fields"),
    ]

    operations = [
        migrations.AddField(
            model_name="registration",
            name="branch",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AddField(
            model_name="registration",
            name="year",
            field=models.CharField(blank=True, max_length=30),
        ),
    ]

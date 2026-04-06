from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("registrations", "0002_seed_events"),
    ]

    operations = [
        migrations.AddField(
            model_name="registration",
            name="team_members",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="registration",
            name="team_name",
            field=models.CharField(blank=True, max_length=160),
        ),
    ]

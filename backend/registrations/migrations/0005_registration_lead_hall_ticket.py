from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("registrations", "0004_registration_lead_branch_year"),
    ]

    operations = [
        migrations.AddField(
            model_name="registration",
            name="hall_ticket_number",
            field=models.CharField(blank=True, max_length=60),
        ),
    ]

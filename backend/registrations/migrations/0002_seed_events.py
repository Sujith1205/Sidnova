from django.db import migrations


EVENTS = [
    {
        "slug": "ai-summit",
        "title": "AI Summit",
        "subtitle": "Defence Tech",
        "date_label": "April 16",
        "time_label": "10:00 AM - 1:00 PM",
        "eligible": "BTech & Diploma",
        "description": "Explore AI in defence technology through expert talks, panel discussions, and innovation showcases.",
        "course_options": ["B.Tech", "Diploma"],
    },
    {
        "slug": "hackathon",
        "title": "Hackathon",
        "subtitle": "Code for Impact",
        "date_label": "April 16",
        "time_label": "9:30 AM - 3:00 PM",
        "eligible": "BTech & Diploma",
        "description": "Solve real-world problems in teams. Build, pitch, and compete for exciting prizes.",
        "course_options": ["B.Tech", "Diploma"],
    },
    {
        "slug": "parliament-simulation",
        "title": "Parliament Simulation",
        "subtitle": "Education System",
        "date_label": "April 16",
        "time_label": "2:00 PM - 4:15 PM",
        "eligible": "BTech, Diploma, MBA, MCA",
        "description": "Debate real education issues in a simulated Indian Parliament format.",
        "course_options": ["B.Tech", "Diploma", "MBA", "MCA"],
    },
    {
        "slug": "pharmacy-events",
        "title": "Pharmacy Events",
        "subtitle": "Quiz - Models - Innovation",
        "date_label": "April 16",
        "time_label": "9:30 AM - 3:00 PM",
        "eligible": "Pharmacy Students",
        "description": "Pharma Quiz, Model Presentation, and Innovation Challenge - showcase pharmaceutical brilliance.",
        "course_options": ["B.Pharm", "Pharm-D"],
    },
    {
        "slug": "auto-exotica",
        "title": "Auto Exotica",
        "subtitle": "Rev Your Souls",
        "date_label": "April 17",
        "time_label": "12:00 PM - 3:00 PM",
        "eligible": "All Students",
        "description": "A thrilling auto expo with superbikes, supercars, and special guest appearances.",
        "course_options": ["B.Tech", "Diploma", "B.Pharm", "Pharm-D", "M.Tech", "MBA", "MCA"],
    },
    {
        "slug": "culturals",
        "title": "Culturals - Musical Night",
        "subtitle": "Celebrate & Perform",
        "date_label": "April 18",
        "time_label": "Evening",
        "eligible": "All Students",
        "description": "A grand musical night with live performances, cultural showcases, and celebrations.",
        "course_options": ["B.Tech", "Diploma", "B.Pharm", "Pharm-D", "M.Tech", "MBA", "MCA"],
    },
]


def seed_events(apps, schema_editor):
    Event = apps.get_model("registrations", "Event")
    for event in EVENTS:
        Event.objects.update_or_create(slug=event["slug"], defaults=event)


def clear_events(apps, schema_editor):
    Event = apps.get_model("registrations", "Event")
    Event.objects.filter(slug__in=[event["slug"] for event in EVENTS]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("registrations", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_events, clear_events),
    ]

import os

from django.http import HttpResponse


def _allowed_origins() -> set[str]:
    configured = os.getenv(
        "DJANGO_CORS_ALLOWED_ORIGINS",
        "http://127.0.0.1:8080,http://localhost:8080,http://127.0.0.1:8000,http://localhost:8000,https://sidnova.vercel.app",
    )
    return {origin.strip() for origin in configured.split(",") if origin.strip()}


class ExplicitCorsMiddleware:
    """
    Adds CORS headers for configured origins and short-circuits preflight OPTIONS
    requests. This provides a reliable fallback in hosted environments.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        origin = request.headers.get("Origin", "")
        allowed_origins = _allowed_origins()

        if request.method == "OPTIONS" and origin in allowed_origins:
            response = HttpResponse(status=200)
        else:
            response = self.get_response(request)

        if origin in allowed_origins:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-CSRFToken"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response["Vary"] = "Origin"

        return response

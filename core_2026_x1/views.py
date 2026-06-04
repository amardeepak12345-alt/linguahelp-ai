from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def chat_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        message = data.get("message", "")

        response = f"You said: {message}. This is a demo AI response."

        return JsonResponse({
            "reply": response
        })

    return JsonResponse({"error": "Only POST allowed"})
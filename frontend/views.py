from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .db import get_connection


def index(request):
    return JsonResponse({"message": "Appointment API is running"})


def appointments_list(request):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM appointments ORDER BY id DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    data = [
        {"id": r[0], "name": r[1], "date": str(r[2]), "time": str(r[3]), "reason": r[4]}
        for r in rows
    ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def insert(request):
    if request.method == "POST":
        body = json.loads(request.body)
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO appointments (name, date, time, reason) VALUES (%s, %s, %s, %s)",
            (body["name"], body["date"], body["time"], body["reason"])
        )
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse({"success": True})
    return JsonResponse({"error": "POST required"}, status=405)


@csrf_exempt
def delete_appointment(request, id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM appointments WHERE id=%s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    return JsonResponse({"success": True})


@csrf_exempt
def edit_appointment(request, id):
    conn = get_connection()
    cur = conn.cursor()
    if request.method == "POST":
        body = json.loads(request.body)
        cur.execute(
            "UPDATE appointments SET name=%s, date=%s, time=%s, reason=%s WHERE id=%s",
            (body["name"], body["date"], body["time"], body["reason"], id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse({"success": True})
    cur.execute("SELECT * FROM appointments WHERE id=%s", (id,))
    r = cur.fetchone()
    cur.close()
    conn.close()
    return JsonResponse({"id": r[0], "name": r[1], "date": str(r[2]), "time": str(r[3]), "reason": r[4]})
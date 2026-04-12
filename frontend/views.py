from django.shortcuts import render, redirect


# Create your views here.
from .db import get_connection, create_table


# CREATE + READ
def index(request):
  conn = get_connection()
  cur = conn.cursor()
  create_table()
  # READ
  cur.execute("SELECT * FROM appointments")
  data = cur.fetchall()
  print(data)
  cur.close()
  conn.close()
  return render(request, "list.html", {"datas": data})


def insert(request):
    print("check 1")
    conn = get_connection()
    cur = conn.cursor()
    
    # INSERT
    if request.method == "POST":
        name = request.POST.get("name")
        date = request.POST.get("date")
        time = request.POST.get("time")
        reason = request.POST.get("reason")
        print(name, date, time, reason)
        cur.execute(
            "INSERT INTO appointments (name, date, time, reason) VALUES (%s, %s, %s, %s)",
            (name, date, time, reason)
        )
        conn.commit()  # ✅ moved INSIDE the if block
        cur.close()
        conn.close()
        return redirect("/")  # ✅ redirect instead of render
    
    cur.close()
    conn.close()
    return redirect("/")  # ✅ fallback for GET requests
# DELETE
def delete_appointment(request, id):
  conn = get_connection()
  cur = conn.cursor()


  cur.execute("DELETE FROM appointments WHERE id=%s", (id,))
  conn.commit()


  cur.close()
  conn.close()


  return redirect("/")




# UPDATE (GET + POST)
def edit_appointment(request, id):
  conn = get_connection()
  cur = conn.cursor()


  if request.method == "POST":
      name = request.POST.get("name")
      date = request.POST.get("date")
      time = request.POST.get("time")
      reason = request.POST.get("reason")


      cur.execute(
          "UPDATE appointments SET name=%s, date=%s, time=%s, reason=%s WHERE id=%s",
          (name, date, time, reason, id)
      )
      conn.commit()
      return redirect("/")


  cur.execute("SELECT * FROM appointments WHERE id=%s", (id,))
  data = cur.fetchone()


  cur.close()
  conn.close()


  return render(request, "edit.html", {"data": data})
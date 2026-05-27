from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("api/appointments/", views.appointments_list),
    path("api/insert/", views.insert),
    path("api/delete/<int:id>/", views.delete_appointment),
    path("api/edit/<int:id>/", views.edit_appointment),
]
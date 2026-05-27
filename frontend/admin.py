from django.contrib import admin
from .models import Appointments

@admin.register(Appointments)
class AppointmentsAdmin(admin.ModelAdmin):
    list_display = ['name', 'date', 'time', 'reason']
    list_filter = ['date']
    search_fields = ['name', 'reason']
    ordering = ['-date']
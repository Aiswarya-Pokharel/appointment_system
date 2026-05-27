from django.db import models

class Appointments(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField()

    class Meta:
        db_table = 'appointments'
        managed = False
        verbose_name = 'Appointment'
        verbose_name_plural = 'Appointments' 

    def __str__(self):
        return f"{self.name} - {self.date}"
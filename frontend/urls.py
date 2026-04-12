from django.contrib import admin
from django.urls import path
from frontend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('insert/', views.insert, name='insert'),
    path('delete/<int:id>/', views.delete_appointment, name='delete'),  
    path('edit/<int:id>/', views.edit_appointment, name='edit'),  
]      
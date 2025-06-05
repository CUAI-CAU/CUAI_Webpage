# quiz/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('questions', views.get_questions, name='get_questions'),
    path('verification', views.verification, name='verification'),
    path('submit', views.submit, name='submit'),
    path('updatequestions', views.updatequestions, name='updatequestions'),
    path('viewlog', views.viewlog, name='viewlog'),
]
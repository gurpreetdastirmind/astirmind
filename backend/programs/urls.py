from django.urls import path
from .views import ProgramListCreateView, ProgramDetailView

urlpatterns = [
    path('', ProgramListCreateView.as_view(), name='program-list-create'),
    path('<int:pk>/', ProgramDetailView.as_view(), name='program-detail'),
]

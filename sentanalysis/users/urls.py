from django.urls import path
from .views import MyModelListCreateView

urlpatterns = [
    path('api/my-model/', MyModelListCreateView.as_view(), name='my-model-list-create'),
]

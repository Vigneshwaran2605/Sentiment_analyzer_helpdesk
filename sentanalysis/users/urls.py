from django.urls import path
from .views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'callanalysis', CallAnalysisReadOnlyViewSet, basename='callanalysis')


urlpatterns = [
    path('client', getClient),
    path('call-history/<int:pk>/', get_call_history, name='get_call_history'),
    path('call-history/', list_call_history, name='list_call_history'),
    path('call-history/<int:pk>/update/', update_call_history, name='update_call_history'),
    path('call-history/add',  CreateCallHistoryAPIView.as_view(), name='create_call_history'),
    path('call-history/<int:pk>/del/', delete_call_history, name='delete_call_history'),
    path('call-history/<int:pk>/audio/', send_audio_file, name='send_audio_file'),
    path('details/', details),
    path('', include(router.urls)),
]

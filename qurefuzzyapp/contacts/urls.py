from rest_framework import routers
from django.urls import path
from .api import ContactViewSet
from .api import Search

router = routers.DefaultRouter()
router.register('api/contacts', ContactViewSet, 'contacts')

urlpatterns = [
    path('api/contacts/search', Search.as_view()),
]

urlpatterns += router.urls
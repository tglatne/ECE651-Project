import sys
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product import views


router = routers.DefaultRouter()
router.register(r'product', views.ProductView, 'product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

]

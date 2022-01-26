import sys
from django.contrib import admin
from django.urls import path, include


# router = routers.DefaultRouter()
# router.register(r'product', views.ProductView, 'product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('product.urls')),

]

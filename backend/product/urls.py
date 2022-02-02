from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #for userauth
    path('', views.getRoutes, name = 'routes'),
    path('products/', views.getProducts, name = 'products'),
    path('products/<str:pk>', views.getProduct, name = 'product'),
    path('categories/', views.getCategories, name = 'categories'),
    path('categories/<str:pk>', views.getCategory, name = 'cateogry')

    # path('', include(router.urls)),

]
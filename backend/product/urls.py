from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),  # for userauth
    path('users/', views.getUsers, name='get-users'),
    path('users/register/', views.registerUser, name='register'),
    path('', views.getRoutes, name='routes'),
    path('products/', views.getProducts, name='products'),
    path('products/add/', views.addProduct, name='add-product'),
    path('products/edit/<str:pk>', views.editProduct, name='edit-product'),
    path('products/delete/<str:pk>', views.deleteProduct, name='delete-product'),
    path('users/profile/', views.getUserProfile, name='users-profile'),

    path('products/<str:pk>', views.getProduct, name='product'),
    path('categories/', views.getCategories, name='categories'),
    path('categories/<str:pk>', views.getCategory, name='cateogry'),

    path('orders/add/', views.addCartItems, name='orders-add'),
    path('orders/myorders/', views.getMyOrders, name='myorders'),
    path('orders/<str:pk>/', views.getOrderById, name='user-order'),
    




    # path('', include(router.urls)),

]

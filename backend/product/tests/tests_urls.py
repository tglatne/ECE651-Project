##URLS Unit tests

from django.test import SimpleTestCase
from django.urls import reverse, resolve
from product.views import getRoutes, getProducts, getProduct, getCategory, getCategories, getUserProfile, getUsers, registerUser

class TestUrls(SimpleTestCase):

    def test_getUsers_url_resolved(self):
        url = reverse('get-users')
        self.assertEquals(resolve(url).func, getUsers)

    def test_registerUser_url_resolved(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, registerUser)

    def test_getRoutes_url_resolved(self):
        url = reverse('routes')
        self.assertEquals(resolve(url).func, getRoutes)

    def test_getProducts_url_resolved(self):
        url = reverse('products')
        self.assertEquals(resolve(url).func, getProducts)

    def test_getUserProfile_url_resolved(self):
        url = reverse('users-profile')
        self.assertEquals(resolve(url).func, getUserProfile)

    def test_getCategories_url_resolved(self):
        url = reverse('categories')
        self.assertEquals(resolve(url).func, getCategories)

    def test_getProduct_url_resolved(self):
        url = reverse('product', args=['my_args'])
        self.assertEquals(resolve(url).func, getProduct)

    def test_getCategory_url_resolved(self):
        url = reverse('cateogry', args=['my_args'])
        self.assertEquals(resolve(url).func, getCategory)

    
    

    
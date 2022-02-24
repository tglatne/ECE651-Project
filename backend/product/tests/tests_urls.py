from django.test import SimpleTestCase
from django.urls import reverse, resolve
from product.views import getRoutes, getProducts, getProduct, getCategory, getCategories, getUserProfile, getUsers

class TestUrls(SimpleTestCase):

    def test_getRoutes_url_resolved(self):
        url = reverse('get_users')
        self.assertEquals(resolve(url).func, getRoutes)


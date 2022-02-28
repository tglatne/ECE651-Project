from unicodedata import category
from django.test import TestCase
from ..models import *

class ProductTest(TestCase):

    def setup(self):
        Product.objects.create(category='dairy', user='tejas', product_name='milk', price_walmart=2, price_sobeys=1, price_zehrs=3, description='its milk 3%')


    def test_product_category(self):
        product_milk = Product.objects.get(product_name='milk')

        self.assertEqual(product_milk, 'milk is dairy product')
from django.db import models
from django.contrib.auth.models import User
class Category(models.Model):
    category_name
class Product(models.Model):
    product_name = models.CharField(max_length= 100)
    product_price = models.FloatField(default= 0)

    def __str__(self):
        return self.product_name

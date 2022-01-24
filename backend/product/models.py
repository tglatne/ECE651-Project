from django.db import models

# Create your models here.
class Product(models.Model):
    product_name = models.CharField(max_length= 100)
    product_price = models.FloatField(default= 0)

    def __str__(self):
        return self.product_name

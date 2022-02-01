from django.db import models
from django.contrib.auth.models import User
class Category(models.Model):
    category_name = models.CharField(max_length= 100, blank= True)

    def __str__(self):
        return self.category_name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete= models.SET_NULL, null= True)
    user = models.ForeignKey(User, on_delete= models.SET_NULL, null= True)
    product_name = models.CharField(max_length= 100)
    image = models.ImageField(null= True, blank= True)
    price_walmart = models.DecimalField(max_digits= 7 , decimal_places= 3, default= 0)
    price_sobeys = models.DecimalField(max_digits= 7 , decimal_places= 3, default= 0)
    price_zehrs = models.DecimalField(max_digits= 7 , decimal_places= 3, default= 0)

    def __str__(self):
        return self.product_name


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete= models.SET_NULL, null= True)
    total_price_walmart = models.DecimalField(max_digits= 7 , decimal_places= 3, default= 0)
    total_price_sobeys = models.DecimalField(max_digits= 7 , decimal_places= 3, default= 0)
    total_price_zehrs =  models.DecimalField(max_digits= 7 , decimal_places= 3, default= 0)

    def __str__(self):
        return str(self.total_price_zehrs + self.total_price_sobeys + self.total_price_walmart)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete= models.SET_NULL, null= True)
    product = models.ForeignKey(Product, on_delete= models.SET_NULL, null= True)
    name = models.CharField(max_length= 100)
    quantity = models.IntegerField(null= True, blank= True, default= 0 )
    img = models.CharField(max_length= 100)
    price_walmart = models.DecimalField(max_digits=7, decimal_places=3, default= 0)
    price_sobeys = models.DecimalField(max_digits=7, decimal_places=3, default= 0)
    price_zehrs = models.DecimalField(max_digits=7, decimal_places=3, default= 0)

    def __str__(self):
        return self.name




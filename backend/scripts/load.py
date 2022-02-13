from product.models import Product
import csv
import os


def run():
    file = open(
        '/Volumes/Space_D/MEngInWaterloo/ECE651/Implement/ECE651-Project/backend/scripts/Data ECE651 - Fruits & Vegetables.csv')
    read_file = csv.reader(file)
    # Product.objects.all().delete()
    count = 1
    for record in read_file:
        if count == 1:
            pass
        else:
            # print("hi")
            Product.objects.create(product_name=record[0], category_id=record[1], price_walmart=record[2],
                                   price_sobeys=record[3], price_zehrs=record[4], image=record[5], walmart_url=record[6],
                                   sobeys_url=record[7], zehrs_url=record[8], description=record[9])
        count += 1

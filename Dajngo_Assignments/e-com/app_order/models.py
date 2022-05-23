from tkinter import CASCADE
from django.db import models
from django.conf import settings

# Model
from app_shop.models import Coupon, Product
# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart")
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    purchased = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.quantity} X {self.item}'

    def get_total(self):
        total = self.item.price * self.quantity
        float_total = format(total, '0.2f')
        return float_total

    def coupon_discount(self, discount=0):
        discount = (self.item.price * self.quantity*discount)/100
        return discount


    


class Order(models.Model):
    orderitems = models.ManyToManyField(Cart)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    paymentId = models.CharField(max_length=264, blank=True, null=True)
    orderId = models.CharField(max_length=200, blank=True, null=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True)
    applycoupon = models.BooleanField(default=False)

    def get_totals(self):
        total = 0
        for order_item in self.orderitems.all():
            total += float(order_item.get_total())
        return total - self.get_total_discount()

    def get_total_discount(self):
        total_discount = 0
        # print(self.applycoupon)
        if self.applycoupon:
            # print(self.orderitems.all(), self.coupon)
            # print(self.orderitems.filter(item__product_Saller = self.coupon.vendor))
            for d_item in self.orderitems.filter(item__product_Saller = self.coupon.vendor):
                total_discount += d_item.coupon_discount(self.coupon.discount)

        # print(total_discount)
        return total_discount

    def apply_coupon(self, coupon):
        self.coupon = coupon
        self.applycoupon = True
        self.save()

    def remove_coupon(self):
        self.coupon = None
        self.applycoupon = False
        self.save()

    


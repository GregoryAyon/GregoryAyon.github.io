from django.db import models
from app_login.models import User

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    product_Saller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendor", null=True, blank=True)
    mainimage = models.ImageField(upload_to='Products')
    name = models.CharField(max_length=264)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    preview_text = models.TextField(max_length=200, verbose_name='Preview Text')
    detail_text = models.TextField(max_length=1000, verbose_name='Description')
    price = models.FloatField()
    old_price = models.FloatField(default=0.00)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created',]


class Coupon(models.Model):
    vendor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="coupon_vendor", null=True)
    code = models.CharField(max_length=255, verbose_name='Coupon Code', null=True)
    short_desc = models.TextField(max_length=500, null=True, verbose_name='Short Description')
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    discount = models.FloatField(null=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.code}'

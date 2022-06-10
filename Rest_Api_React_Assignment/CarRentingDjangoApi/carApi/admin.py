from django.contrib import admin
from carApi.models import UserProfile, Car, carBook

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Car)
admin.site.register(carBook)

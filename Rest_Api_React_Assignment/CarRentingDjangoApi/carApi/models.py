from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

# Create your models here.
class UserProfileManager(BaseUserManager):
    def create_user(self, email, user_type=None, password=None):
        if not email:
            raise ValueError("The Email must be set!")
        
        email = self.normalize_email(email)
        user = self.model(email=email, user_type=user_type)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)



class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    user_type = models.CharField(max_length=155, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    objects = UserProfileManager()

    def __str__(self):
        return f"{self.email}"



class Car(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    car_name = models.CharField(max_length=255, null=True)
    car_brand = models.CharField(max_length=255, null=True)
    daily_price = models.CharField(max_length=255, null=True)
    car_image = models.ImageField(upload_to="images", null=True, blank=True)

    def __str__(self):
        return f"{self.car_name}"


class carBook(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    b_email = models.EmailField(max_length=255, null=True)
    phone = models.CharField(max_length=255, null=True)
    book_date = models.DateField(null=True)

    def __str__(self):
        return f"Date: {self.book_date} | Car: {self.car.car_name}"





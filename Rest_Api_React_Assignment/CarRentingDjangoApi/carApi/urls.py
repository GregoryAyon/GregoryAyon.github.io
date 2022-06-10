from django.urls import path
from rest_framework.routers import DefaultRouter
from carApi.views import UserProfileViewset, CarsViewset, carBookViewset
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r"user", UserProfileViewset)
router.register(r"cars", CarsViewset, basename="cars")
router.register(r"book", carBookViewset, basename="book")


urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls
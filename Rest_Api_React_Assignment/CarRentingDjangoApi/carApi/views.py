from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import filters
from carApi.models import UserProfile, Car, carBook
from carApi.serializers import UserProfileSerializer, CarSerializer, carBookSerializer

# Create your views here.
class UserProfileViewset(ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

class CarsViewset(ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    parser_classes = [FormParser, MultiPartParser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['car_name', 'car_brand', 'daily_price']

class carBookViewset(ModelViewSet):
    serializer_class = carBookSerializer
    queryset = carBook.objects.all()
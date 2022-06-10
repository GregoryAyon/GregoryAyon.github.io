from rest_framework.serializers import ModelSerializer
from carApi.models import UserProfile, Car, carBook


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            "id",
            "email",
            "user_type",
            "password",
        )

        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}}
        }

    def create(self, validated_data):
        user = UserProfile.objects.create_user(
            email=validated_data["email"],
            user_type=validated_data["user_type"],
            password=validated_data["password"],
        )

        return user

class CarSerializer(ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"


class carBookSerializer(ModelSerializer):
    class Meta:
        model = carBook
        fields = "__all__"
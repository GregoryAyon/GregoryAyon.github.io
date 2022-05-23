from django import forms
from app_shop.models import Coupon, Product

class SallerUploadForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = (
            "mainimage",
            "name",
            "category",
            "preview_text",
            "detail_text",
            "price",
            "old_price"
        )

class CouponForm(forms.ModelForm):
    class Meta:
        model = Coupon
        fields = (
            "code",
            "short_desc",
            "valid_from",
            "valid_to",
            "discount"
        )

        widgets = {
            'valid_from': forms.TextInput(attrs={'type':'datetime-local'}),
            'valid_to': forms.TextInput(attrs={'type':'datetime-local'})
        }



# Generated by Django 3.2.9 on 2022-06-08 11:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('carApi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_name', models.CharField(max_length=255, null=True)),
                ('car_brand', models.CharField(max_length=255, null=True)),
                ('daily_price', models.CharField(max_length=255, null=True)),
                ('car_image', models.ImageField(blank=True, null=True, upload_to='images')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='carBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('b_email', models.EmailField(max_length=255, null=True)),
                ('phone', models.CharField(max_length=255, null=True)),
                ('book_date', models.DateField(null=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carApi.car')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
# Generated by Django 4.0.4 on 2022-05-20 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_payment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billingaddress',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]

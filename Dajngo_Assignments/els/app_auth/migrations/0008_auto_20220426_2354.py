# Generated by Django 3.2.9 on 2022-04-26 17:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_auth', '0007_result'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='result',
            name='student_answered',
        ),
        migrations.AddField(
            model_name='result',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='student', to=settings.AUTH_USER_MODEL),
        ),
    ]

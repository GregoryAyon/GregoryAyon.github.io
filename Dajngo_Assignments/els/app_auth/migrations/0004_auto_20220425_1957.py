# Generated by Django 3.2.9 on 2022-04-25 13:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_auth', '0003_auto_20220416_1130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answer',
            field=models.CharField(choices=[('', 'Please Select'), ('Option1', 'Option1'), ('Option2', 'Option2'), ('Option3', 'Option3'), ('Option4', 'Option4')], default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='teacheruploadarticles',
            name='article',
            field=models.TextField(max_length=1080, null=True),
        ),
        migrations.CreateModel(
            name='Forum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=300)),
                ('description', models.TextField(max_length=10000, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('topic_starter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Discussion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discuss', models.TextField(max_length=10000, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('discusser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('forum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='discussions', to='app_auth.forum')),
            ],
        ),
    ]
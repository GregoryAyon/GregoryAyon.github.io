# Generated by Django 3.2.9 on 2022-04-09 14:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vidurl', models.URLField(default='https://www.youtube.com/embed/', null=True)),
                ('title', models.CharField(max_length=999, null=True)),
                ('details', models.TextField(max_length=99999, null=True)),
                ('runtime', models.CharField(max_length=255, null=True)),
                ('tviews', models.IntegerField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='vsw_app.category')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255, null=True)),
                ('comment', models.TextField(max_length=9999, null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('video', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='vsw_app.video')),
            ],
        ),
    ]

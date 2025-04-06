# Generated by Django 5.1.2 on 2025-04-06 09:00

import apps.blog.utils
import apps.main.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='image',
            field=models.ImageField(blank=True, upload_to=apps.blog.utils.PathAndRename('main/photos/'), validators=[apps.main.models.validate_image_file_size], verbose_name='Image'),
        ),
    ]

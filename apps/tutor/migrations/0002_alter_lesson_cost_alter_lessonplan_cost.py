# Generated by Django 5.1.2 on 2025-01-04 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutor', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='cost',
            field=models.FloatField(blank=True, verbose_name='Cost'),
        ),
        migrations.AlterField(
            model_name='lessonplan',
            name='cost',
            field=models.FloatField(verbose_name='Cost/hr'),
        ),
    ]

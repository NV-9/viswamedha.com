# Generated by Django 5.1 on 2024-08-18 10:05

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('desc', models.CharField(max_length=255, verbose_name='Description')),
                ('cost', models.IntegerField(verbose_name='Cost/hr (pp)')),
            ],
            options={
                'verbose_name': 'Course',
                'verbose_name_plural': 'Courses',
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('event_uuid', models.UUIDField(default=uuid.uuid4, editable=False, verbose_name='Event UUID')),
                ('start', models.DateTimeField(verbose_name='Start')),
                ('end', models.DateTimeField(verbose_name='End')),
                ('clashing', models.BooleanField(default=True, verbose_name='Clashing')),
            ],
            options={
                'verbose_name': 'Event',
                'verbose_name_plural': 'Events',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='student', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Student',
                'verbose_name_plural': 'Students',
            },
        ),
        migrations.CreateModel(
            name='LessonPlan',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cost', models.IntegerField(verbose_name='Cost/hr')),
                ('course', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_plan', to='tutor.course', verbose_name='Course')),
                ('student', models.ManyToManyField(related_name='lesson_plan', to='tutor.student', verbose_name='Student')),
            ],
            options={
                'verbose_name': 'Lesson Plan',
                'verbose_name_plural': 'Lesson Plans',
            },
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('lesson_id', models.AutoField(primary_key=True, serialize=False)),
                ('lesson_uuid', models.UUIDField(default=uuid.uuid4, editable=False, verbose_name='Lesson UUID')),
                ('event', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, parent_link=True, to='tutor.event')),
                ('cost', models.IntegerField(verbose_name='Cost')),
                ('paid', models.BooleanField(default=False, verbose_name='Paid')),
                ('lesson_plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson', to='tutor.lessonplan', verbose_name='Lesson Plan')),
                ('student', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='lesson', to='tutor.student', verbose_name='Student')),
            ],
            options={
                'verbose_name': 'Lesson',
                'verbose_name_plural': 'Lessons',
            },
            bases=('tutor.event',),
        ),
    ]

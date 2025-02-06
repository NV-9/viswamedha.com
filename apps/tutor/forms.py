from django.forms import ModelForm, BooleanField, IntegerField
from typing import Any

from apps.tutor.models import Lesson


class AddLessonForm(ModelForm):

    recurring = BooleanField(required = False)
    weeks = IntegerField(min_value = 1, max_value = 52, required = False)

    class Meta:
        model = Lesson
        fields = '__all__'
            

    def save(self, commit: bool = ...) -> Any:
        
        if self.cleaned_data['recurring'] == True:
            weeks = self.cleaned_data['weeks']
            if 1 <= weeks <= 52:
                instance: Lesson = super().save(commit)
                next = instance
                for _ in range(0, weeks):
                    next = next.next_week_lesson()
                    next.save()
                return instance
        
        return super().save(commit)
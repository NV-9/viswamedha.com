from django.db.models import Model, AutoField, CharField, TextField
from django.utils.translation import gettext_lazy as _

class Review(Model):
    """
    Review model for viswamedha.com
    """

    id       = AutoField(primary_key = True)
    initials = CharField(verbose_name = _('Initials'), max_length = 5)
    review   = TextField(verbose_name = _('Review'))

    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'

    def __str__(self):
        return "Review by " + self.initials

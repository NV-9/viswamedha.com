from uuid import uuid4

from django.db.models import Model, AutoField, ImageField, CharField, UUIDField
from django.utils.translation import gettext_lazy as _


class Photo(Model):
    """
    Photo model for viswamedha.com
    """

    id    = AutoField(primary_key = True)
    image = ImageField(upload_to = "photos")
    alt   = CharField(max_length = 255)
    
    class Meta:
        verbose_name = 'Photo'
        verbose_name_plural = 'Photos'
    
    def __str__(self):
        return self.alt

class Reference(Model):
    """
    Reference model for viswamedha.com
    """
            
    id    = AutoField(primary_key = True)
    path  = UUIDField(verbose_name = _('Reference UUID'), default = uuid4, editable = False)
    name  = CharField(verbose_name = _('Name'), max_length = 64, unique = True)
    value = CharField(verbose_name = _('Value'), max_length = 1024)

    class Meta:
        verbose_name = 'Reference'
        verbose_name_plural = 'References'
    
    def __str__(self):
        return self.name

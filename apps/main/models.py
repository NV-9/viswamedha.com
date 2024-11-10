from uuid import uuid4

from django.db.models import Model, AutoField, ImageField, CharField, UUIDField, URLField
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
    name  = CharField(verbose_name = _('Name'), max_length = 64, unique = True)
    value = CharField(verbose_name = _('Value'), max_length = 1024, blank = True, null = True)
    url   = URLField(verbose_name = _('URL'), max_length = 1024, blank = True, null = True)

    class Meta:
        verbose_name = 'Reference'
        verbose_name_plural = 'References'
    
    def __str__(self):
        return self.name

class ContactMessage(Model):
    """
    ContactMessage model for viswamedha.com
    """

    id      = AutoField(primary_key = True)
    name    = CharField(verbose_name = _('Name'), max_length = 64)
    email   = CharField(verbose_name = _('Email'), max_length = 64)
    subject = CharField(verbose_name = _('Subject'), max_length = 64)
    message = CharField(verbose_name = _('Message'), max_length = 1024)

    class Meta:
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'
    
    def __str__(self):
        return self.name
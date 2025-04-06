from uuid import uuid4

from django.core.exceptions import ValidationError
from django.db.models import Model, AutoField, ImageField, CharField, URLField
from django.utils.translation import gettext_lazy as _

from apps.blog.utils import PathAndRename


def validate_image_file_size(image):
    max_size = 5 * 1024 * 1024 
    if image.size > max_size:
        raise ValidationError(f"Image file size should not exceed 5MB.")

class Photo(Model):
    """
    Photo model for viswamedha.com
    """

    image_path_folder = 'main/photos/'

    id    = AutoField(primary_key = True)
    image = ImageField(verbose_name = 'Image', upload_to = PathAndRename(image_path_folder), validators=[validate_image_file_size], blank = True)
    alt   = CharField(max_length = 255, default = '')
    
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
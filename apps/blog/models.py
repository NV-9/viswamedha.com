from django.db.models import AutoField, BooleanField, CharField, DateField, ImageField, ManyToManyField, SlugField, TextField, UUIDField, Model
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from uuid import uuid4

from apps.users.models import TimeStampMixin
from apps.blog.utils import PathAndRename


class Tag(Model):
    """
    Blog post tags model for viswamedha.com
    """
    id   = AutoField(primary_key = True)
    name = CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    

class Post(TimeStampMixin, Model):
    """
    Blog post model for viswamedha.com
    """
    image_path_folder = 'blog/images/'
    
    id        = AutoField(primary_key = True)
    post_uuid = UUIDField(verbose_name = 'User UUID', default = uuid4, editable = False)

    title      = CharField(verbose_name = _('Title'), max_length = 255, unique = True)
    heading    = CharField(verbose_name = _('Heading'), max_length = 255, blank = True)
    subheading = CharField(verbose_name = _('Subheading'), max_length = 255, blank = True)
    content    = TextField(verbose_name = _('Content'))
    image      = ImageField(verbose_name = 'Image', upload_to = PathAndRename(image_path_folder), blank = True, null = True)

    slug             = SlugField(verbose_name = _('Slug'), max_length = 255, unique = True, blank = True)
    meta_description = CharField(verbose_name = _('Meta Description'), max_length = 255, default = '')
    published        = BooleanField(verbose_name = _('Published'), default = False)
    publish_date     = DateField(verbose_name = _('Publish Date'), blank = True, null = True)

    tags = ManyToManyField(Tag, related_name='posts', blank = True)

    def save(self, *args, **kwargs) -> None:
        if self.slug is None or self.slug == '':
            self.slug = slugify(self.heading)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
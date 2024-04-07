from typing import ClassVar
import uuid

from django.contrib.auth.models import AbstractBaseUser
from django.db.models import AutoField, BooleanField, CharField, DateField, DateTimeField, EmailField, UUIDField, Model
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class TimeStampMixin(Model):
    """
    Abstract model that provides created_at and updated_at fields.
    """

    created_at = DateTimeField(verbose_name = 'Created At', auto_now_add = True)
    updated_at = DateTimeField(verbose_name = 'Created At', auto_now_add = True)

    class Meta:
        abstract = True


class User(AbstractBaseUser, TimeStampMixin):
    """
    Default custom user model for MySite.
    """

    id        = AutoField(primary_key = True)
    user_uuid = UUIDField(verbose_name = 'User UUID', default = uuid.uuid4, editable = False)

    email_address  = EmailField(verbose_name = _('Email Address'), max_length = 255, unique = True)
    date_of_birth  = DateField(verbose_name = _('Date of Birth'))
    first_name     = CharField(verbose_name = _('First Name'), max_length = 255)
    last_name      = CharField(verbose_name = _('Last Name'), max_length = 255)

    is_active   = BooleanField(verbose_name = _('Account Active'), default = True)
    is_staff    = BooleanField(verbose_name = _('Account Admin'),  default = False)
    is_verified = BooleanField(verbose_name = _('Account Verified'), default = False)

    verification_token = CharField(verbose_name = 'Verfication Token', max_length = 200, null = True, blank = True)
    reset_password_token =  CharField(verbose_name = 'Reset Password Token', max_length = 200, null = True, blank = True)
    reset_instance_token = CharField(verbose_name = 'Reset Instance Token', max_length = 200, null = True, blank = True)
    password_reset_at = DateTimeField(null = True,  blank = True)

    USERNAME_FIELD  = 'email_address'
    EMAIL_FIELD     = 'email_address'
    REQUIRED_FIELDS = ['date_of_birth', 'first_name', 'last_name']

    objects: ClassVar[UserManager] = UserManager()

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})

    def has_perm(self, perm, obj=None): 
        return True
    def has_module_perms(self, app_label): 
        return True
    
    def __str__(self):
        return self.email_address
    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])


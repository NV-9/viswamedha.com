from typing import ClassVar
from uuid import uuid4

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db.models import AutoField, BooleanField, CharField, DateField, DateTimeField, EmailField, UUIDField, Model, UniqueConstraint, Q
from django.db.models.functions import Lower
from django.utils.translation import gettext_lazy as _

from apps.users.managers import UserManager

class TimeStampMixin(Model):
    """
    Abstract model that provides created_at and updated_at fields.
    """

    created_at = DateTimeField(verbose_name = 'Created At', auto_now_add = True)
    updated_at = DateTimeField(verbose_name = 'Created At', auto_now_add = True)

    class Meta:
        abstract = True


class User(AbstractBaseUser, TimeStampMixin, PermissionsMixin):
    """
    Default custom user model for viswamedha.com
    """

    id        = AutoField(primary_key = True)
    user_uuid = UUIDField(verbose_name = _('User UUID'), default = uuid4, editable = False)

    # Required fields
    email_address  = EmailField(verbose_name = _('Email Address'), max_length = 255, unique = True)
    username       = CharField(verbose_name = _('Username'), max_length = 25, unique = True)
    first_name     = CharField(verbose_name = _('First Name'), max_length = 255)
    last_name      = CharField(verbose_name = _('Last Name'), max_length = 255)
    date_of_birth  = DateField(verbose_name = _('Date of Birth'))
    
    is_active   = BooleanField(verbose_name = _('Account Active'), default = True)
    is_staff    = BooleanField(verbose_name = _('Account Admin'),  default = False)
    is_verified = BooleanField(verbose_name = _('Account Verified'), default = False)

    verification_token   = CharField(verbose_name = 'Verfication Token', max_length = 200, null = True, blank = True)
    reset_password_token =  CharField(verbose_name = 'Reset Password Token', max_length = 200, null = True, blank = True)
    reset_instance_token = CharField(verbose_name = 'Reset Instance Token', max_length = 200, null = True, blank = True)
    password_reset_at = DateTimeField(null = True,  blank = True)

    USERNAME_FIELD  = 'username'
    EMAIL_FIELD     = 'email_address'
    REQUIRED_FIELDS = ['email_address', 'first_name', 'last_name', 'date_of_birth']

    objects: ClassVar[UserManager] = UserManager()

    def has_perm(self, perm, obj=None): 
        return True
    def has_module_perms(self, app_label): 
        return True
    
    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        constraints = [
            UniqueConstraint(fields = ['username'], name = 'unique_username'),
        ]
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.full_name

    def save(self, *args, **kwargs):
        if self.username:
            self.username = self.username.lower()
        super().save(*args, **kwargs)
from decouple import config, Csv

from .base import *


# ENVIRONMENT SETTINGS
# ------------------------------------------------------------------------------
DEBUG = config("DJANGO_DEBUG", default=False, cast=bool)

POSTGRES_USER = config('POSTGRES_USER')
POSTGRES_NAME = config('POSTGRES_NAME')
POSTGRES_PASS = config('POSTGRES_PASS')
POSTGRES_HOST = config('POSTGRES_HOST')
POSTGRES_PORT = config('POSTGRES_PORT')

SECRET_KEY    = config("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = list(config("DJANGO_ALLOWED_HOSTS", cast=Csv()))

# DATABASE
# ------------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': POSTGRES_NAME,
        'USER': POSTGRES_USER,
        'PASSWORD': POSTGRES_PASS,
        'HOST': POSTGRES_HOST,
        'PORT': POSTGRES_PORT,
    }
}


# SECURITY
# ------------------------------------------------------------------------------
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = config("DJANGO_SECURE_SSL_REDIRECT", default=True)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 518400
SECURE_HSTS_INCLUDE_SUBDOMAINS = config("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)
SECURE_HSTS_PRELOAD = config("DJANGO_SECURE_HSTS_PRELOAD", default=True)
SECURE_CONTENT_TYPE_NOSNIFF = config("DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True)



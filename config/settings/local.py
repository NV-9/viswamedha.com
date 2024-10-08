from .base import *

# ENVIRONMENT SETTINGS
# ------------------------------------------------------------------------------
ALLOWED_HOSTS = ['*']
SECRET_KEY = "django-insecure--#a2vl@!jtzf-&m)+v6^#8h%4wle7xj4)vdfx0@xs+c_ca_#og"

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    },
}

# DATABASE
# ------------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# CORS
# ------------------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://blog.localhost:8000",
    "http://api.localhost:8000",
    "http://blog.localhost",
    "http://api.localhost",
    "http://tutor.localhost",
    "http://localhost",
    "http://127.0.0.1"
]

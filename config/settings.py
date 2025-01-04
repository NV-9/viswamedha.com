"""
Django settings for viswamedha.com
"""

from decouple import config, Csv
from pathlib import Path

# PATHS
BASE_DIR = Path(__file__).resolve().parent.parent
APPS_DIR = BASE_DIR / "apps"
BUILD_DIR = BASE_DIR / "build"

# MODES
DEBUG = config("DJANGO_DEBUG", default=False, cast=bool)
SECRET_KEY = config("DJANGO_SECRET_KEY")
ALLOWED_HOSTS = list(config("DJANGO_ALLOWED_HOSTS", cast=Csv()))
DOMAIN_NAME = config("DOMAIN_NAME")

# APPS
DEFAULT_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
THIRD_APPS = [
    'drf_material',
    'rest_framework',
    'corsheaders',
    'django_filters',
    'django_celery_results',
]
CUSTOM_APPS = [
    'apps.users',
    'apps.blog',
    'apps.main',
    'apps.tutor',
    'apps.chat',
]
FIRST_APPS = [
    'jet.dashboard',
    'jet',
    'daphne',
]
LAST_APPS = [
    'django_cleanup.apps.CleanupConfig',
]
INSTALLED_APPS = FIRST_APPS + DEFAULT_APPS + THIRD_APPS + CUSTOM_APPS + LAST_APPS

# MIDDLEWARE
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ROUTING
ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'

# TEMPLATES 
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# DATABASE
DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # },
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config("POSTGRES_DB"),
        'USER': config("POSTGRES_USER"),
        'PASSWORD': config("POSTGRES_PASSWORD"),
        'HOST': config("POSTGRES_HOST"),
        'PORT': config("POSTGRES_PORT"),
    },
}
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# AUTHENTICATION
AUTH_USER_MODEL = "users.User"
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# INTERNATIONALIZATION
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# STATIC & MEDIA FILES
STATIC_URL = 'static/'
MEDIA_URL = 'media/'
STATIC_ROOT = config("DJANGO_STATIC_ROOT", default = BASE_DIR / 'static')
MEDIA_ROOT = config("DJANGO_MEDIA_ROOT", default = BASE_DIR / 'media')
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# REST FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
}

# CHANNELS
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(config("REDIS_HOST", default = 'localhost'), config("REDIS_PORT", default = 6379, cast = int))],
        },
    },
}

# SOCIAL ACCOUNT LINKS
SOCIAL_ACCOUNT_LINKS = {
    'google': config("SOCIAL_LINK_GOOGLE", default=None),
    'facebook': config("SOCIAL_LINK_FACEBOOK", default=None),
    'instagram': config("SOCIAL_LINK_INSTAGRAM", default=None),
    'github': config("SOCIAL_LINK_GITHUB", default=None),
    'linkedin': config("SOCIAL_LINK_LINKEDIN", default=None),
    'cv': config("SOCIAL_LINK_CV", default=None),
}

# JET THEMES
JET_THEMES = [
    {
        'theme': 'default', 
        'color': '#47bac1', 
        'title': 'Default' 
    },
    {
        'theme': 'green',
        'color': '#44b78b',
        'title': 'Green'
    },
    {
        'theme': 'light-green',
        'color': '#2faa60',
        'title': 'Light Green'
    },
    {
        'theme': 'light-violet',
        'color': '#a464c4',
        'title': 'Light Violet'
    },
    {
        'theme': 'light-blue',
        'color': '#5EADDE',
        'title': 'Light Blue'
    },
    {
        'theme': 'light-gray',
        'color': '#222',
        'title': 'Light Gray'
    }
]

# SECURITY
X_FRAME_OPTIONS = 'SAMEORIGIN'
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    f'http://{DOMAIN_NAME}',
    f'https://{DOMAIN_NAME}',
]
CSRF_TRUSTED_ORIGINS = [
    f'http://{DOMAIN_NAME}',
    f'https://{DOMAIN_NAME}',
]
if DEBUG:
    CORS_ALLOWED_ORIGINS.append(f'http://{DOMAIN_NAME}:5173')
    CORS_ALLOWED_ORIGINS.append(f'http://{DOMAIN_NAME}:8000')

if DEBUG:
    CSRF_TRUSTED_ORIGINS.append(f'http://{DOMAIN_NAME}:5173')
    CSRF_TRUSTED_ORIGINS.append(f'http://{DOMAIN_NAME}:8000')
if not DEBUG:
    SECURE_HSTS_SECONDS = 2_592_000
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', "https")
    SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
    REFERRER_POLICY = 'strict-origin'
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_CROSS_ORIGIN_OPENER_POLICY = None
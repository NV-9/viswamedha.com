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
    'rest_framework',
    'corsheaders',
    'django_filters',
]
CUSTOM_APPS = [
    'apps.users',
    'apps.blog',
    'apps.main',
    'apps.tutor',
]
FIRST_APPS = [
    'jet.dashboard',
    'jet',
]
INSTALLED_APPS = FIRST_APPS + DEFAULT_APPS + THIRD_APPS + CUSTOM_APPS

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
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
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
STATIC_ROOT = BUILD_DIR / 'static'
MEDIA_ROOT = BUILD_DIR / 'media'
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# REST FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', 
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
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


# CORS
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    f'http://{DOMAIN_NAME}',
    f'http://{DOMAIN_NAME}:5173',
]
from django.conf import settings
from django_hosts import patterns, host

host_patterns = patterns('',
    host(r'www', settings.ROOT_URLCONF, name = 'www'),
    host(r'admin', 'config.urls.admin', name = 'admin'),
    host(r'api', 'config.urls.api', name = 'api'),
)

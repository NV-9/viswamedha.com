import os
from uuid import uuid4
from django.utils.deconstruct import deconstructible


@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        uid = uuid4()
        renamed_filename = f'{uid}.{ext}'
        return os.path.join(self.path, renamed_filename)
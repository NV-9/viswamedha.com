from optparse import make_option
import os
import subprocess

from django.core.management.base import BaseCommand, CommandError
from django.core.management.commands.runserver import Command as BaseRunserverCommand
from django.conf import settings

class Command(BaseRunserverCommand):
    def inner_run(self, *args, **options):
        subprocess.run(["npm.cmd", "run", "build"])
        super(Command, self).inner_run(*args, **options)

from optparse import make_option
import os
import subprocess

from django.core.management.base import BaseCommand, CommandError
from django.core.management.commands.runserver import Command as BaseRunserverCommand
from django.conf import settings

class Command(BaseRunserverCommand):
    help = "Run the server with extra options"

    def add_arguments(self, parser):
        super(Command, self).add_arguments(parser)
        parser.add_argument(
            '--build',
            action='store_true',
            dest='build',
            default=False,
            help='Run the build command before starting the server'
        )

    def handle(self, *args, **options):
        if options['build']:
            self.run_build()
        super(Command, self).handle(*args, **options)

    def run_build(self):
        subprocess.run(["npm.cmd", "run", "build"])

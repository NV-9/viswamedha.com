from django.core.management.base import BaseCommand, CommandError
import subprocess

class Command(BaseCommand):
    help = "Generates frontend build files"

    def handle(self, *args, **options):
        subprocess.run(["npm.cmd", "run", "build"])
        super(Command, self).handle(*args, **options)
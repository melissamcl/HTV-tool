from django.core.management.base import BaseCommand
import subprocess
from django.core.management import call_command


class Command(BaseCommand):
    help = "Load HTV color data in database upon app installation"

    def handle(self, *args, **options):
        # Run script in defined path to import htv color data to fixture file
        script_path = "scripts/initialize_htv_color_data.py"
        try:
            subprocess.run(["python", script_path], check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error running the script: {e}")

        # Load data from fixture file into the database
        fixture_filename = "api/fixtures/htv_colors_fixture.json"
        try:
            call_command("loaddata", fixture_filename)
            self.stdout.write(
                self.style.SUCCESS(f"Successfully loaded data from {fixture_filename}")
            )
        except Exception as e:
            print(f"Error loading data from fixture: {e}")

        self.stdout.write(
            self.style.SUCCESS("Successfully performed installation actions.")
        )

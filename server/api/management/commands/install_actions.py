from django.core.management.base import BaseCommand
import subprocess


class Command(BaseCommand):
    help = "Perform actions upon app installation"

    def handle(self, *args, **options):
        # Run script in defined path to import color data
        script_path = "scripts/initialize_htv_color_data.py"
        try:
            subprocess.run(["python", script_path], check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error running the script: {e}")

        self.stdout.write(
            self.style.SUCCESS("Successfully performed installation actions.")
        )

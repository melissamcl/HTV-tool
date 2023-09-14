from django.db.models.signals import post_migrate
from django.dispatch import receiver


# After db migration, call custom command (api/management/commands/install_actions)
@receiver(post_migrate)
def app_installed(sender, **kwargs):
    from django.core.management import call_command

    call_command("install_actions")

from django.core.management.base import BaseCommand
from dashboard.google_services import update_google_reviews

class Command(BaseCommand):
    help = 'Update Google Places reviews from API'

    def handle(self, *args, **options):
        success = update_google_reviews()
        if success:
            self.stdout.write(self.style.SUCCESS('✓ Google reviews updated successfully'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Google reviews update failed, using cached data'))
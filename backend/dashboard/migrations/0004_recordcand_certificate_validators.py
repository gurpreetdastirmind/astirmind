from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_recordcand_certificate_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recordcand',
            name='certificate_file',
            field=models.FileField(blank=True, null=True, upload_to='certificates/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'jpg', 'jpeg', 'png'])]),
        ),
    ]

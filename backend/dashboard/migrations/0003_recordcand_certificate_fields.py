from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_blogcomment'),
    ]

    operations = [
        migrations.AddField(
            model_name='recordcand',
            name='certificate_file',
            field=models.FileField(blank=True, null=True, upload_to='certificates/'),
        ),
        migrations.AddField(
            model_name='recordcand',
            name='training_name',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AlterField(
            model_name='recordcand',
            name='cert_number',
            field=models.CharField(blank=True, help_text='Auto-generated verification ID', max_length=40, unique=True),
        ),
    ]

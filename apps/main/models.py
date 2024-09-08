from django.db.models import Model, AutoField, ImageField, CharField

class Photo(Model):
    """
    Photo model for viswamedha.com
    """

    id    = AutoField(primary_key=True)
    image = ImageField(upload_to="photos")
    alt   = CharField(max_length=255)
    
    class Meta:
        verbose_name = 'Photo'
        verbose_name_plural = 'Photos'
    
    def __str__(self):
        return self.alt


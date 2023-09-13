from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator

# rgb_validators = [
#     MinValueValidator(0, 'Value must be greater than or equal to 0'),
#     MaxValueValidator(255, 'Value must be less than or equal to 255')
# ]
hex_code_validator = RegexValidator(
    regex=r'^#[0-9A-Fa-f]{6}$',
    message='Enter a valid hex color code (e.g., "#RRGGBB")'
)

class HTVColor(models.Model):
    brand = models.CharField(max_length=50, verbose_name='Brand', help_text='Brand name')
    style = models.CharField(max_length=50, verbose_name='Style', help_text='Style description')
    name = models.CharField(max_length=50, verbose_name='Color Name', help_text='Color name')
    hex = models.CharField(
        max_length=7,
        validators=[hex_code_validator],
        verbose_name='Hex Color Code',
        help_text='Hexadecimal color code (e.g., "#RRGGBB")'
    )
    # r = models.PositiveSmallIntegerField(
    #     validators=rgb_validators,
    #     verbose_name='Red Component',
    #     help_text='Red component (0-255)'
    # )
    # g = models.PositiveSmallIntegerField(
    #     validators=rgb_validators,
    #     verbose_name='Green Component',
    #     help_text='Green component (0-255)'
    # )
    # b = models.PositiveSmallIntegerField(
    #     validators=rgb_validators,
    #     verbose_name='Blue Component',
    #     help_text='Blue component (0-255)'
    # )

    def __str__(self):
        return f"{self.brand} {self.style} - {self.name}"

from django.db import models

# Create your models here.


class Puzzle(models.Model):
    size = models.IntegerField(default=5)
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=32)

    def __str__(self):
        return str(self.name)


class Clues(models.Model):
    direction = models.BooleanField()
    puzzle = models.ForeignKey(
        Puzzle, on_delete=models.CASCADE, related_name='clues')
    text = models.CharField(max_length=200)
    number = models.IntegerField()

    def __str__(self):
        return self.text


class Square(models.Model):
    number = models.CharField(max_length=3)
    col = models.IntegerField()
    row = models.IntegerField()
    black = models.BooleanField()
    puzzle = models.ForeignKey(
        Puzzle, on_delete=models.CASCADE, related_name='squares')

    def index(self, dim):
        return (self.row * dim) + self.col

    def __str__(self):
        return "({},{})".format(self.row, self.col)

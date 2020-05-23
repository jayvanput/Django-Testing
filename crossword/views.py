from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.http import HttpResponse

from .models import Puzzle, Clues, Square
# Create your views here.


class IndexView(generic.ListView):
    model = Puzzle
    template_name = 'crossword/index.html'
    context_object_name = 'puzzle_list'


class DetailView(generic.DetailView):
    model = Puzzle
    template_name = 'crossword/detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        across = self.object.clues.filter(direction=1)
        context['across_clues'] = across
        down = self.object.clues.filter(direction=0)
        context['down_clues'] = down
        size_loop = range(self.object.size)
        context['size_loop'] = size_loop
        squares = self.object.squares.all
        context['squares'] = squares
        context['span_size'] = 160 * (1 / self.object.size)
        context['input_size'] = 400 * (1 / self.object.size)
        return context


def build(request):
    return render(request, 'crossword/build.html')


def submit(request):
    size = request.POST['dimensions']
    # Builds puzzle model instance
    puzzle_name = request.POST['puzzle_name']
    author_name = request.POST['author_name']
    puzzle = Puzzle(size=size, name=puzzle_name, author=author_name)
    puzzle.save()
    # Handles Creating the across clues.
    across_clues = request.POST.getlist('clue_across')
    for clue_html in across_clues:
        clue = Clues(direction=True, puzzle=puzzle,
                     text=clue_html, number=1)
        clue.save()
    # Handles Creating the down clues.
    down_clues = request.POST.getlist('clue_down')
    for clue_html in down_clues:
        clue = Clues(direction=False, puzzle=puzzle,
                     text=clue_html, number=1)
        clue.save()
    # Builds each square's data
    squares = request.POST.getlist('square')
    for i in range(0, int(size)):
        for j in range(0, int(size)):
            square_model = Square(
                number=squares[i*int(size) + j], col=i, row=j, black=False, puzzle=puzzle)
            square_model.save()

    return HttpResponse('you did it!')

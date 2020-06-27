from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers

from .models import Puzzle, Clues, Square
# Create your views here.


class IndexView(generic.ListView):
    model = Puzzle
    paginate_by = 8
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
        context['squares_qs'] = self.object.squares.all
        context['squares'] = serializers.serialize(
            'json', self.object.squares.get_queryset())
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
    across_text = request.POST.getlist('clue_text_across')
    across_number = request.POST.getlist('clue_number_across')

    for i in range(len(across_text)):
        clue = Clues(direction=True, puzzle=puzzle,
                     text=across_text[i], number=across_number[i])
        clue.save()
    # Handles Creating the down clues.
    down_text = request.POST.getlist('clue_text_down')
    down_number = request.POST.getlist('clue_number_down')

    for i in range(len(down_text)):
        clue = Clues(direction=False, puzzle=puzzle,
                     text=down_text[i], number=down_number[i])
        clue.save()
    # Builds each square's data
    squares = request.POST.getlist('square')
    letters = request.POST.getlist('letter')
    for i in range(0, int(size)):
        for j in range(0, int(size)):
            square_model = Square(
                number=squares[i*int(size) + j], value=letters[i*int(size) + j], col=i, row=j, black=False, puzzle=puzzle)
            square_model.save()

    return HttpResponseRedirect(reverse('crossword:index'))

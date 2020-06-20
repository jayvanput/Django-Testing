from django import template

register = template.Library()


@register.simple_tag
def index(indexable, size, i, j,):
    return indexable[(i*size)+j].number


@register.simple_tag
def index_black(indexable, size, i, j,):
    if indexable[(i*size)+j].black:
        return "black"
    else:
        return ""

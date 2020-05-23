from django import template

register = template.Library()


@register.simple_tag
def index(indexable, size, i, j):
    return indexable[(i*size)+j].number

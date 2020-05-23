from django.urls import path
from . import views

app_name = "crossword"
urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('<int:pk>', views.DetailView.as_view(), name="detail"),
    path('build/', views.build, name="build"),
    path('submit', views.submit, name="submit")
]

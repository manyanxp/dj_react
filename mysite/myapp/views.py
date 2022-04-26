from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


import plotly.graph_objects as go
import logging
logging.basicConfig(level=logging.INFO)

def line_charts():
    fig = go.Figure(
        go.Scatter(x=[1, 2, 3], y=[3, 5, 2]), layout=go.Layout(width=400, height=400)
    )
    return fig.to_html(include_plotlyjs=False) 


class LineChartsView(APIView):
    template_name = "plot.html"

    def get_context_data(self, **kwargs):
        context = super(LineChartsView, self).get_context_data(**kwargs)
        context["plot"] = line_charts()
        return context
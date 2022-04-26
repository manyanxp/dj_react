from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

from myapp.consumers import CarlaConsumer


websocket_urlpatterns = [
    path(r'ws/CarlaMessage', CarlaConsumer.as_asgi()),
]

application = ProtocolTypeRouter(
    {
        'websocket': AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
    }
)

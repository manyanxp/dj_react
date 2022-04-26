from channels.generic.websocket import AsyncWebsocketConsumer
import json


class CarlaConsumer(AsyncWebsocketConsumer):
    """
    WebSocket通信のハンドラ(非同期実装)
    """
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']
        print(f"DEBUG->{self.channel_name}")
        self.group_name = 'CarlaConsumer'

        # Join room group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'carla_message',
                'message': message
            }
        )

    # Receive message from room group
    async def carla_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': f"{message}"
        }))
        
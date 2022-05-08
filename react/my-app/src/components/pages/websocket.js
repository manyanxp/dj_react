import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:8000/ws/CarlaMessage');

class MySocket extends Component {

    componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected')
        };

        client.onmessage = (message) => {
            console.log(message)
        };

        client.onclose = (event) => {
            console.log("close")
        }
    }

  render() {
    return (
        <div>
            Practical Intro To WebSockets.
        </div>
    );
  }
}

export default MySocket;

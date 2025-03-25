import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust this for production!
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users: { [id: string]: string } = {};

  constructor(
    @Inject(ChatService) protected readonly chatService: ChatService
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    if (this.users[client.id]) {
      this.server.emit('userLeft', this.users[client.id]);
      delete this.users[client.id];
      this.updateUserList();
    }
  }

  @SubscribeMessage('setUsername')
  setUsername(client: Socket, username: string): void {
    if (Object.values(this.users).includes(username)) {
      client.emit('usernameTaken', username);
      return;
    }
    this.users[client.id] = username;
    client.emit('usernameSet', username);
    this.server.emit('userJoined', username);
    this.updateUserList();
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): void {
    const username = this.users[client.id];
    if (username) {
      const newMessage = this.chatService.addMessage(username, message);
      this.server.emit('message', newMessage);
    }
  }

  private updateUserList() {
    this.server.emit('userList', Object.values(this.users));
  }
}

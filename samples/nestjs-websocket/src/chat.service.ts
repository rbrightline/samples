import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private messages: Array<{ username: string; message: string }> = [];

  addMessage(username: string, message: string) {
    const newMessage = { username, message };
    this.messages.push(newMessage);
    return newMessage;
  }

  getMessages() {
    return this.messages;
  }
}

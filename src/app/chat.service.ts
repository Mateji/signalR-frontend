import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class ChatService {
    connection: signalR.HubConnection;
    messages$ = new BehaviorSubject<any>([]);
    activeUsers$ = new BehaviorSubject<any>([]);
    messages: any[] = [];
    users: string[] = [];

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat')
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.start();

        this.connection.on(
            'ReceiveMessage',
            (user: string, message: string, messageTime: string) => {
                this.messages = [
                    ...this.messages,
                    { user, message, messageTime },
                ];
                this.messages$.next(this.messages);
            }
        );

        this.connection.on('ConnectedUser', (users: any) => {
            console.log('Connected users:', users);
            this.activeUsers$.next(users);
        });
    }

    async start() {
        try {
            await this.connection.start();
            console.log('Connection is established');
        } catch (err) {
            console.error('Error during connection startup:', err);
        }
    }

    async joinGroup(user: string, chatGroup: string) {
        return this.connection.invoke('JoinGroup', { user, chatGroup });
    }

    async sendChatMessage(message: string) {
        return this.connection.invoke('SendChatMessage', message);
    }

    async leaveChat() {
        this.connection.stop();
    }
}

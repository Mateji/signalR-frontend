import { group } from '@angular/animations';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';


// TODO: update Message to incorporate status messages, update backend status model aswell, maybe: type: message | status
export interface Message {
    user: string;
    group: string;
    message: string;
    date?: Date;
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    connection: signalR.HubConnection;
    messages$ = new BehaviorSubject<Message[]>([]);
    activeUsers$ = new BehaviorSubject<any>([]);
    connectionState$ = new BehaviorSubject<any>(null);
    groupStatus$ = new BehaviorSubject<any>(null);
    joinedGroups$ = new BehaviorSubject<string[]>([]);
    status$ = new BehaviorSubject<any>(null);
    joinChat$ = new BehaviorSubject<string>('');
    messages: Message[] = [];
    users: string[] = [];

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat')
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.start();

        this.connection.on(
            'ReceiveMessage',
            (
                user: string,
                group: string,
                message: string,
                messageTime: string
            ) => {
                let date = messageTime ? new Date(messageTime) : undefined;
                this.messages = [
                    ...this.messages,
                    { user, group, message, date },
                ];
                this.messages$.next(this.messages);
            }
        );

        this.connection.on('Status', (status: string) => {
            this.status$.next(status);
        });

        this.connection.on('JoinChat', (welcomeMessage: string) => {
            this.joinChat$.next(welcomeMessage);
        });

        this.connection.on('ConnectedUser', (users: any) => {
            console.log('Connected users:', users);
            this.activeUsers$.next(users);
        });

        this.connection.on('GroupStatus', (groupStatus: any) => {
            this.groupStatus$.next(groupStatus);
        });

        this.connection.on('ListJoinedGroups', (groups: string[]) => {
            this.joinedGroups$.next(groups);
        });
    }

    async start() {
        try {
            await this.connection.start();
            this.connectionState$.next('connected');
            console.log('Connection is established');
        } catch (err) {
            console.error('Error during connection startup:', err);
        }
    }

    async getJoinedGroups() {
        return this.connection.invoke('ListJoinedGroups');
    }

    async getGroupStatus() {
        return this.connection.invoke('GetGroupStatus');
    }

    async joinChat(user: string) {
        return this.connection.invoke('JoinChat', user);
    }

    async joinGroup(chatGroup: string) {
        return this.connection.invoke('JoinGroup', chatGroup);
    }

    async sendChatMessage(message: string, group: string) {
        return this.connection.invoke('SendChatMessage', message, group);
    }

    async leaveChat() {
        this.connection.stop();
    }
}

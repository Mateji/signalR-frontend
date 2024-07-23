import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.sass',
})
export class ChatComponent implements OnInit {
    chatService = inject(ChatService);
    router = inject(Router);
    messages: any[] = [];
    inputMessage: string = '';
    userDisplayName = sessionStorage.getItem('user');
    groupName = sessionStorage.getItem('chatGroup');

    ngOnInit(): void {
        this.chatService.messages$.subscribe((messages) => {
            this.messages = messages;
            console.log('Messages:', this.messages);
        });

        this.chatService.activeUsers$.subscribe((users) => {
            console.log('Active users:', users);
        });
    }

    sendChatMessage() {
        this.chatService
            .sendChatMessage(this.inputMessage)
            .then(() => {
                this.inputMessage = '';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    leaveChat() {
        // Call the leaveChat method from the chat service
        this.chatService
            .leaveChat()
            .then(() => {
                this.router.navigate(['join-group']);

                setTimeout(() => {
                    location.reload();
                }, 0);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

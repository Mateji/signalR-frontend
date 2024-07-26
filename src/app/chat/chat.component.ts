import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatService } from '../chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, MessageComponent, RouterModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.sass',
})
export class ChatComponent implements OnInit {
    chatService = inject(ChatService);
    router = inject(Router);
    messages: any[] = [];
    groups: string[] = [];
    inputMessage: string = '';
    inputChannel: string = '';
    userDisplayName = sessionStorage.getItem('user');
    groupName = sessionStorage.getItem('chatGroup');
    isLoading = true;
    channelSelected = false;

    @ViewChild('sendButton') sendButton?: HTMLButtonElement;

    ngOnInit(): void {
        this.chatService.connectionState$.subscribe(() => {
            this.chatService.getGroupStatus();
        });

        this.chatService.groupStatus$.subscribe((groupStatus) => {
            if (groupStatus === false) {
                if (!this.userDisplayName) {
                    this.router.navigate(['join-group']);
                }
            }

            this.chatService.joinGroup('default');
            this.chatService.joinGroup('general');

            this.chatService.messages$.subscribe((messages) => {
                this.messages = messages;
                console.log('Messages:', this.messages);
            });

            this.chatService.activeUsers$.subscribe((users) => {
                console.log('Active users:', users);
            });

            this.chatService.joinedGroups$.subscribe((groups) => {
                this.groups = groups;
            });

            this.isLoading = false;
            // this.sendButton?.focus();
        });

        
    }

    joinChannel() {
        this.chatService.joinGroup(this.inputChannel);
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

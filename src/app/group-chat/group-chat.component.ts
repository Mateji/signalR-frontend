import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-group-chat',
    standalone: true,
    imports: [CommonModule, MessageComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './group-chat.component.html',
    styleUrl: './group-chat.component.sass',
})
export class GroupChatComponent {
    private activatedRoute = inject(ActivatedRoute);
    private chatService = inject(ChatService);
    selectedGroup?: string;
    messages: any[] = [];
    inputMessage = '';

    constructor() {
        this.activatedRoute.params
            .pipe(
                map((params) => params['group']),
                mergeMap((selectedGroup) => {
                    this.selectedGroup = selectedGroup;
                    return this.chatService.messages$.pipe(
                        map((messages) =>
                            messages.filter(
                                (message) => message.group === selectedGroup
                            )
                            // TODO: if messages come in that dont match the group, send signal to parent, to mark channel as unread, with message counter or something like that
                        )
                    );
                })
            )
            .subscribe((messages) => {
                this.messages = messages;
            });
    }

    sendChatMessage() {
        if (this.selectedGroup) {
            this.chatService
                .sendChatMessage(this.inputMessage, this.selectedGroup)
                .then(() => {
                    this.inputMessage = '';
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

import { Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-join-chat',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './join-chat.component.html',
    styleUrl: './join-chat.component.sass',
})
export class JoinChatComponent implements OnInit {
    joinChatForm!: FormGroup;
    formBuilder = inject(FormBuilder);
    router = inject(Router);
    chatService = inject(ChatService);

    constructor() {}

    ngOnInit(): void {
        this.joinChatForm = this.formBuilder.group({
            user: ['', Validators.required]
        });
    }

    joinChat() {
        const { user } = this.joinChatForm.value;

        sessionStorage.setItem('user', user);

        this.chatService
            .joinChat(user)
            .then(() => {
                this.router.navigate(['chat']);
            })
            .catch((error) => {
                console.error('Error joining chat:', error);
            });
    }
}

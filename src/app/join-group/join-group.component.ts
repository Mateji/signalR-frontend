import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-join-group',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './join-group.component.html',
    styleUrl: './join-group.component.sass',
})
export class JoinGroupComponent implements OnInit {
    joinGroupForm!: FormGroup;
    formBuilder = inject(FormBuilder);
    router = inject(Router);
    chatService = inject(ChatService);

    constructor() {}

    ngOnInit(): void {
        this.joinGroupForm = this.formBuilder.group({
            user: ['', Validators.required],
            chatGroup: ['', Validators.required],
        });
    }

    joinGroup() {
        const { user, chatGroup } = this.joinGroupForm.value;

        sessionStorage.setItem('user', user);
        sessionStorage.setItem('chatGroup', chatGroup);

        this.chatService
            .joinGroup(user, chatGroup)
            .then(() => {
                this.router.navigate(['chat']);
            })
            .catch((error) => {
                console.error('Error joining group:', error);
            });
    }
}

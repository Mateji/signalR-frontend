import { Component, Input } from '@angular/core';
import { Message, User } from '../models';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [DatePipe, CommonModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.sass',
})
export class MessageComponent {
    @Input() message?: Message;
    @Input() type: 'simple' | 'extended' = 'simple';
    userDisplayName = sessionStorage.getItem('user');
}

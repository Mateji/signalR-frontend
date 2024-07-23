import { Component, Input } from '@angular/core';
import { Message, User } from '../models';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './message.component.html',
    styleUrl: './message.component.sass',
})
export class MessageComponent {
    @Input() message?: Message;
}

import { Component, inject } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.sass'
})
export class StartpageComponent {
    chatService = inject(ChatService);

}

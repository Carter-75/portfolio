import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html'
})
export class ChatbotComponent {
  chat = inject(ChatbotService);
  isOpen = false;
  userInput = '';

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  send() {
    if (!this.userInput.trim()) return;
    this.chat.sendMessage(this.userInput);
    this.userInput = '';
  }
}

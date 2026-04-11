import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styles: [`
    .chat-bubble {
      @apply fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all z-50;
    }
    .chat-window {
      @apply fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-slate-900 border border-white/10 rounded-3xl flex flex-col shadow-2xl animate-fadeIn z-50 overflow-hidden;
    }
    .message-user { @apply bg-blue-600 text-white self-end rounded-2xl rounded-tr-none px-4 py-2 max-w-[85%] text-sm; }
    .message-ai { @apply bg-slate-800 text-slate-200 self-start rounded-2xl rounded-tl-none px-4 py-2 max-w-[85%] text-sm border border-white/5; }
  `]
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

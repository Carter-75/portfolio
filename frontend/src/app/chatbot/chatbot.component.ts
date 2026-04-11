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
      @apply fixed bottom-8 right-8 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.4)] cursor-pointer hover:scale-110 active:scale-95 transition-all z-[9999] border border-white/20 backdrop-blur-3xl;
      animation: float 6s ease-in-out infinite;
    }
    .chat-window {
      @apply fixed bottom-28 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] bg-slate-950 border border-blue-900/40 rounded-[2.5rem] flex flex-col shadow-[0_50px_100px_-20px_rgba(2,6,23,0.7)] z-[9998] overflow-hidden;
      background-image: radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
    }
    .message-user { @apply self-end max-w-[85%] animate-slideInRight; }
    .message-ai { @apply self-start max-w-[85%] animate-slideInLeft; }
    
    @media (max-width: 640px) {
      .chat-window {
        bottom: 1rem;
        right: 1rem;
        left: 1rem;
        width: auto;
        height: min(700px, calc(100vh - 2rem));
      }
    }
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

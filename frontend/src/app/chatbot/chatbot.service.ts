import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private api = inject(ApiService);

  isReady = signal<boolean>(false);
  isGenerating = signal<boolean>(false);
  messages = signal<{ role: string, text: string }[]>([]);

  constructor() {
    this.checkBackendReady();
  }

  /** Verify the backend is reachable, then mark ready */
  private checkBackendReady() {
    this.api.getData<{ status: string }>('ping').subscribe({
      next: () => {
        this.isReady.set(true);
        if (this.messages().length === 0) {
          this.messages.set([{
            role: 'ai',
            text: "Hi! I'm Carter's AI assistant, powered by GPT-4o. I can answer questions about his skills, projects, and experience. What would you like to know?"
          }]);
        }
      },
      error: () => {
        // Backend offline — still show the chat but with a degraded message
        this.isReady.set(true);
        this.messages.set([{
          role: 'ai',
          text: "I'm currently having trouble connecting to the server. Please try again in a moment, or contact Carter directly."
        }]);
      }
    });
  }

  sendMessage(text: string) {
    if (!this.isReady() || this.isGenerating()) return;

    this.messages.update(prev => [...prev, { role: 'user', text }]);
    this.isGenerating.set(true);

    this.api.postData<{ response: string }>('chat', { message: text }).subscribe({
      next: (res) => {
        this.isGenerating.set(false);
        this.messages.update(prev => [...prev, { role: 'ai', text: res.response }]);
      },
      error: (err) => {
        this.isGenerating.set(false);
        const errorMsg = err.error?.response || 'Something went wrong. Please try again.';
        this.messages.update(prev => [...prev, { role: 'ai', text: errorMsg }]);
      }
    });
  }
}

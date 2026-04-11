import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private worker: Worker | null = null;
  
  private api = inject(ApiService);
  
  isModelReady = signal<boolean>(false);
  isReady = signal<boolean>(false);
  isGenerating = signal<boolean>(false);
  messages = signal<{ role: string, text: string }[]>([]);
  context = signal<string>('');
  loadProgress = signal<number>(0);

  constructor() {
    this.initContext();
    this.initWorker();
  }

  private initContext() {
    this.api.getData<{ content: string }>('context').subscribe({
      next: (res) => {
        this.context.set(res.content);
        console.log('INFO: Portfolio context loaded for AI');
        this.checkOverallReady();
      },
      error: (err) => console.error('ERROR: Failed to load context:', err)
    });
  }

  private initWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./chat.worker', import.meta.url));
      
      this.worker.onmessage = ({ data }) => {
        switch (data.type) {
          case 'progress':
            if (data.progress) this.loadProgress.set(data.progress);
            break;
          case 'ready':
            this.isModelReady.set(true);
            this.checkOverallReady();
            break;
          case 'response':
            this.isGenerating.set(false);
            this.messages.update(prev => [...prev, { role: 'ai', text: data.text }]);
            break;
          case 'error':
            console.error('Worker Error:', data.error);
            this.isGenerating.set(false);
            break;
        }
      };

      this.worker.postMessage({ type: 'init' });
    }
  }

  private checkOverallReady() {
    if (this.isModelReady() && this.context().length > 0) {
      this.isReady.set(true);
      console.log('OK: AI Model and Context are fully synced and ready.');
    }
  }

  sendMessage(text: string) {
    if (!this.isReady() || this.isGenerating()) return;

    this.messages.update(prev => [...prev, { role: 'user', text }]);
    this.isGenerating.set(true);

    this.worker?.postMessage({
      type: 'generate',
      text,
      context: this.context()
    });
  }
}

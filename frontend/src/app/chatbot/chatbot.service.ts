import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private worker: Worker | null = null;
  
  isReady = signal<boolean>(false);
  isGenerating = signal<boolean>(false);
  messages = signal<{ role: string, text: string }[]>([]);
  context = signal<string>('');
  loadProgress = signal<number>(0);

  constructor(private http: HttpClient) {
    this.initContext();
    this.initWorker();
  }

  private initContext() {
    this.http.get<{ content: string }>('/api/context').subscribe({
      next: (res) => {
        this.context.set(res.content);
        console.log('INFO: Portfolio context loaded for AI');
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
            this.isReady.set(true);
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

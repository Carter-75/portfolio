import { Injectable, inject, signal } from '@angular/core';
import { of, timeout, catchError } from 'rxjs';
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
    this.api.getData<{ content: string }>('context').pipe(
      timeout(5000),
      catchError(err => {
        // Diagnostic log for production routing failure
        if (err.status === 200 || err.status === 0) {
           console.error('PRODUCTION ROUTING ERROR: Backend unreachable or serving fallback (Check Vercel Serverless Functions).');
        } else {
           console.warn('WARN: AIChatbot failed to fetch context. Status:', err.status);
        }
        
        return of({ 
          content: "Carter Moyer is a Class of 2026 High-Performance Software Engineer and Lead AI Architect. Expert in MEAN Stack, Autonomous AI, and Hardware-Software Parity." 
        });
      })
    ).subscribe({
      next: (res) => {
        // Final sanity check for HTML fallout
        if (typeof res === 'string' && (res as string).trim().startsWith('<!DOCTYPE')) {
          console.error('PRODUCTION ROUTING ERROR: Received HTML fallback instead of JSON context.');
          this.context.set("Carter Moyer: Professional Software Engineer.");
        } else {
          this.context.set(res.content);
          console.log('OK: Portfolio context synced for AI agent');
        }
        this.checkOverallReady();
      },
      error: (err) => {
        console.error('ERROR: Failed to load context fundamentally:', err);
        this.context.set("Carter Moyer: Professional Software Engineer.");
        this.checkOverallReady();
      }
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
      if (this.messages().length === 0) {
        this.messages.set([{ 
          role: 'ai', 
          text: 'Greetings! I am Carter\'s AI Liaison. I have successfully analyzed his portfolio architecture and background. How can I assist you with your project today?' 
        }]);
      }
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

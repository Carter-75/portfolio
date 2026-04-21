import { __decorate } from "tslib";
import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
let ChatbotService = class ChatbotService {
    api = inject(ApiService);
    isReady = signal(false);
    isGenerating = signal(false);
    messages = signal([]);
    constructor() {
        this.checkBackendReady();
    }
    /** Verify the backend is reachable, then mark ready */
    checkBackendReady() {
        this.api.getData('ping').subscribe({
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
    sendMessage(text) {
        if (!this.isReady() || this.isGenerating())
            return;
        this.messages.update(prev => [...prev, { role: 'user', text }]);
        this.isGenerating.set(true);
        this.api.postData('chat', { message: text }).subscribe({
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
};
ChatbotService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ChatbotService);
export { ChatbotService };
//# sourceMappingURL=chatbot.service.js.map
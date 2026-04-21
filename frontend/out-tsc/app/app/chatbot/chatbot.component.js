import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';
let ChatbotComponent = class ChatbotComponent {
    chat = inject(ChatbotService);
    isOpen = false;
    userInput = '';
    toggleChat() {
        this.isOpen = !this.isOpen;
    }
    send() {
        if (!this.userInput.trim())
            return;
        this.chat.sendMessage(this.userInput);
        this.userInput = '';
    }
};
ChatbotComponent = __decorate([
    Component({
        selector: 'app-chatbot',
        standalone: true,
        imports: [CommonModule, FormsModule],
        templateUrl: './chatbot.component.html'
    })
], ChatbotComponent);
export { ChatbotComponent };
//# sourceMappingURL=chatbot.component.js.map
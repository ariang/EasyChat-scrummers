import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ChatHistoryComponent = class ChatHistoryComponent {
    constructor() {
        this.messages = [];
    }
    ngOnInit() { }
    saveMessage($event) {
        this.message = $event;
        this.messages.push(this.message);
    }
};
ChatHistoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-chat-history',
        templateUrl: './chat-history.component.html',
        styleUrls: ['./chat-history.component.css']
    })
], ChatHistoryComponent);
export { ChatHistoryComponent };
//# sourceMappingURL=chat-history.component.js.map
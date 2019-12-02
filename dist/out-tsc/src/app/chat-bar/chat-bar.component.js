import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let ChatBarComponent = class ChatBarComponent {
    constructor() {
        this.messageEvent = new EventEmitter();
    }
    ngOnInit() { }
    sendAppMessage() {
        this.messageEvent.emit(this.chatMessage);
    }
    showMessage() {
        alert(this.chatMessage);
        this.chatMessage = '';
    }
};
tslib_1.__decorate([
    Output()
], ChatBarComponent.prototype, "messageEvent", void 0);
ChatBarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-chat-bar',
        templateUrl: './chat-bar.component.html',
        styleUrls: ['./chat-bar.component.css']
    })
], ChatBarComponent);
export { ChatBarComponent };
//# sourceMappingURL=chat-bar.component.js.map
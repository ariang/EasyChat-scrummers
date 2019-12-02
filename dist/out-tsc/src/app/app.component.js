import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.messageAppEvent = new EventEmitter();
    }
    recievechatbarMessage($event) {
        this.appmss = $event;
        this.messageAppEvent.emit(this.appmss);
    }
};
tslib_1.__decorate([
    Output()
], AppComponent.prototype, "messageAppEvent", void 0);
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
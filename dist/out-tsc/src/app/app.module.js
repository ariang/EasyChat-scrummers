import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChatBarComponent } from './chat-bar/chat-bar.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [AppComponent, HeaderComponent, FooterComponent, ChatBarComponent, ChatHistoryComponent],
        imports: [BrowserModule, FormsModule],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
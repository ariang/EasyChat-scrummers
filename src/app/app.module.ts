import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChatBarComponent } from './chat-bar/chat-bar.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NickNameComponent } from './nick-name/nick-name.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		ChatBarComponent,
		ChatHistoryComponent,
		NickNameComponent
	],
	imports: [ BrowserModule, FormsModule, BrowserAnimationsModule, HttpClientModule, PickerModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

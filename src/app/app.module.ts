import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChatBarComponent } from './chat-bar/chat-bar.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';

@NgModule({
	declarations: [ AppComponent, HeaderComponent, FooterComponent, ChatBarComponent, ChatHistoryComponent ],
	imports: [ BrowserModule, FormsModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

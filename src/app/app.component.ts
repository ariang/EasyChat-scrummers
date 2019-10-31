import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { ChatBarComponent } from './chat-bar/chat-bar.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	@ViewChild(ChatHistoryComponent, { static: false })
	private chatHistory: ChatHistoryComponent;

	message: string;

	public recieveMessage($event) {
		this.chatHistory.saveMessage($event);
	}
}

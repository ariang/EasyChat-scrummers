import { Component, Input, Output, OnInit, EventEmitter, HostListener } from '@angular/core';
import { Message } from '../message';
import { UserService } from '../user.service';

@Component({
	selector: 'app-chat-bar',
	templateUrl: './chat-bar.component.html',
	styleUrls: [ './chat-bar.component.css' ]
})
export class ChatBarComponent implements OnInit {
	isShow = false;
	name: string;
	constructor(private data: UserService) {}
	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
	}

	public chatmessage: string;

	@Output() messageEvent = new EventEmitter<string>();

	sendMessage(): void {
		this.closeEmojis();
		if (this.chatmessage.trim().length == 0) {
			alert('Nachricht darf nicht leer sein!');
		} else {
			this.chatmessage = this.chatmessage.trim();
			this.messageEvent.emit(this.chatmessage);
		}
		this.chatmessage = '';
	}
	closeEmojis() {
		if (this.isShow) {
			this.isShow = !this.isShow;
		}
	}
	openEmojis() {
		this.isShow = !this.isShow;
	}
	addEmoji(event) {
		if (this.chatmessage === undefined) {
			this.chatmessage = event.emoji.native;
		} else {
			this.chatmessage += event.emoji.native;
		}
	}
}

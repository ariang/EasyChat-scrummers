import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Message } from '../message';
import { UserService } from '../user.service';

@Component({
	selector: 'app-chat-bar',
	templateUrl: './chat-bar.component.html',
	styleUrls: [ './chat-bar.component.css' ]
})
export class ChatBarComponent implements OnInit {
	name: string;
	constructor(private data: UserService) {}
	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
	}

	public chatmessage: string;

	@Output() messageEvent = new EventEmitter<string>();

	sendMessage(): void {
		if (this.chatmessage.trim().length == 0) {
			alert('Invalid Message!');
		} else {
			this.chatmessage = this.chatmessage.trim();
			this.messageEvent.emit(this.chatmessage);
		}
		this.chatmessage = '';
	}
}

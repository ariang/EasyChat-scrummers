import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Message } from '../message';

@Component({
	selector: 'app-chat-bar',
	templateUrl: './chat-bar.component.html',
	styleUrls: [ './chat-bar.component.css' ]
})
export class ChatBarComponent implements OnInit {
	constructor() {}
	ngOnInit() {}

	public chatmessage: string;

	@Output() messageEvent = new EventEmitter<string>();

	sendMessage(): void {
		this.messageEvent.emit(this.chatmessage);
		alert('Sie haben gerade diese Message gesendet: ' + this.chatmessage);
		this.chatmessage = '';
	}
}

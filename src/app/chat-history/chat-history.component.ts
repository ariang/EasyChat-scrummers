import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message';
import { UserService } from '../user.service';

@Component({
	selector: 'app-chat-history',
	templateUrl: './chat-history.component.html',
	styleUrls: [ './chat-history.component.css' ]
})
export class ChatHistoryComponent implements OnInit {
	public msgs: Message[] = [];
	public message: Message;
	name: string;
	oldname: string;

	//Speicherfunktion
	saveMessage(value: string) {
		this.message = new Message();
		this.message.content = value;
		this.message.timesent = this.getTimeStamp();
		this.msgs.push(this.message);
		if (this.msgs.length == 11) {
			this.msgs.splice(0, 1);
			console.log(this.msgs);
		}
	}
	//ZeitStempel Funktion
	getTimeStamp() {
		var now = new Date();
		return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
	}

	constructor(private data: UserService) {}

	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
		this.data.oldname.subscribe((oldname) => (this.oldname = oldname));
	}
}

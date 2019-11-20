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
		this.message.name = this.name;
		this.message.content = value;
		this.message.timesent = this.getTimeStamp();
		if (
			this.message.content.includes('Name geändert von') ||
			this.message.content.includes('hat den Chat betreten')
		) {
			this.message.namechange = true;
			this.message.firstmessage = false;
			console.log(this.message.namechange);
		} else {
			this.message.namechange = false;

			if (
				this.msgs[this.msgs.length - 1].name !== null &&
				this.msgs[this.msgs.length - 1].name == this.name &&
				this.msgs[this.msgs.length - 1].namechange
			) {
				this.message.firstmessage = true;
			} else {
				this.message.firstmessage = false;
			}
		}

		this.msgs.push(this.message);
		if (this.msgs.length == 11) {
			this.msgs.splice(0, 1);
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

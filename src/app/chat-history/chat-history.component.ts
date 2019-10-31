import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-chat-history',
	templateUrl: './chat-history.component.html',
	styleUrls: [ './chat-history.component.css' ]
})
export class ChatHistoryComponent implements OnInit {
	public msgs: string[] = [];

	@Input() message: string;

	saveMessage(value: string) {
		this.msgs.push(value);
	}
	constructor() {}

	ngOnInit() {}
}

import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Message } from '../message';
import { UserService } from '../user.service';
import { ChatService } from '../chat.service';
import { compilePipeFromRender2 } from '@angular/compiler/src/render3/r3_pipe_compiler';
import { User } from '../user';

@Component({
	selector: 'app-chat-history',
	templateUrl: './chat-history.component.html',
	styleUrls: [ './chat-history.component.css' ]
})
export class ChatHistoryComponent implements OnInit {
	constructor(private data: UserService, private cService: ChatService) {}
	@ViewChild('scrollMe', { static: false })
	private myScrollContainer: ElementRef;
	@HostListener('window:beforeunload', [ '$event' ])
	beforeunloadHandler(event) {
		this.endChat();
		alert('call unload');
	}
	public msgs: Message[] = [];
	public users: User[] = [];
	public message: Message;
	name: string;
	oldname: string;
	disableScrollDown = false;
	color: string;
	msgcount = 0;
	ID: string;
	//Sendefunktion der Nachricht
	saveMessage(value: string, changed: boolean) {
		this.message = new Message();
		this.message.name = this.name;
		this.message.content = value;
		this.message.timesent = this.getTimeStamp();
		this.message.oldname = this.oldname;
		this.message.color = this.color;
		this.message.id = this.ID;
		if (changed) {
			this.message.namechange = true;
			this.message.firstmessage = false; //Namensänderung Nachricht wird gesendet

			if (this.name == this.oldname) {
				this.cService.setName(this.message).subscribe((response: Message) => {});
			} else {
				this.cService.changeName(this.message).subscribe((response: Message) => {});
			}

			this.cService.addToHistory(this.message).subscribe((response: Message) => {});
		} else {
			if (
				(this.msgs[this.msgs.length - 1].name !== null && //ist der letzte gespeicherte name nicht leer?
					this.msgs[this.msgs.length - 1].name !== this.name) || //ist der name der nicht gleiche wie der jetztige name?
				this.msgs[this.msgs.length - 1].namechange // oder ist die vorherige Nachricht über eine namensänderung?
			) {
				this.message.firstmessage = true; //Name wird angezeigt
			} else {
				this.message.firstmessage = false; //sonst nur Nachricht und Zeit
			}
			this.cService.addToHistory(this.message).subscribe((response: Message) => {});
		}

		//Zuerst wird geprüft ob Message Array grässer als 11 ist
		if (this.msgs.length > 11) {
			//Von ersten bis zur zehntletzten nachricht werden alle gelöscht aus dem Array
			this.msgs.splice(0, this.msgs.length - 10);
		}
		this.msgcount = this.msgcount++;
		this.scrollToBottom();
	}

	x = setInterval(() => {
		if (this.ID.length > 0) {
			this.cService.getChanges().subscribe((response: JSON) => {
				if (this.msgcount !== response[0].c) {
					this.refresh();
					this.msgcount = response[0].c;
				}
			});
			this.cService.getNames().subscribe((response: User[]) => {
				this.users = response;
				console.log(this.users);
			});
		}
	}, 1000);

	refresh() {
		this.cService.getHistory().subscribe((response: Message[]) => {
			this.msgs = response;
			if (this.msgs.length > 11) {
				this.msgs.splice(0, this.msgs.length - 10);
			}
		});
		this.scrollToBottom();
	}
	endChat() {
		if (this.ID.length > 0) {
			var here = false;
			this.users.forEach((element) => {
				if (element.id == this.ID) {
					return (here = true);
				}
			});
			if (here) {
				this.message = new Message();
				this.message.name = this.name;
				this.message.content = 'hat den Chat verlassen';
				this.message.timesent = this.getTimeStamp();
				this.message.oldname = this.oldname;
				this.message.color = this.color;
				this.message.id = this.ID;
				this.message.namechange = true;
				this.cService.addToHistory(this.message).subscribe((response: Message) => {});
				this.cService.deleteUser(this.ID);
				this.scrollToBottom();
			}
		}
	}
	//ZeitStempel Funktion
	getTimeStamp() {
		var now = new Date();
		var time;
		time =
			now.getDate() +
			'.\xa0' +
			monthNames[now.getMonth()] +
			'\xa0' +
			now.getFullYear() +
			'\xa0' +
			now.getHours() +
			':' +
			(now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) +
			'\xa0Uhr';

		return time;
	}

	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
		this.data.oldname.subscribe((oldname) => (this.oldname = oldname));
		this.data.newcolor.subscribe((color) => (this.color = color));
		this.data.newID.subscribe((ID) => (this.ID = ID));
	}

	//Scrolling Funktionen
	ngAfterViewChecked() {}
	//Wenn gescrollt wird, wird disable scrolldown auf true gesetzt damit es nicht immer runter springt
	public onScroll() {
		let element = this.myScrollContainer.nativeElement;
		let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
		if (this.disableScrollDown && atBottom) {
			this.disableScrollDown = false;
		} else {
			this.disableScrollDown = true;
		}
	}
	//wenn nicht gescrollt wurde geht es nach ganz unten
	public scrollToBottom(): void {
		if (this.disableScrollDown) {
			return;
		}
		try {
			window.setTimeout(
				() =>
					(this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight),
				2000
			);
		} catch (err) {}
	}
}
var monthNames = [
	'Januar',
	'Februar',
	'März',
	'April',
	'Mai',
	'Juni',
	'Juli',
	'August',
	'September',
	'Oktober',
	'November',
	'Dezember'
];

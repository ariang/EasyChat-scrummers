import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message';
import { UserService } from '../user.service';
import { ChatService } from '../chat.service';
import { compilePipeFromRender2 } from '@angular/compiler/src/render3/r3_pipe_compiler';

@Component({
	selector: 'app-chat-history',
	templateUrl: './chat-history.component.html',
	styleUrls: [ './chat-history.component.css' ]
})
export class ChatHistoryComponent implements OnInit {
	constructor(private data: UserService, private cService: ChatService) {}
	@ViewChild('scrollMe', { static: false })
	private myScrollContainer: ElementRef;

	public msgs: Message[] = [];
	public message: Message;
	name: string;
	oldname: string;
	disableScrollDown = false;
	color: string;

	//Sendefunktion der Nachricht
	saveMessage(value: string, changed: boolean) {
		this.message = new Message();
		this.message.name = this.name;
		this.message.content = value;
		this.message.timesent = this.getTimeStamp();
		this.message.color = this.color;
		if (changed) {
			this.message.namechange = true;
			this.message.firstmessage = false; //Namensänderung Nachricht wird gesendet
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
		}
		this.cService.addToHistory(this.message).subscribe((response: Message) => {});
		//Zuerst wird geprüft ob Message Array grässer als 11 ist
		if (this.msgs.length > 11) {
			//Von ersten bis zur zehntletzten nachricht werden alle gelöscht aus dem Array
			this.msgs.splice(0, this.msgs.length - 10);
		}
	}

	x = setInterval(() => {
		this.cService.getChanges().subscribe((response: Boolean) => {
			if (response) {
				console.log(response);
				this.cService.getHistory().subscribe((response: Message[]) => {
					this.msgs = response;
					if (this.msgs.length > 11) {
						this.msgs.splice(0, this.msgs.length - 10);
					}
				});
			}
		});
	}, 2000);

	//ZeitStempel Funktion
	getTimeStamp() {
		var now = new Date();
		//falls weniger als 10 Minuten wird manuell ein 0 vorangestellt Bsp. 12:06 Uhr
		return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
	}

	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
		this.data.oldname.subscribe((oldname) => (this.oldname = oldname));
		this.data.newcolor.subscribe((color) => (this.color = color));
		this.cService.getHistory().subscribe((response: Message[]) => {
			this.msgs = response;
			if (this.msgs.length > 11) {
				this.msgs.splice(0, this.msgs.length - 10);
			}
		});
	}
	//Scrolling Funktionen
	ngAfterViewChecked() {
		this.scrollToBottom();
	}
	//Wenn gescrollt wird wird disable scrolldown auf true gesetzt damit es nicht immer runter springt
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
			this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
		} catch (err) {}
	}
}

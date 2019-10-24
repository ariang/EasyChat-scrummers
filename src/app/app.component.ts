import { Component } from '@angular/core';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	msgs: string[] = [];
	box = '';
	time = '';
	public msgbox: string;
	onEnter(value: string) {
		this.msgs.push(value);
		alert('Du hast gerade die Message ' + value + ' gesendet!');
		this.msgbox = null;
	}
	getTimeStamp() {
		var now = new Date();
		return (
			now.getMonth() +
			1 +
			'/' +
			now.getDate() +
			'/' +
			now.getFullYear() +
			' ' +
			now.getHours() +
			':' +
			(now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) +
			':' +
			(now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds())
		);
	}
}

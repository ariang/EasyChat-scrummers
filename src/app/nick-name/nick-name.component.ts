import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';

@Component({
	selector: 'app-nick-name',
	templateUrl: './nick-name.component.html',
	styleUrls: [ './nick-name.component.css' ]
})
export class NickNameComponent implements OnInit {
	newname: string;
	oldname: string;
	changename: string;
	name: string;
	namemessage: string;
	constructor(private data: UserService) {}

	@Output() nameEvent = new EventEmitter<string>();

	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
		this.data.oldname.subscribe((oldname) => (this.oldname = oldname));
	}
	//Set the new Name with RegEx
	newName() {
		if (this.checkName(this.newname)) {
			this.data.setName(this.newname);
			this.data.setOName(this.newname);
			this.namemessage = this.newname + ' hat den Chat betreten';
			this.nameEvent.emit(this.namemessage);
		} else {
			this.newname = '';
		}
	}
	changeName() {
		if (this.name == this.changename) {
			alert('Es darf nicht der gleiche Nickname sein');
			return false;
		} else {
			console.log('joooooo');
			if (this.checkName(this.changename)) {
				this.data.setOName(this.name);
				this.data.setName(this.changename);
				this.namemessage = 'Name geändert von ' + this.oldname + ' zu ' + this.name;
				this.nameEvent.emit(this.namemessage);
				this.changename = null;
			}
		}
	}
	checkName(value: string) {
		if (value.match('^(?=.*[0-9A-Za-z\u00C0-\u017F])([\u00C0-\u017F.!@#$%^&*(),?":{}|<>A-Za-z0-9_-]+)$')) {
			return true;
		} else {
			if (value.includes(' ')) {
				alert('Username darf keine Leerzeichen enthalten');
			} else {
				alert('Username muss entweder einen Buchstaben oder eine Zahl enthalten');
			}
		}
	}
}

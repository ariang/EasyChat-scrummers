import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';

@Component({
	selector: 'app-nick-name',
	templateUrl: './nick-name.component.html',
	styleUrls: ['./nick-name.component.css']
})
export class NickNameComponent implements OnInit {
	newname: string;
	oldname: string;
	changename: string;
	name: string;
	namemessage: string;
	color: string;
	ID: string;
	constructor(private data: UserService) { }

	@Output() nameEvent = new EventEmitter<string>();

	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
		this.data.oldname.subscribe((oldname) => (this.oldname = oldname));
		this.data.newcolor.subscribe((color) => (this.color = color));
		this.data.newID.subscribe((ID) => (this.ID = ID));
	}
	//Set the new Name with RegEx
	newName() {
		if (this.checkName(this.newname)) {
			this.data.setName(this.newname);
			this.data.setOName(this.newname);
			this.data.setID(Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6));
			this.data.setColor(this.getRandomColor());
			this.namemessage = ' hat den Chat betreten';
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
	getRandomColor() {
		var letters = '0123456789ABCDEF';
		var lettersblue = '0123456789';
		var color = '#';
		//Rot und Grün können normal gesetzt werden
		for (var i = 0;i < 2;i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		//Zur erreichung eines leserlichen Namens wird Blau und Grün gecappt
		for (var i = 0;i < 4;i++) {
			color += lettersblue[Math.floor(Math.random() * 10)];
		}
		console.log(color);
		return color;
	}
}

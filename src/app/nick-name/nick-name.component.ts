import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
		if (value.match('^[.A-Za-z0-9_-]+$')) {
			return true;
		} else {
			alert('Username darf keine Sonderzeichen enthalten');
		}
	}
}

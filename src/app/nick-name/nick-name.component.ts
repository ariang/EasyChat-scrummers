import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
	selector: 'app-nick-name',
	templateUrl: './nick-name.component.html',
	styleUrls: [ './nick-name.component.css' ]
})
export class NickNameComponent implements OnInit {
	newname: string;
	changename: string;
	name: string;
	constructor(private data: UserService) {}

	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
	}
	//Set the new Name with RegEx
	newName() {
		if (this.checkName(this.newname)) {
			this.data.setName(this.newname);
		} else {
			this.newname = '';
		}
	}
	changeName() {
		if (this.changename == this.newname) {
			alert('Es darf nicht der gleiche Nickname sein');
		} else {
			if (this.checkName(this.changename)) {
				this.data.setName(this.changename);
				this.changename = '';
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

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
	selector: 'app-nick-name',
	templateUrl: './nick-name.component.html',
	styleUrls: [ './nick-name.component.css' ]
})
export class NickNameComponent implements OnInit {
	newname: string;
	name: string;
	constructor(private data: UserService) {}

	ngOnInit() {
		this.data.currentname.subscribe((name) => (this.name = name));
	}
	//Set the new Name with RegEx
	newName() {
		if (this.newname.match('^[.A-Za-z0-9_-]+$')) {
			this.data.setName(this.newname);
		} else {
			alert('Username cannot contain special symbols!');
		}
	}
}

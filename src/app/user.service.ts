import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	//Name Variables
	private name = new BehaviorSubject('');
	currentname = this.name.asObservable();
	private oname = new BehaviorSubject('');
	oldname = this.oname.asObservable();
	private color = new BehaviorSubject('');
	newcolor = this.color.asObservable();

	constructor() {}
	//function to set Name
	setName(value: string) {
		this.name.next(value);
	}
	setOName(value: string) {
		this.oname.next(value);
	}
	setColor(value: string) {
		this.color.next(value);
	}
}

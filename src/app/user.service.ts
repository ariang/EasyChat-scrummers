import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	//Name Variables
	private name = new BehaviorSubject('');
	currentname = this.name.asObservable();
	private oname = new BehaviorSubject('');
	oldname = this.oname.asObservable();

	constructor() {}
	//function to set Name
	setName(value: string) {
		this.name.next(value);
	}
	setOName(value: string) {
		this.oname.next(value);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	constructor(private http: HttpClient) { }

	public addToHistory(message: Message): Observable<Message> {
		const options = {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		};

		const actionUrl = 'https://arianchat.herokuapp.com/api/history';
		return this.http.post<Message>(actionUrl, message, options);
	}
	public setName(message: Message): Observable<Message> {
		const options = {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		};
		console.log(message);
		const actionUrl = 'https://arianchat.herokuapp.com/api/history/name';
		return this.http.post<Message>(actionUrl, message, options);
	}
	public changeName(message: Message): Observable<Message> {
		const options = {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		};
		console.log(message);
		const actionUrl = 'https://arianchat.herokuapp.com/api/history/name/' + message.id;
		return this.http.put<Message>(actionUrl, message, options);
	}
	public getNames(): Observable<Array<User>> {
		const options = {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		};
		const actionUrl = 'https://arianchat.herokuapp.com/api/history/name';
		return this.http.get<Array<User>>(actionUrl, options);
	}
	public getChanges(): Observable<JSON> {
		const options = {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		};
		const actionUrl = 'https://arianchat.herokuapp.com/api/history/change';
		return this.http.get<JSON>(actionUrl, options);
	}
	public getHistory(): Observable<Array<Message>> {
		const options = {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		};
		const actionUrl = 'https://arianchat.herokuapp.com/api/history';
		return this.http.get<Array<Message>>(actionUrl, options);
	}
}

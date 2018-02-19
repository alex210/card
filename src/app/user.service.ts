import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {

	constructor(private http: HttpClient){ }

	getUser(user: User) {
		return this.http.post('http://crm.dev/callcentre/default/search-phone-a', user);
	}
}
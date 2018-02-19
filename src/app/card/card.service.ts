import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable()
export class CardService {

	constructor(private http: HttpClient){ }

	getCard(card: User) {
		return this.http.post('http://crm.dev/callcentre/default/search-phoneang', card);
	}

	getSwitch(card: User) {
		return this.http.post('http://crm.dev/callcentre/default/test-switchang', card);
	}

	getStatus(card: User) {
		return this.http.post('http://crm.dev/callcentre/default/test-onlineang', card);
	}

	getTrable(card: User) {
		return this.http.post('http://crm.dev/callcentre/default/get-trableang', card);
	}

	getMessage(id: any) {
		return this.http.post('http://crm.dev/callcentre/default/get-messageang', id);
	}

	getPay(uid: any) {
		return this.http.post('http://crm.dev/callcentre/default/last-payang', uid);
	}

	addTrable(trable: any) {
		return this.http.post('http://crm.dev/callcentre/default/add-trableang', trable);
	}

}
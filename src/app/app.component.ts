import { Component, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [UserService]
})
export class AppComponent {
  userp: User = new User();
  done: boolean = false;
  data;
  card: boolean = false;
  uid: string;

  visibility(){
  	this.card = !this.card;
  }

  constructor(private userService: UserService) {}
  submit(userp: User){
  	this.userService.getUser(userp)
  		.subscribe(
  			(data) => {this.data=data; this.done=true;},
  			error => console.log(error)
  		)
  }
}

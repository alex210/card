import { Component, EventEmitter, Output } from '@angular/core';
import { CardService } from './card.service';
import { User } from '../user';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  providers: [CardService]
})

export class CardComponent {
	user: User = new User();
	done: boolean = false;
	data;
	currentMessage: string;

	@Output() onClose = new EventEmitter<boolean>();


	time(time: number):string {
		let date: Date = new Date(time*1000);
		return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
	}

	timeHour(time: number):string {
		let date: Date = new Date(time*1000);
		if(date.getMinutes() < 10) {
			return `${date.getHours()}:0${date.getMinutes()}`;
		}
		return `${date.getHours()}:${date.getMinutes()}`;
	}

	visibility: boolean = false;
    toggle(){
      this.visibility=!this.visibility;
      this.onClose.emit();
    }

	@Input() uid;

	constructor(private cardService: CardService) {}
	submit(user: User){
		user.uid = this.uid;
		this.cardService.getCard(user)
			.subscribe(
					(data: any) => {
						this.data=data;
						this.done=true;
						user.swid=data.swid
						this.cardService.getSwitch(user)
							.subscribe(
									(data: any) => {
										this.data.nameswitch=data.name;
										this.data.statusswitch=data.status;
									},
									error => console.log(error)
								)
						this.cardService.getStatus(user)
							.subscribe(
									(data: any) => {
										this.data.onlineTime=data.time_on;
										this.data.onlineFstart=data.fstart_time;
										this.data.onlineStatus=data.status;
									},
									error => console.log(error)
								)
						this.getTrable();
					},
					error => console.log(error)
				)
	}

	getTrable(){
		this.cardService.getTrable(this.user)
		.subscribe(
			(data: any) => {
				this.data.trable=data;
			},
			error => console.log(error)
		)
	}

	showMessage(elem){
		if(elem.srcElement.classList.value == "active"){
			elem.srcElement.classList.value = "";
		} else {
			elem.srcElement.classList.value = "active";
		}
	}

	trableMessage(id: string, trable){
		if(!trable.message){
		this.cardService.getMessage({id: id})
			.subscribe(
				(data: any) => {
					trable.message = data.message;
				},
				error => console.log(error)
				)
		}
	}

	callPay(){
		this.cardService.getPay({uid: this.data.uid})
			.subscribe(
				(data: any) => {
					this.data.pay = data
				},
				error => console.log(error)
				)
	}

	success: boolean = false;
	reason: string;
	message: string;
	addTrable(reason, message){
		this.cardService.addTrable({uid: this.data.uid, reason: reason, message: message})
			.subscribe(
				(data: any) => {
					this.success = true;
					setTimeout(()=> {
						this.success = false
						this.getTrable();
						this.reason = null;
						this.message = null;
					}, 2000)
				},
				error => console.log(error)
				)
	}

	
	ngOnInit() {this.submit(this.user)}
	
}


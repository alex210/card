 import { Component, Output, EventEmitter } from '@angular/core';

 @Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.sass'],
})

export class TabsComponent {
	tabs = [];

	addTab(tab){
		if(!this.tabs.length){
			tab.selected = true;
		}
		this.tabs.push(tab);
	}

	selectTab(tab){
		this.tabs.map((tab1) => {
			tab1.selected = false;
		});
		tab.selected = true;
	}

	@Output() onPay = new EventEmitter();

	firstClickPay: boolean = true;
	clickPay(name){
		if(name == 'История платежей' && this.firstClickPay){
			this.onPay.emit();
			this.firstClickPay = false;
		}
	}

}
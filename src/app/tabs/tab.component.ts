 import { Component, Input, OnInit } from '@angular/core';
 import { TabsComponent } from './tabs.component';

 @Component({
  selector: 'tab',
  templateUrl: './tab.component.html'
})

export class TabComponent {
	@Input() tabTitle: string;

	constructor(private tabsComponent: TabsComponent){}
		
	ngOnInit() {
		this.tabsComponent.addTab(this);
	}

}
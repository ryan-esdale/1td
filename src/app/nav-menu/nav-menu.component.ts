import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Unlockable_Names, Unlock_Progression } from '../objects/util/unlock-progression';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  //@ts-ignore
  @ViewChild('container') private container: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  showTabs(): boolean {
    return Unlock_Progression.unlocked(Unlockable_Names.MENU_TABS);
  }

  ngAfterViewInit(): void {
    // this.container.nativeElement.width = window.innerWidth;
  }

}

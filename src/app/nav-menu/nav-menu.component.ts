import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Unlockable_Names, Unlock_Progression } from '../objects/util/unlock-progression';
import { SceneComponent } from '../scene/scene.component';
import { DrawService } from '../scene/services/draw.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  //@ts-ignore
  @ViewChild('container') private container: ElementRef;

  constructor(
    private drawService: DrawService
  ) { }

  ngOnInit(): void {
  }

  showTabs(): boolean {
    return Unlock_Progression.unlocked(Unlockable_Names.MENU_TABS);
  }

  ngAfterViewInit(): void {
    // this.container.nativeElement.width = window.innerWidth;
    // this.selectTab2();
  }


  selectTab1(): void {
    this.drawService.shouldDraw = true;

  }

  selectTab2(): void {
    this.drawService.shouldDraw = false;
  }
}

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Unlockable_Names, Unlock_Progression } from '../../objects/util/unlock-progression';
import { SceneComponent } from '../../scene/scene.component';
import { DrawService } from '../../scene/services/draw.service';
import { GameService } from '../../scene/services/game.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  //@ts-ignore
  @ViewChild('container') private container: ElementRef;
  @Input() selectedTab: number = 1;
  @Output() selectedTabChange: EventEmitter<number> = new EventEmitter<number>();

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


  // selectTab1(): void {
  //   this.drawService.shouldDraw = true;
  //   this.selectedTabChange.emit(1);
  // }

  // selectTab2(): void {
  //   this.selectedTabChange.emit(2);
  //   if (GameService.gameController.roundOver) {
  //     this.drawService.shouldDraw = false;
  //   }
  // }

  selectTab(tab: number): void {
    this.selectedTabChange.emit(tab);
    if (tab == 1) {
      this.drawService.shouldDraw = true;
    } else if (GameService.gameController.roundOver) {
      this.drawService.shouldDraw = false;
    }
  }
}

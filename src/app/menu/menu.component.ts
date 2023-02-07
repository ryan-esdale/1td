import { Component, HostListener, OnInit } from '@angular/core';
import { Entity_Base } from '../objects/base/entity_base';
import { Tower } from '../objects/tower';
import { Settings } from '../objects/util/settings';
import { Unlock_Progression } from '../objects/util/unlock-progression';
import { Upgrade, Upgrade_Currencies, Upgrade_Manager } from '../objects/util/upgrade';
import { GameService } from '../scene/services/game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public upgrades: Upgrade[] = [];
  public upgradeCurrencies = Upgrade_Currencies;
  public menuW: number = Settings.menuW;
  public toggleButtonHeight: number = Settings.screenH / 2;
  public showMenu = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    // this.doResize();
    this.toggleButtonHeight = window.innerHeight / 2;
  }

  constructor() { }

  ngOnInit(): void {
    this.upgrades = Upgrade_Manager.Upgrade_List;
  }

  deleteAllEntities() {
    Entity_Base.entities.forEach(e => {
      if (!(e instanceof Tower))
        e.delete()
    })
  }

  isUnlocked(u: Upgrade) {
    return Unlock_Progression.unlocked(u.tier)
  }

  canAfford(u: Upgrade) {
    return GameService.gameController.canAfford(u.currency, u.currentCost);
  }

  increase(u: Upgrade) {
    GameService.gameController.increaseUpgrade(u.name);
  }

  toggleShow(): void {
    this.showMenu = !this.showMenu;
  }

  roundActive(): boolean {
    return !GameService.gameController.roundOver
  }

  endRound(): void {
    GameService.gameController.endRound();
  }
}

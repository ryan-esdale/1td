import { Component, OnInit } from '@angular/core';
import { Entity_Base } from '../objects/base/entity_base';
import { Tower } from '../objects/tower';
import { Settings } from '../objects/util/settings';
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
  public showMenu = true;

  constructor(
    // private gameService: GameService
  ) {
  }

  ngOnInit(): void {
    this.upgrades = Upgrade_Manager.Upgrade_List;
  }

  deleteAllEntities() {
    Entity_Base.entities.forEach(e => {
      if (!(e instanceof Tower))
        e.delete()
    })
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
}

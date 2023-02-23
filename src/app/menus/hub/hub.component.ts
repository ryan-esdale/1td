import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unlockable_Names } from '../../objects/util/unlock-progression';
import { Upgrade, Upgrade_Currencies, Upgrade_Manager } from '../../objects/util/upgrade';
import { DrawService } from '../../scene/services/draw.service';
import { GameService } from '../../scene/services/game.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  @Input() selectedTab: number = 1;
  @Output() selectedTabChange: EventEmitter<number> = new EventEmitter<number>();

  public unlockableNames = Unlockable_Names;
  public upgradeCurrencies = Upgrade_Currencies;
  public resourceMap = GameService.gameController.resourceManager.globalCurrency;
  public upgrades: Upgrade[] = [];

  constructor(private drawService: DrawService) { }

  ngOnInit(): void {
    this.upgrades = Upgrade_Manager.Upgrade_List;
  }

  canAfford(u: Upgrade) {
    return (GameService.gameController.resourceManager.globalCurrency.get(u.currency) || 0) >= u.currentCost;
  }

  increase(u: Upgrade) {
    if (this.canAfford(u)) {
      GameService.gameController.resourceManager.globalCurrency.set(u.currency, (GameService.gameController.resourceManager.globalCurrency.get(u.currency) || 0) - u.currentCost)
      Upgrade_Manager.increase(u.name);
    }
  }

  getResource(resourceName: Upgrade_Currencies): number {
    return this.resourceMap.get(resourceName) || 0;
  }

  startNewRound(): void {
    GameService.gameController.restartRound();
    this.drawService.shouldDraw = true;
    this.selectedTabChange.emit(1);
  }
}

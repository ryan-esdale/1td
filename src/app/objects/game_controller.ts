import { Enemy_Base } from "./base/enemy_base";
import { Entity_Base } from "./base/entity_base";
import { Round_Controller } from "./round_controller";
import { Upgrade, Upgrade_Currencies, Upgrade_Manager, Upgrade_Names } from "./util/upgrade";
import { Settings } from "./util/settings";
import { Util } from "./util/util";
import { Unlockable_Names, Unlock_Progression } from "./util/unlock-progression";
import { ResourceManager } from "./util/resource-manager";
import { AlertService } from "../alerts/services/alert.service";
import { Alert, AlertType } from "../alerts/models/alert";
import { GameService } from "../scene/services/game.service";
import { DrawService } from "../scene/services/draw.service";

export class Game_Controller {

      public currentRound: Round_Controller;

      public roundOver: boolean = false;

      private autoRestart: boolean = false
      private roundExpireTime: number = 0;
      private roundResetTimer: number = 5000;

      public playerCurrency: Map<Upgrade_Currencies, number> = new Map();

      public resourceManager: ResourceManager = new ResourceManager();

      constructor(private alerts: AlertService) {
            this.currentRound = new Round_Controller()
            this.resourceManager.roundCurrency.set(Upgrade_Currencies.ENERGY, 0);
            this.resourceManager.roundCurrency.set(Upgrade_Currencies.MINERAL, 0);
            this.resourceManager.roundCurrency.set(Upgrade_Currencies.BATTERY, 0);

            Upgrade_Manager.init();
      }

      getCurrency(currency: Upgrade_Currencies) {
            return this.resourceManager.roundCurrency.get(currency) || 0;
      }

      increaseUpgrade(upgradeName: string) {
            const selected = Upgrade_Manager.Upgrade_List.find(u => u.name == upgradeName);
            if (!selected) {
                  return;
            }
            if (!GameService.gameController.canAffordAndPay(selected.currency, selected.currentCost)) {
                  return;
            }
            Upgrade_Manager.increase(upgradeName);
            this.currentRound.applyUpgrades();
      }

      startCurrentRound() {
            this.roundOver = false;
            this.resourceManager.roundCurrency.set(Upgrade_Currencies.ENERGY, 0);
            Upgrade_Manager.resetRoundUpgrades();
            this.currentRound.applyUpgrades();
            this.currentRound.startRound();
            // this.endRound();
      }

      restartRound() {
            Entity_Base.entities = [];
            this.currentRound = new Round_Controller();
            this.startCurrentRound();
      }

      endRound() {
            this.roundOver = true;
            this.roundExpireTime = new Date().getTime();

            if (!Unlock_Progression.unlocked(Unlockable_Names.MENU_TABS)) {
                  Unlock_Progression.unlock(Unlockable_Names.MENU_TABS);
            }
            // console.log("GAME OVER, RESTARTING");
            Entity_Base.entities = [];
            this.alerts.alert(new Alert("Your Tower was destroyed",
                  AlertType.DIALOG,
                  `You managed to successfully escape into orbit.<br><br>
                  You were able to bring with you:<br>
                  Minerals: ${this.resourceManager.roundCurrency.get(Upgrade_Currencies.MINERAL)}<br>
                  `,
                  undefined,
                  () => { console.log("Round over nerd") }
            ));
            this.resourceManager.convertRoundToGlobal();
      }

      canAfford(currency: Upgrade_Currencies, amount: number) {
            return this.getCurrency(currency) > amount;
      }

      canAffordAndPay(currency: Upgrade_Currencies, amount: number) {
            if (this.resourceManager.roundCurrency.has(currency) && this.canAfford(currency, amount)) {
                  this.resourceManager.roundCurrency.set(currency, this.getCurrency(currency) - amount);
                  return true;
            }
            return false
      }

      addCurrency(currency: Upgrade_Currencies, amount: number) {
            if (this.resourceManager.roundCurrency.has(currency)) {
                  const current = this.getCurrency(currency);
                  if (currency == Upgrade_Currencies.MINERAL && current + amount > Upgrade_Manager.getValue(Upgrade_Names.MineralCapacity))
                        return;

                  this.resourceManager.roundCurrency.set(currency, current + amount);
            }
      }

      update() {
            if (this.roundOver && this.autoRestart) {
                  if (new Date().getTime() > this.roundExpireTime + this.roundResetTimer) {
                        this.restartRound();
                  }
            }

            if (!this.roundOver) {
                  const currentEnergy = this.getCurrency(Upgrade_Currencies.ENERGY);
                  this.resourceManager.roundCurrency.set(Upgrade_Currencies.ENERGY, currentEnergy + 1 * Upgrade_Manager.getValue(Upgrade_Names.EnergyGen));
            }
      }

      draw(rC: CanvasRenderingContext2D) {

            if (this.roundOver) {
                  rC.save();
                  rC.font = rC.font.replace(/\d+px/, "48px");
                  rC.fillStyle = "white";
                  rC.shadowColor = "red";
                  rC.shadowBlur = 1;
                  rC.fillText("GAME OVER", Settings.screenW / 2 - 140, Settings.screenH / 2 - 200);
                  if (this.autoRestart) {
                        rC.font = rC.font.replace(/\d+px/, "24px");
                        rC.fillText("RESTARTING IN " + (5000 - (new Date().getTime() - this.roundExpireTime)) / 1000, Settings.screenW / 2 - 125, Settings.screenH / 2 - 175);
                  } else {
                        rC.font = rC.font.replace(/\d+px/, "24px");
                        rC.fillText("Continue to Tab #2 to start a new run.", Settings.screenW / 2 - 200, Settings.screenH / 2 - 175);
                  }
                  rC.restore();
            }
      }
}
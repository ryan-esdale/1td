import { Enemy_Base } from "./base/enemy_base";
import { Entity_Base } from "./base/entity_base";
import { Round_Controller } from "./round_controller";
import { Upgrade, Upgrade_Currencies, Upgrade_Manager, Upgrade_Names } from "./util/upgrade";
import { Settings } from "./util/settings";
import { Util } from "./util/util";

export class Game_Controller {

      public currentRound: Round_Controller;

      public roundOver: boolean = false;

      private autoRestart: boolean = false
      private roundExpireTime: number = 0;
      private roundResetTimer: number = 5000;

      public playerCurrency: Map<Upgrade_Currencies, number> = new Map();


      constructor() {
            this.currentRound = new Round_Controller()
            this.playerCurrency.set(Upgrade_Currencies.ENERGY, 0);
            this.playerCurrency.set(Upgrade_Currencies.BATTERY, 0);

            Upgrade_Manager.init();
      }

      getCurrency(currency: Upgrade_Currencies) {
            return this.playerCurrency.get(currency) || 0;
      }

      increaseUpgrade(upgradeName: string) {
            Upgrade_Manager.increase(upgradeName);
            this.currentRound.applyUpgrades();
      }

      startCurrentRound() {
            this.playerCurrency.set(Upgrade_Currencies.ENERGY, 0);
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

            console.log("GAME OVER, RESTARTING");
            Entity_Base.entities = [];
      }

      canAfford(currency: Upgrade_Currencies, amount: number) {
            return this.getCurrency(currency) > amount;
      }

      canAffordAndPay(currency: Upgrade_Currencies, amount: number) {
            if (this.playerCurrency.has(currency) && this.canAfford(currency, amount)) {
                  this.playerCurrency.set(currency, this.getCurrency(currency) - amount);
                  return true;
            }
            return false
      }

      update() {
            if (this.roundOver && this.autoRestart) {
                  if (new Date().getTime() > this.roundExpireTime + this.roundResetTimer) {
                        this.roundOver = false;
                        this.restartRound();
                  }
            }

            if (!this.roundOver) {
                  const currentEnergy = this.getCurrency(Upgrade_Currencies.ENERGY);
                  this.playerCurrency.set(Upgrade_Currencies.ENERGY, currentEnergy + 1 * Upgrade_Manager.getValue(Upgrade_Names.EnergyGen));
            }
      }

      draw(rC: CanvasRenderingContext2D) {
            if (this.roundOver) {
                  rC.save();
                  rC.font = rC.font.replace(/\d+px/, "48px");
                  rC.fillStyle = "white";
                  rC.fillText("GAME OVER", Settings.screenW / 2 - 140, Settings.screenH / 2 - 200);
                  if (this.autoRestart) {
                        rC.font = rC.font.replace(/\d+px/, "24px");
                        rC.fillText("RESTARTING IN " + (5000 - (new Date().getTime() - this.roundExpireTime)) / 1000, Settings.screenW / 2 - 125, Settings.screenH / 2 - 175);
                  }
                  rC.restore();
            }
      }
}
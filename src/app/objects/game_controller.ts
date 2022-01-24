import { Enemy_Base } from "./base/enemy_base";
import { Entity_Base } from "./base/entity_base";
import { Round_Controller } from "./round_controller";
import { Upgrade, Upgrade_Manager, Upgrade_Names } from "./util/upgrade";
import { Settings } from "./util/settings";
import { Util } from "./util/util";

export class Game_Controller {

      public currentRound: Round_Controller;

      private roundOver: boolean = false;
      private autoRestart: boolean = true
      private roundExpireTime: number = 0;
      private roundResetTimer: number = 5000;

      public playerEnergy: number = 0;

      constructor() {
            this.currentRound = new Round_Controller()

            // this.dmgUpgrade.screenName = "Damage";
            // this.dmgUpgrade.level = 0;
            // this.dmgUpgrade.value = 1;
            // this.dmgUpgrade.valueInc = 1;
            // this.dmgUpgrade.startingCost = 1;
            // this.dmgUpgrade.currentCost = 1;
            // this.dmgUpgrade.costMulti = 1;
      }

      increaseUpgrade(upgradeName: string) {
            Upgrade_Manager.increase(upgradeName);
            this.currentRound.applyUpgrades();
      }

      startCurrentRound() {
            this.currentRound.applyUpgrades();
            this.currentRound.startRound();
            // this.endRound();
      }

      restartRound() {
            this.currentRound = new Round_Controller();
            this.startCurrentRound();
      }

      endRound() {
            this.roundOver = true;
            this.roundExpireTime = new Date().getTime();

            console.log("GAME OVER, RESTARTING");
            Entity_Base.entities = [];
      }

      canAfford(amount: number) {
            return this.playerEnergy > amount;
      }

      canAffordAndPay(amount: number) {
            if (this.canAfford(amount)) {
                  this.playerEnergy -= amount;
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
                  this.playerEnergy += 1 * Upgrade_Manager.getValue(Upgrade_Names.EnergyGen);
            }
      }

      draw(rC: CanvasRenderingContext2D) {
            if (this.roundOver) {
                  rC.font = rC.font.replace(/\d+px/, "48px");
                  rC.fillStyle = "white";
                  rC.fillText("GAME OVER", Settings.screenW / 2 - 148, Settings.screenH / 2 - 200);
                  if (this.autoRestart) {
                        rC.font = rC.font.replace(/\d+px/, "24px");
                        rC.fillText("RESTARTING IN " + (5000 - (new Date().getTime() - this.roundExpireTime)) / 1000, Settings.screenW / 2 - 125, Settings.screenH / 2 - 175);
                  }
            }
      }
}
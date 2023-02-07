import { GameService } from "../scene/services/game.service";
import { GridService } from "./background/services/grid.service";
import { Faction } from "./base/entity_base";
import { Unit_Base } from "./base/unit_base";
import { Colour } from "./util/colour";
import { Upgrade_Currencies } from "./util/upgrade";

export class Mineral_Harvester extends Unit_Base {

      private cooldown = 100;
      private defaultCooldown = 100;

      constructor(x: number, y: number) {
            super(x, y, 15, 15, 1, 0);

            this.colour = new Colour(255, 255, 0, 1);
            this.faction = Faction.FRIENDLY;
            this.collision = true;

            console.log(`Adding harvester at x: ${x}, y: ${y}`);
      }

      override draw(rC: CanvasRenderingContext2D): void {


            rC.save();
            rC.strokeStyle = "white";

            //Draw shot timer indicator
            rC.beginPath()
            rC.lineWidth = 8;
            rC.strokeStyle = new Colour(255, 255, 200, 0.8).toString();
            rC.arc(this.x, this.y, this.w, -Math.PI / 2, (Math.PI * 2) * (Math.max(this.cooldown, 0) / this.defaultCooldown) - Math.PI / 2, true);
            rC.stroke();

            rC.restore();

            super.draw(rC);
      }

      override update(): void {
            this.cooldown--;
            if (this.cooldown <= 0) {
                  GameService.gameController.addCurrency(Upgrade_Currencies.MINERAL, 1);
                  this.cooldown = this.defaultCooldown;
                  // GridService.prototype.getGrid().applyImplosiveForce(0.03, this.x, this.y, 100);
                  GridService.prototype.getGrid().applyExplosiveForce(0.00025, this.x, this.y, 200);
            }
      }
}
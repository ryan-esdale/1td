import { GameService } from "../scene/services/game.service";
import { GridService } from "./background/services/grid.service";
import { Faction } from "./base/entity_base";
import { Unit_Base } from "./base/unit_base";
import { Colour } from "./util/colour";
import { Upgrade_Currencies } from "./util/upgrade";

export class Mineral_Harvester extends Unit_Base {

      // private cooldown = 100;
      // private defaultCooldown = 100;

      constructor(x: number, y: number) {
            super(x, y, 15, 15, 1, 0);

            this.colour = new Colour(255, 255, 0, 1);
            this.faction = Faction.FRIENDLY;
            this.collision = true;

            console.log(`Adding harvester at x: ${x}, y: ${y}`);

            this.cooldown = 100;
            this.defaultCooldown = 100;
      }

      override draw(rC: CanvasRenderingContext2D): void {




            super.draw(rC);
      }

      // override update(): void {

      // }

      override activate(): void {
            GameService.gameController.addCurrency(Upgrade_Currencies.MINERAL, 5);
            GridService.prototype.getGrid().applyExplosiveForce(0.00025, this.x, this.y, 200);
      }
}
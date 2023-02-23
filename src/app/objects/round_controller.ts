import { GameService } from "../scene/services/game.service";
import { GridService } from "./background/services/grid.service";
import { Enemy_Base, PathType } from "./base/enemy_base";
import { Projectile } from "./projectile";
import { Tower } from "./tower";
import { Colour } from "./util/colour";
import { Settings } from "./util/settings";
import { Upgrade_Manager, Upgrade_Names } from "./util/upgrade";
import { Util } from "./util/util";
import { Wave_Controller } from "./wave_controller";

export class Round_Controller {

      public playerTower: Tower;
      public wavesControllers: Wave_Controller[] = [];

      constructor() {
            this.playerTower = new Tower(Settings.screenW / 2, Settings.screenH / 2, 50, 50, 5, 1);

            const dummy = new Enemy_Base(400, 750, 20, 20, 1, 1);
            dummy.colour = new Colour(0, 200, 0, 1);
            dummy.speed = 1;
            const chad = new Enemy_Base(0, 0, 40, 40, 4, 1);
            chad.colour = new Colour(200, 0, 0, 1);
            chad.speed = 0.5;

            const spiral = new Enemy_Base(400, 750, 20, 20, 1, 1, PathType.SPIRAL);
            spiral.colour = new Colour(0, 0, 200, 1);
            spiral.speed = 1.5;
            spiral.rotSpeed = 0.0045;
            spiral.cooldown = 300;
            spiral.defaultCooldown = 300;
            spiral.activate = () => {
                  let bullet = new Projectile(
                        spiral.x,
                        spiral.y,
                        6, 6,
                        Util.aimAngle(spiral.getPos(), [GridService.prototype.gridCentre()[0], GridService.prototype.gridCentre()[1]]),
                        100, 10
                  );
                  bullet.dmg = 0.1;
                  bullet.faction = spiral.faction;
                  bullet.spawn();
            }

            this.wavesControllers.push(new Wave_Controller(0, 0, 0, 0, dummy, 500));
            this.wavesControllers.push(new Wave_Controller(0, 0, 0, 0, spiral, 500));
            this.wavesControllers.push(new Wave_Controller(0, 0, 0, 0, chad, 1250));
            // this.wavesControllers.push(new Wave_Controller(0, 0, 0, 0, dummy, 500));
            // this.wavesControllers[0].lastSpawn = 500;
            // this.wavesControllers[1].lastSpawn = 500;
            // this.wavesControllers[2].lastSpawn = 500;
            // this.wavesControllers[2].lastSpawn = 800;
      }

      applyUpgrades() {
            this.playerTower.dmg = 1 * Upgrade_Manager.getValue(Upgrade_Names.DMG);
            this.playerTower.rotSpeed = 0.01 * Upgrade_Manager.getValue(Upgrade_Names.TurnRate);
            this.playerTower.defaultShootCD = 100 / (Upgrade_Manager.getValue(Upgrade_Names.RoF));
      }

      startRound() {
            this.playerTower.spawn();
            this.wavesControllers.forEach(w => w.spawn());
      }

      endRound() {
            this.wavesControllers.forEach(w => w.delete())
      }
}
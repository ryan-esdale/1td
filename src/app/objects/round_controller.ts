import { GameService } from "../scene/services/game.service";
import { Enemy_Base } from "./base/enemy_base";
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

            this.wavesControllers.push(new Wave_Controller(0, 0, 0, 0, dummy, 500));
            this.wavesControllers.push(new Wave_Controller(0, 0, 0, 0, chad, 1250));
            // this.wavesControllers.push(new Wave_Controller(0, 0, 0, 0, dummy, 500));
            this.wavesControllers[1].lastSpawn = 1500;
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

}
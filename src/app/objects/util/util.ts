import { GameService } from "src/app/scene/services/game.service";
import { ResourceManager } from "./resource-manager";

export abstract class Util {
      constructor() {
      }

      static aimAngle(a: number[], b: number[]) {

            let angle = Math.atan((a[1] - b[1]) / (a[0] - b[0]));
            let offset = 0;
            if (a[0] >= b[0])
                  offset += Math.PI;
            return angle + offset;
      }



      static generateSave(): string {
            let game: any = {};
            game['resources'] = GameService.gameController.resourceManager.generateSave();



            return JSON.stringify(game);
      }


      static loadFromSave(save: string): boolean {
            let saveObj = JSON.parse(save);
            GameService.gameController.resourceManager.loadFromSave(saveObj['resources'])

            return false;
      }
}
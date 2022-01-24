import { GridService } from "./background/services/grid.service";
import { Entity_Base } from "./base/entity_base";
import { Unit_Base } from "./base/unit_base";
import { Util } from "./util/util";

export class Wave_Controller extends Entity_Base {

      public dmg: number = 1;
      public hp: number = 5;

      public spawnCount: number = 50;
      public spawnRate: number = 50;
      public lastSpawn: number = 0;

      public enemyPrototype: Unit_Base;


      constructor(x: number, y: number, w: number = 0, h: number = 0, entity: Unit_Base, spawnRate: number = 50) {
            super(x, y, w, h);

            this.spawnRate = spawnRate;
            this.enemyPrototype = entity;
            // this.lastSpawn = this.spawnRate;
      }


      override update(): void {
            if (this.lastSpawn > 0) {
                  this.lastSpawn--;
                  return
            }

            if (this.spawnCount > 0) {
                  let e = Object.create(this.enemyPrototype);
                  const ranAngle = Math.random() * Math.PI * 2;
                  const spawnDist = 400;
                  e.x = spawnDist * Math.cos(ranAngle) + GridService.prototype.gridCentre()[0];
                  e.y = spawnDist * Math.sin(ranAngle) + GridService.prototype.gridCentre()[1];
                  e.dir = Util.aimAngle([e.x, e.y], [GridService.prototype.gridCentre()[0], GridService.prototype.gridCentre()[1]]);
                  e.spawn();

                  this.lastSpawn = this.spawnRate;
                  // this.spawnCount--;
            } else {
                  this.delete();
            }
      }

}
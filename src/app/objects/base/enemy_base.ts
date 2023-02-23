import { GameService } from "src/app/scene/services/game.service";
import { GridService } from "../background/services/grid.service";
import { Tower } from "../tower";
import { Util } from "../util/util";
import { Entity_Base, Faction } from "./entity_base";
import { Unit_Base } from "./unit_base";

export enum PathType {
      DIRECT = "direct",
      SPIRAL = "spiral",
}

export class Enemy_Base extends Unit_Base {

      public pathType;

      constructor(x: number, y: number, w: number, h: number, hp: number, dmg: number, pathType?: PathType) {
            super(x, y, w, h, hp, dmg);

            this.faction = Faction.ENEMY;
            this.pathType = pathType || PathType.DIRECT;


      }

      override collide(other: Entity_Base): void {
            super.collide(other);

            if (other instanceof Tower) {
                  this.attack(other);
                  this.speed = 0;
            }
      }

      override update(): void {
            super.update();

            // TODO: Fix the weird end of spiral bug in bottom right quadrant when inciden angle is high?low?
            // if (this.pathType == PathType.DIRECT) {
            this.aimAt(GridService.prototype.gridCentre()[0], GridService.prototype.gridCentre()[1]);
            // } else if (this.pathType == PathType.SPIRAL) {
            // }
      }

      override spawn(): void {
            super.spawn();
            this.dir = Util.aimAngle([this.x, this.y], [GridService.prototype.gridCentre()[0], GridService.prototype.gridCentre()[1]]);

            if (this.pathType == PathType.SPIRAL) {
                  this.dir = this.dir + Math.PI / 2
            }
      }
}
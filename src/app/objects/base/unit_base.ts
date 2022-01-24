import { GridService } from "../background/services/grid.service";
import { Util } from "../util/util";
import { Entity_Base } from "./entity_base";
import { Particle } from "./particle_base";

export class Unit_Base extends Entity_Base {

      public hp;
      public maxHP;
      public dmg;
      public rotSpeed: number = 0.1;
      public targetDir;
      public attackSpeed = 500;

      private attackDebounce = 0;

      constructor(x: number, y: number, w: number, h: number, hp: number, dmg: number) {
            super(x, y, w, h);

            this.hp = hp;
            this.maxHP = hp;
            this.dmg = dmg;

            this.targetDir = this.dir;
            this.collision = true;
      }

      override update(): void {
            super.update();

            if (this.hp <= 0) {
                  this.onDeath();
            }
      }

      override draw(rC: CanvasRenderingContext2D) {
            super.draw(rC);
            rC.fillStyle = this.colour.toString();
            rC.beginPath();
            rC.arc(this.x, this.y, this.w, 0, Math.PI * 2, true);
            rC.closePath();
            rC.fill();

            rC.fillText(this.hp + "/" + this.maxHP, this.x, this.y - this.w - 20);
      }

      aimAt(x: number, y: number): boolean {
            this.targetDir = Util.aimAngle([this.x, this.y], [x, y]);
            const diff = this.dir - this.targetDir;
            if (diff > Math.PI) {
                  this.targetDir += Math.PI * 2;
            } else if (diff < -Math.PI) {
                  this.targetDir -= Math.PI * 2;
            }
            if (this.dir > this.targetDir + this.rotSpeed || this.dir < this.targetDir - this.rotSpeed) {
                  if (this.dir - this.targetDir > 0) {
                        this.dir -= this.rotSpeed;
                  } else {
                        this.dir += this.rotSpeed;
                  }
                  return false;
            } else {
                  this.dir = this.targetDir;
            }
            return true;
      }

      attack(other: Unit_Base) {
            if (this.attackDebounce <= 0) {
                  other.hp -= this.dmg;
                  this.attackDebounce = this.attackSpeed;
            } else {
                  this.attackDebounce--;
            }
      }

      onDeath() {
            GridService.prototype.getGrid().applyExplosiveForce(0.1, this.x, this.y, 40);
            this.delete();
      }

      shoot(x: number, y: number): void {

      }


}
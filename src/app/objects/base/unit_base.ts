import { GridService } from "../background/services/grid.service";
import { Colour } from "../util/colour";
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
      public cooldown;
      public defaultCooldown;

      private attackDebounce = 0;


      constructor(x: number, y: number, w: number, h: number, hp: number, dmg: number) {
            super(x, y, w, h);

            this.hp = hp;
            this.maxHP = hp;
            this.dmg = dmg;

            this.targetDir = this.dir;
            this.collision = true;
            this.cooldown = 0;
            this.defaultCooldown = 0;
            // console.log(`Adding Unit_Base at x: ${x}, y: ${y}`);
      }

      override update(): void {
            super.update();

            if (this.hp <= 0) {
                  this.onDeath();
            }

            if (this.defaultCooldown > 0) {

                  this.cooldown--;
                  if (this.cooldown <= 0) {
                        this.activate();
                        this.cooldown = this.defaultCooldown;
                  }
            }
      }

      override draw(rC: CanvasRenderingContext2D) {
            super.draw(rC);

            rC.save();
            rC.strokeStyle = "white";

            //Draw shot timer indicator
            rC.beginPath()
            rC.lineWidth = 8;
            rC.strokeStyle = new Colour(255, 255, 200, 0.8).toString();
            rC.arc(this.x, this.y, this.w, -Math.PI / 2, (Math.PI * 2) * (Math.max(this.cooldown, 0) / this.defaultCooldown) - Math.PI / 2, true);
            rC.stroke();

            rC.restore();


            rC.fillStyle = this.colour.toString();
            rC.beginPath();
            rC.arc(this.x, this.y, this.w, 0, Math.PI * 2, true);
            rC.closePath();
            rC.fill();


            // rC.fillStyle = "white";
            // rC.fillText("dir" + this.dir, this.x, this.y - this.w - 20);
            // rC.fillText("tar" + this.targetDir, this.x, this.y - this.w - 40);
            // rC.fillText(this.hp + "/" + this.maxHP, this.x, this.y - this.w - 20);
      }

      activate(): void {

      }

      aimAt(x: number, y: number): boolean {
            this.targetDir = Util.aimAngle([this.x, this.y], [x, y]);
            const diff = this.dir - this.targetDir;

            // if (this.targetDir > Math.PI * 2) {
            //       this.dir += Math.PI * 2;
            // } else if (this.targetDir < -(Math.PI * 2)) {
            //       this.speed = 0.1
            //       // this.dir += Math.PI * 2;
            // }

            if (diff > Math.PI) {
                  this.targetDir += Math.PI * 2;
                  // this.dir += Math.PI * 2;
            } else if (diff < -Math.PI) {
                  this.targetDir -= Math.PI * 2;
                  // this.dir -= Math.PI * 2;
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
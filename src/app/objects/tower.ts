import { DrawService } from "../scene/services/draw.service";
import { GameService } from "../scene/services/game.service";
import { GridService } from "./background/services/grid.service";
import { Entity_Base, Faction } from "./base/entity_base";
import { Particle } from "./base/particle_base";
import { Unit_Base } from "./base/unit_base";
import { Game_Controller } from "./game_controller";
import { Particle_Spawner } from "./particle_spawner";
import { Projectile } from "./projectile";
import { Colour } from "./util/colour";
import { Settings } from "./util/settings";
import { Upgrade_Manager, Upgrade_Names } from "./util/upgrade";
import { Util } from "./util/util";

export class Tower extends Unit_Base {

      private range: number = 300;
      private shootCD: number = 0;
      private defaultShootCD: number = 20;

      constructor(x: number, y: number, w: number, h: number, hp: number, dmg: number) {
            super(x, y, w, h, hp, dmg);

            this.dir = -Math.PI / 2;
            // this.colour = new Colour(255, 53, 184, 1);
            this.colour = new Colour(255, 0, 0, 1);
            this.faction = Faction.FRIENDLY;
            this.collision = true;
            this.rotSpeed = Upgrade_Manager.getValue(Upgrade_Names.TurnRate);
      }

      override spawn(): void {
            super.spawn();
            // GridService.prototype.getGrid().applyExplosiveForce(0.3, this.x, this.y, 100);
            GridService.prototype.getGrid().applyImplosiveForce(3, this.x, this.y, 100);
      }

      override draw(rC: CanvasRenderingContext2D): void {

            // rC.save();
            //Draw the tower
            this.colour.a = 1;
            rC.beginPath();
            rC.fillStyle = this.colour.toString();
            rC.arc(this.x, this.y, this.w, 0, Math.PI * 2, true);
            rC.closePath();
            rC.fill();

            rC.beginPath();
            rC.arc(this.x + Math.cos(this.dir) * 40, this.y + Math.sin(this.dir) * 40, 20, 0, Math.PI * 2);
            rC.closePath();
            rC.fill();

            // rC.save();
            // rC.globalCompositeOperation = "destination-out"
            // rC.beginPath()
            // rC.arc(this.x + Math.cos(this.dir) * 50, this.y + Math.sin(this.dir) * 50, 20, 0, Math.PI * 2);
            // rC.fill()
            // rC.restore();

            // const x = this.x + Math.cos(this.dir) * 50;
            // const y = this.y + Math.sin(this.dir) * 50;
            // const r = 20;
            // for (var i = 0; i < Math.round(Math.PI * r); i++) {
            //       var angle = (i / Math.round(Math.PI * r)) * 360;
            //       rC.clearRect(x, y, Math.sin(angle * (Math.PI / 180)) * r, Math.cos(angle * (Math.PI / 180)) * r);
            // }

            rC.strokeStyle = "white";
            rC.lineWidth = 1;
            rC.strokeText("HP: " + this.hp + "/" + this.maxHP, 40, 120);

            rC.strokeText("Energy: " + GameService.gameController.playerEnergy.toFixed(2), this.x - 20, this.y - 100);

            //Draw targeting ring
            let ringColour = Colour.fromColour(this.colour);
            ringColour.a = 0.4;
            rC.beginPath();
            rC.strokeStyle = ringColour.toString();
            rC.lineWidth = 4;
            rC.arc(this.x, this.y, this.range, 0, Math.PI * 2);
            rC.closePath();
            rC.stroke();

            rC.lineWidth = 1;
            // rC.restore();
      }

      override shoot(x: number, y: number): void {
            if (
                  this.shootCD > 0 ||
                  !this.aimAt(x, y)) {
                  return;
            }

            if (GameService.gameController.canAffordAndPay(1)) {
                  let bullet = new Projectile(
                        this.x,
                        this.y,
                        6, 6,
                        this.dir,
                        100, 10
                  );
                  bullet.dmg = this.dmg;
                  bullet.faction = this.faction;
                  bullet.spawn();
            }

            this.shootCD = this.defaultShootCD;
      }

      override update(): void {
            if (this.hp <= 0) {
                  this.delete();
                  GameService.gameController.endRound();
            }

            this.shootCD--;

            const targetList = Entity_Base.entities.filter(e => { return e.faction != this.faction && this.distanceTo(e) < this.range });
            const closest = targetList.sort((a, b) => (this.distanceTo(a) - this.distanceTo(b)))[0];
            if (closest)
                  this.shoot(closest.x, closest.y);
            // Entity_Base.entities.forEach(e => {
            //       //Don't shoot at yourself silly
            //       if (e === this)
            //             return;

            //       if (e instanceof Unit_Base && this.distanceTo(e) < this.range)
            //             this.shoot(e.x, e.y)

            // });
            // if (this.x != Settings.screenW / 2 || this.y != Settings.screenH / 2) {
            //       this.x = Settings.screenW / 2;
            //       this.h = Settings.screenH / 2;
            // }
      }

      override delete(): void {
            GridService.prototype.getGrid().applyExplosiveForce(0.3, this.x, this.y, 100);
            for (let i = 0; i < 360; i++) {
                  const fragment = new Particle(this.x, this.y, 3, 3);
                  fragment.dir = Math.random() * 2 * Math.PI;
                  fragment.speed = Math.random() * 20;
                  fragment.lifetime = 10;
                  fragment.fadetime = 100;
                  fragment.colour = this.colour;
                  fragment.spawn();
            }
            super.delete();
      }
}
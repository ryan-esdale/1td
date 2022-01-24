import { Entity_Base } from "./entity_base";
import { Colour } from "../util/colour";

export class Particle extends Entity_Base {
      public lifetime;
      public alivetime;
      public fadetime?;

      public alpha;

      public static particles: Particle[] = new Array<Particle>();

      private otherE?: Entity_Base;

      constructor(x: number, y: number, w: number, h: number, dir?: number,
            lifetime?: number, speed?: number, colour?: Colour, fadetime?: number) {

            super(x, y, w, h, dir, speed);

            this.alpha = 1;
            this.colour = colour || new Colour(255, 255, 255, this.alpha);
            this.lifetime = lifetime;
            this.alivetime = 0;
            this.fadetime = fadetime;

            this.collision = true;
      }

      override update() {
            super.update()

            if (this.lifetime && this.lifetime > 0) {
                  this.alivetime++;
                  if (this.alivetime >= this.lifetime) {
                        if (this.fadetime && this.alpha > 0) {
                              this.alpha -= 1 / this.fadetime;
                              this.colour.a = this.alpha;
                        } else {
                              this.delete();
                        }
                  }
            }
      }

      override delete(): void {
            Particle.particles = Particle.particles.filter(p => { return p != this });
            super.delete();
      }

      override draw(rC: CanvasRenderingContext2D) {

            // if (this.colour.r > 0 && this.colour.b == 0) {
            //       this.colour.r--;
            //       this.colour.g++;
            // }
            // if (this.colour.g > 0 && this.colour.r == 0) {
            //       this.colour.g--;
            //       this.colour.b++;
            // }
            // if (this.colour.b > 0 && this.colour.g == 0) {
            //       this.colour.r++;
            //       this.colour.b--;
            // }

            rC.fillStyle = this.colour.toString();
            rC.beginPath();
            rC.arc(this.x, this.y, this.w, 0, Math.PI * 2, true);
            rC.closePath();
            rC.fill();

            // rC.fillStyle = "rgba(100,100,100,0.5)"
            // rC.beginPath();
            // rC.arc(this.x + 5, this.y + 5, this.w, -Math.PI * 1 / 5, Math.PI * 2 / 3);
            // rC.closePath();
            // rC.fill();

            // rC.fillRect(this.x, this.y, this.w, this.h);

            // if (this.otherE) {
            //       rC.strokeStyle = "RED";
            //       rC.lineWidth = 5;
            //       rC.beginPath();
            //       rC.moveTo(this.x + this.w / 2, this.y + this.h / 2);
            //       rC.lineTo(this.otherE.x + this.otherE.w / 2, this.otherE.y + this.otherE.h / 2);
            //       rC.stroke();

            // }
            // // rC.lineWidth = 20;
            // rC.lineTo(this.x + this.w, this.y + this.h);
            // rC.lineTo(this.x, this.y + this.h);
            // rC.lineTo(this.x, this.y);
            if (false) {
                  rC.fillText(this.alivetime + ":" + this.lifetime, this.x, this.y);
                  rC.fillText(this.alpha + ":" + this.fadetime, this.x, this.y - 20);
                  rC.fillText(this.collisionDebounce + "" || "null", this.x, this.y - 40);
            }
      }

      override collide(other: Entity_Base): void {
            super.collide(other);
            if (this.collisionDebounce == 0 && other.collision && other instanceof Particle) {
                  this.otherE = other;
                  // this.colour = "rgba(" + Math.random() * 155 + 100 + "," + Math.random() * 155 + 100 + "," + Math.random() * 155 + 100 + "," + this.alpha + ")";
                  //Bounce them off each other?
                  // other.collisionDebounce = 10;
                  let dir = this.dir;
                  let speed = this.speed;

                  this.dir = other.dir;
                  this.speed = other.speed;

                  other.dir = dir;
                  other.speed = speed;
            }
            return;
      }

      override spawn(): void {
            Particle.particles.push(this);
      }
}
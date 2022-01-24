import { Entity_Base } from "../base/entity_base";
import { Particle } from "../base/particle_base";
import { Colour } from "../util/colour";

export class Grid_Node {
      public x;
      public y;
      public w;
      public h;

      private accelerationX = 0;
      private accelerationY = 0;
      private damping = 0.98;

      public velocityX = 0;
      public velocityY = 0;
      public inverseMass = 0;
      public colour: Colour;

      constructor(x: number, y: number, w: number, h: number, inverseMass?: number) {
            // super(x, y, w, h);
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.inverseMass = inverseMass || 0;
            this.colour = new Colour(0, 0, 255, 1);
      }

      applyForce(x: number, y: number) {
            this.accelerationX += x * this.inverseMass;
            this.accelerationY += y * this.inverseMass;
      }

      increaseDamping(factor: number) {
            this.damping *= factor;
      }

      update(): void {

            this.velocityX += this.accelerationX;
            this.velocityY += this.accelerationY;
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.accelerationX = 0;
            this.accelerationY = 0;

            if (this.velocityX * this.velocityX < 0.001 * 0.001)
                  this.velocityX = 0;
            if (this.velocityY * this.velocityY < 0.001 * 0.001)
                  this.velocityY = 0;

            this.velocityX *= this.damping;
            this.velocityY *= this.damping;

            this.damping = 0.98;
      }

      draw(rC: CanvasRenderingContext2D): void {
            // if (this.inverseMass != 1) {
            //       // rC.fillStyle = "red";
            //       // rC.beginPath();
            //       // rC.arc(this.x, this.y, this.w * 10, 0, Math.PI * 2, true);
            //       // rC.closePath();
            //       // rC.fill();
            // } else {

            // this.colour.a = 1 - Math.abs(this.velocityX) - Math.abs(this.velocityY);
            // rC.fillStyle = this.colour.toString();
            // // rC.fillStyle = "black";
            // rC.beginPath();
            // rC.arc(this.x, this.y, this.w, 0, Math.PI * 2, true);
            // rC.closePath();
            // rC.fill();

            // rC.fillStyle = "white"
            // if (this.velocityX > 0) {
            //       rC.fillText(this.velocityX + " vel", 50, 100)
            //       rC.fillText(this.accelerationX + " vel", 50, 120)
            // }

            // rC.fillText("IM:" + this.inverseMass, this.x + 5, this.y - 10);
            // }
      }
}
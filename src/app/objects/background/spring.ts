import { Particle } from "../base/particle_base";
import { Colour } from "../util/colour";
import { Grid_Node } from "./grid_node";

export class Spring {

      public end1: Grid_Node;
      public end2: Grid_Node;
      public targetLength: number;
      public stiffness: number;
      public dampingX: number;
      public dampingY: number;

      public colour = new Colour(0, 255 * Math.random(), 255 * Math.random(), 1);

      constructor(end1: Grid_Node, end2: Grid_Node, stiffness: number, damping: number) {
            // super(0, 0, 0, 0);
            this.end1 = end1;
            this.end2 = end2;
            this.stiffness = stiffness;
            this.dampingX = damping;
            this.dampingY = damping;
            this.targetLength = 0.95 * Math.hypot((end1.x - end2.x), (end1.y - end2.y));
      }

      calcLength(a: Grid_Node, b: Grid_Node) {
            return Math.hypot((a.x - b.x), (a.y - b.y));
      }

      xDist() {
            return this.end1.x - this.end2.x;
      }

      yDist() {
            return this.end1.y - this.end2.y;
      }

      update(): void {
            let length = this.calcLength(this.end1, this.end2);

            // this.colour = new Colour(0, 0, 255, 1).toString();
            if (length > this.targetLength) {
                  // this.colour = new Colour(255, 0, 0, 1).toString();

                  let kX = (this.xDist() / length) * (length - this.targetLength);
                  let kY = (this.yDist() / length) * (length - this.targetLength);
                  // let kX = Math.max(Math.min((this.xDist() - length) * (length - this.targetLength), 1), -1);
                  // let kY = Math.max(Math.min((this.yDist() - length) * (length - this.targetLength), 1), -1);

                  let dvX = this.end2.velocityX - this.end1.velocityX;
                  let dvY = this.end2.velocityY - this.end1.velocityY;


                  // let forceX = this.stiffness * kX - dvX * this.dampingX;
                  // let forceY = this.stiffness * kY - dvY * this.dampingY;

                  let sfX = this.stiffness * kX;
                  let sfY = this.stiffness * kY;
                  let dampX = this.dampingX * dvX;
                  let dampY = this.dampingY * dvY;

                  let forceX = sfX - dampX;
                  let forceY = sfY - dampY;

                  // if (this.end1.inverseMass != 0)
                  this.end1.applyForce(-forceX, -forceY);
                  // if (this.end2.inverseMass != 0)
                  this.end2.applyForce(forceX, forceY);
            }
      }

      draw(rC: CanvasRenderingContext2D): void {
            // return;
            // if (this.calcLength(this.end1, this.end2) > this.targetLength) {
            //       rC.fillStyle = this.colour.toString();
            //       rC.fillStyle = "white";
            //       rC.beginPath();
            //       rC.arc(this.end1.x, this.end1.y, 10, 0, Math.PI * 2, true);
            //       rC.closePath();
            //       rC.fill();
            // }
            // if (this.end1.inverseMass == 0 || this.end2.inverseMass == 0)
            // return;


            // if (this.colour.r > 0 && this.colour.b <= 0) {
            //       this.colour.r -= Math.random();
            //       this.colour.g += Math.random();
            // }
            // if (this.colour.g > 0 && this.colour.r <= 0) {
            //       this.colour.g -= Math.random();
            //       this.colour.b += Math.random();
            // }
            // if (this.colour.b > 0 && this.colour.g <= 0) {
            //       this.colour.r += Math.random();
            //       this.colour.b -= Math.random();
            // }
            // this.colour.a = (this.targetLength / this.calcLength(this.end1, this.end2));

            // rC.beginPath();
            rC.strokeStyle = this.colour.toString();
            // rC.strokeStyle = "black";
            rC.moveTo(this.end1.x, this.end1.y);
            rC.lineTo(this.end2.x, this.end2.y);
            // rC.stroke();
      }
}
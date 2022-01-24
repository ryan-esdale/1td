import { Entity_Base } from "./base/entity_base";
import { Colour } from "./util/colour";
import { Particle } from "./base/particle_base";

export class Particle_Spawner extends Entity_Base {

      private spawnRate = 50;
      private nextSpawn = 0;
      public spawnDirDeviation;

      constructor(x: number, y: number, w: number, h: number, dir?: number, spread?: number, speed?: number) {
            super(x, y, w, h, dir, speed);

            this.spawnDirDeviation = spread || Math.PI / 4;
            // this.colour = new Colour(255, 0, 0, 1);
            this.colour = new Colour(Math.random() * 155 + 100, Math.random() * 155 + 100, Math.random() * 155 + 100, 1);

            if (Math.random() > 0.5) {
                  this.colour.r = 0;
                  this.colour.b = 255;
            }
      }

      override update(): void {
            if (this.nextSpawn > this.spawnRate) {
                  let p = new Particle(
                        this.x, this.y, 10, 10,
                        this.dir + (Math.random() - 0.5) * this.spawnDirDeviation,
                        Math.random() * 500 + 500,
                        Math.random() * 1.2 + 0.5);
                  p.colour = Colour.fromColour(this.colour);
                  p.fadetime = 100;
                  p.spawn();
                  // switch (this.counter) {
                  //       case 0: {
                  //             p.colour = new Colour(255, 0, 0, 1);
                  //             break;
                  //       }
                  //       case 1: {
                  //             p.colour = new Colour(0, 255, 0, 1);
                  //             break;
                  //       }
                  //       case 2: {
                  //             p.colour = new Colour(0, 0, 255, 1);
                  //             break;
                  //       }
                  //       case 3: {
                  //             p.colour = new Colour(255, 255, 255, 1);
                  //             break;
                  //       }
                  //       default: {
                  //             this.counter = 0
                  //             break;
                  //       }
                  // }
                  this.nextSpawn = 0;
            } else {
                  this.nextSpawn++;
            }

      }

      override draw(rC: CanvasRenderingContext2D): void {
            super.draw(rC);
      }
}
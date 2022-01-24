import { GridService } from "./background/services/grid.service";
import { Entity_Base, Faction } from "./base/entity_base";
import { Particle } from "./base/particle_base";
import { Unit_Base } from "./base/unit_base";
import { Colour } from "./util/colour";

export class Projectile extends Particle {

      public dmg = 0;

      constructor(x: number, y: number, w: number, h: number, dir?: number,
            lifetime?: number, speed?: number, colour?: Colour, fadetime?: number,
            faction?: Faction) {
            super(x, y, w, h, dir, lifetime, speed, colour, fadetime)

            this.faction = faction || Faction.OTHER;
      }

      override collide(other: Entity_Base): void {
            super.collide(other);

            if (other instanceof Unit_Base) {
                  other.hp -= this.dmg;

                  for (let i = 0; i < Math.random() * 50 + 5; i++) {
                        let spark = new Particle(this.x, this.y, 2, 2);
                        if (other.hp > 0) {
                              spark.dir = (this.dir - Math.PI) + (Math.random() - 0.5) * Math.PI / 2;
                        } else {
                              spark.dir = (this.dir) + (Math.random() - 0.5) * Math.PI / 2;
                        }
                        spark.lifetime = Math.random() * 0.5;
                        spark.speed = Math.random() * 3 + 4;
                        spark.colour = new Colour(255, 255, 0, 0.8);
                        spark.fadetime = 20;
                        spark.spawn();
                  }
                  this.delete();
            }
      }
}
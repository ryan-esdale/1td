import { Colour } from "../util/colour";

export enum Faction {
      FRIENDLY = "Friendly",
      ENEMY = "Enemy",
      OTHER = "Other"
}

export class Entity_Base {
      public x;
      public y;
      public w;
      public h;

      public dir;
      public speed?;

      public collision?= false;
      public collisionDebounce = 0;
      public lastCollided?: Entity_Base;
      public faction: Faction = Faction.OTHER;

      public colour: Colour = new Colour(255, 255, 255, 1);


      public static entities: Entity_Base[] = new Array<Entity_Base>();
      public static drawBox: boolean = true;

      constructor(x: number, y: number, w: number, h: number, dir?: number, speed?: number) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.dir = dir || 0;
            this.speed = speed;


      }

      distanceTo(other: Entity_Base) {
            return Math.hypot(this.x - other.x, this.y - other.y);
      }

      update() {
            //Very rudimentary collision detection
            if (this.collision && this.collisionDebounce <= 0) {
                  Entity_Base.entities.forEach(e => {
                        if (e === this || (this.lastCollided && this.lastCollided === e)) {
                              return;
                        }
                        //Square collision
                        // if (this.x < e.x + e.w &&
                        //       this.x + this.w > e.x &&
                        //       this.y < e.y + e.h &&
                        //       this.y + this.h > e.y) {
                        //       this.collide(e);
                        //       this.collisionDebounce = 100;
                        //       //If both objects have collision then don't do any movement for now;
                        //       // if (e.collision)
                        //       // return;
                        // }

                        //Circle collision
                        let dx = (this.x) - (e.x);
                        let dy = (this.y) - (e.y);
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < this.w + e.w && this.faction != e.faction) {
                              // TODO: Don't collide if they're moving away from each other
                              // if ((this.dir - e.dir) < Math.PI / 4) {
                              // if (e.dir > (this.dir + Math.PI * 3 / 4) || e.dir < (this.dir - Math.PI * 3 / 4)) {
                              this.collide(e)
                              // this.collisionDebounce = 100;
                              // this.lastCollided = e;
                              // }
                        }

                  });
            }
            if (this.collisionDebounce > 0)
                  this.collisionDebounce -= 1;
            if (this.speed) {
                  this.x += Math.cos(this.dir) * this.speed;
                  this.y += Math.sin(this.dir) * this.speed;
            }
      }

      collide(other: Entity_Base) {
            if (this.faction == other.faction) {
                  return;
            }
      }

      draw(rC: CanvasRenderingContext2D) {
            if (Entity_Base.drawBox) {
                  rC.beginPath();
                  rC.strokeStyle = "red";
                  rC.strokeRect(this.x - (this.w / 2), this.y - (this.h / 2), this.w, this.h);
                  rC.stroke();
            }
      }

      delete() {
            Entity_Base.entities = Entity_Base.entities.filter(e => { return e != this });
      }


      spawn() {
            Entity_Base.entities.push(this);
      }
}
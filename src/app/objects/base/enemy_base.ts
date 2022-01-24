import { Tower } from "../tower";
import { Entity_Base, Faction } from "./entity_base";
import { Unit_Base } from "./unit_base";

export class Enemy_Base extends Unit_Base {

      constructor(x: number, y: number, w: number, h: number, hp: number, dmg: number) {
            super(x, y, w, h, hp, dmg);

            this.faction = Faction.ENEMY;
      }

      override collide(other: Entity_Base): void {
            super.collide(other);

            if (other instanceof Tower) {
                  this.attack(other);
                  this.speed = 0;
            }
      }
}
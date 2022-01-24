import { Injectable } from '@angular/core';
import { Entity_Base } from 'src/app/objects/base/entity_base';
import { Colour } from 'src/app/objects/util/colour';
import { Particle } from 'src/app/objects/base/particle_base';
import { Particle_Spawner } from 'src/app/objects/particle_spawner';
import { Grid } from 'src/app/objects/background/grid';
import { Grid_Node } from 'src/app/objects/background/grid_node';
import { Spring } from 'src/app/objects/background/spring';
import { Tower } from 'src/app/objects/tower';
import { GridService } from 'src/app/objects/background/services/grid.service';
import { Unit_Base } from 'src/app/objects/base/unit_base';
import { Util } from 'src/app/objects/util/util';
import { Wave_Controller } from 'src/app/objects/wave_controller';
import { Enemy_Base } from 'src/app/objects/base/enemy_base';
import { Game_Controller } from 'src/app/objects/game_controller';
import { GameService } from './game.service';
import { Settings } from 'src/app/objects/util/settings';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private rC: CanvasRenderingContext2D | undefined | null;
  private canvas: HTMLCanvasElement | undefined;

  private lastTickTime = new Date().getTime();

  constructor(
    private gridService: GridService,
    private gameService: GameService
  ) {
  }

  initialiseContext(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.height = Settings.screenH;
    canvas.width = Settings.screenW;

    this.rC = canvas.getContext("2d");

    if (!this.rC) {
      return;
    }

    this.rC.font = this.rC.font.replace(/\d+px/, "24px");

    // setInterval(() => {
    //   if (this.colourMode.r > 0 && this.colourMode.b == 0) {
    //     this.colourMode.r--;
    //     this.colourMode.g++;
    //   }
    //   if (this.colourMode.g > 0 && this.colourMode.r == 0) {
    //     this.colourMode.g--;
    //     this.colourMode.b++;
    //   }
    //   if (this.colourMode.b > 0 && this.colourMode.g == 0) {
    //     this.colourMode.r++;
    //     this.colourMode.b--;
    //   }
    //   // console.log(this.colourMode);
    // }, 10);

    GameService.gameController.startCurrentRound();




    // dummy.spawn();

    // let topLeft = new Particle_Spawner(200, 100, 20, 20);
    // topLeft.dir = Math.PI / 3;
    // topLeft.spawn();
    // let bottomRight = new Particle_Spawner(600, 800, 20, 20);
    // bottomRight.dir = 4 * (Math.PI / 3);
    // bottomRight.spawn();


    this.canvas.addEventListener('click', this.explode.bind(this), false);

    // this.bgGrid.applyDirectedForce(50, 0, 400, 600, 60)
    // setInterval(() => {
    // }, 1000)

    setInterval(() => this.draw(), 10);
  }

  explode(event: MouseEvent) {
    // console.log("Clicked at " + event.offsetX + ":" + event.offsetY)

    // this.gridService.getGrid().applyDirectedForce(50, 50, event.pageX, event.pageY, 50);
    // this.entityArr.forEach(e => { if (e instanceof Tower) e.shoot(event.pageX, event.pageY) });
    const dummy = new Unit_Base(event.offsetX, event.offsetY, 20, 20, 2, 1);
    dummy.dir = Util.aimAngle([dummy.x, dummy.y], [400, 600]);
    dummy.spawn();
  }

  draw() {
    if (!this.rC || !this.canvas)
      return;
    this.rC.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.clearCanvas();
    // this.canvas.height = Settings.screenH;
    // this.canvas.width = Settings.screenW;
    //Draw foreground
    this.rC.globalCompositeOperation = 'source-over';
    this.updateParticles();
    Entity_Base.entities.forEach(e => {
      if (!this.rC || e instanceof Particle)
        return;
      e.draw(this.rC);
      e.update();
    })

    GameService.gameController.update();
    GameService.gameController.draw(this.rC);

    //FPS or ms per frame I guess
    this.rC.fillStyle = new Colour(255, 255, 255, 1).toString();
    let frameTime = new Date().getTime() - this.lastTickTime;
    this.rC.fillText(frameTime + "ms", 20, 20);
    this.lastTickTime = new Date().getTime();
    // console.log(Entity_Base.entities.length)

    //Draw background
    this.rC.globalCompositeOperation = 'destination-over';
    this.gridService.getGrid().draw(this.rC);
    this.gridService.getGrid().update();
    // this.bgGrid.draw(this.rC);
    // this.bgGrid.update();
    this.rC.fillStyle = "black"
    this.rC.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateParticles() {
    Particle.particles.forEach(p => {
      if (!this.rC) { return; }

      // p.colour = this.colourMode;
      p.draw(this.rC);

      //Set RGB


      p.update();
      // this.bgGrid.applyExplosiveForce(0.15, p.x, p.y, 20);
    })
  }

  // clearCanvas() {
  //   if (!this.rC || !this.canvas)
  //     return;
  //   // this.rC.fillStyle = "black";
  //   this.rC.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   // this.rC.fillRect(0, 0, this.canvas.width, this.canvas.height);
  // }
}

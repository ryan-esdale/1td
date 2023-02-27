import { Injectable } from '@angular/core';
import { Entity_Base } from 'src/app/objects/base/entity_base';
import { Colour } from 'src/app/objects/util/colour';
import { Particle } from 'src/app/objects/base/particle_base';
import { GridService } from 'src/app/objects/background/services/grid.service';
import { GameService } from './game.service';
import { Settings } from 'src/app/objects/util/settings';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private rC: CanvasRenderingContext2D | undefined | null;
  private canvas: HTMLCanvasElement | undefined;

  private lastTickTime = new Date().getTime();
  private frameTimes: number[] = [];
  public shouldDraw = true;

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

    // GameService.gameController.startCurrentRound();

    setInterval(() => {
      if (new Date().getTime() - this.lastTickTime < 10) {
        return;
      }
      // this.lastTickTime = new Date().getTime();
      this.draw()
    }, 1);
  }

  draw() {
    if (!this.rC || !this.canvas || !this.shouldDraw)
      return;
    this.rC.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
    this.lastTickTime = new Date().getTime();
    this.frameTimes.push(frameTime);
    if (this.frameTimes.length > 200) {
      this.frameTimes.splice(0, 1);
    }
    let avgFrameTime = 0
    this.frameTimes.forEach(f => avgFrameTime += f);
    this.rC.fillText(Math.trunc(avgFrameTime / 200) + "ms", 20, 20);
    this.rC.fillText(Math.trunc(1000 / (avgFrameTime / 200)) + "fps", 20, 40);

    //Draw background
    this.rC.globalCompositeOperation = 'destination-over';
    this.gridService.getGrid().draw(this.rC);
    this.gridService.getGrid().update();
    this.rC.fillStyle = "black"
    this.rC.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateParticles() {
    Particle.particles.forEach(p => {
      if (!this.rC) { return; }

      p.draw(this.rC);
      p.update();

      //TODO Railgun shooting with this effect, v cool
      // this.gridService.getGrid().applyExplosiveForce(0.005, p.x, p.y, 100);
      // this.gridService.getGrid().applyImplosiveForce(0.0075, p.x, p.y, 100);
      // this.gridService.getGrid().applyDirectedForce(0.5, 0, p.x, p.y, 100);
    })
  }

}

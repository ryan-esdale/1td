import { Injectable } from '@angular/core';
import { Entity_Base } from 'src/app/objects/base/entity_base';

@Injectable({
  providedIn: 'root'
})
export class BackgroundDrawService {

  private rC: CanvasRenderingContext2D | undefined | null;
  private canvas: HTMLCanvasElement | undefined;

  private entityArr: Entity_Base[] = [];

  constructor() { }

  initialiseContext(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.height = 1200;
    canvas.width = 800;

    this.rC = canvas.getContext("2d");

    if (!this.rC) {
      return;
    }

    this.rC.fillStyle = "black";
    this.rC.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

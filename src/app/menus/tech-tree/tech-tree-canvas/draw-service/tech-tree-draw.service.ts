import { Injectable } from '@angular/core';
import { GridService } from 'src/app/objects/background/services/grid.service';
import { TechTree } from 'src/app/objects/tech-tree/TechTree';
import { Settings } from 'src/app/objects/util/settings';

@Injectable({
  providedIn: 'root'
})
export class TechTreeDrawService {

  private rC: CanvasRenderingContext2D | undefined | null;
  private canvas: HTMLCanvasElement | undefined;

  private tempTechTree = new TechTree();
  private isDragging: boolean = false;
  private dragOffset: number[] = [0, 0];
  private dragStart: number[] = [0, 0];

  constructor() { }

  initialiseContext(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.height = Settings.screenH;
    canvas.width = Settings.screenW;

    this.rC = canvas.getContext("2d");

    if (!this.rC) {
      return;
    }

    this.rC.font = this.rC.font.replace(/\d+px/, "24px");
    // this.rC.font = "Comic Sans 24px"

    this.canvas.addEventListener('mousedown', this.enableDrag.bind(this), false)
    this.canvas.addEventListener('mouseup', this.disableDrag.bind(this), false)
    this.canvas.addEventListener('mousemove', this.drag.bind(this), false)

    // this.draw();
    setInterval(() => {
      this.draw()
    }, 10);
  }

  enableDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.dragStart = [event.pageX - this.dragOffset[0], event.pageY - this.dragOffset[1]];
  }

  disableDrag(): void {
    this.isDragging = false;
  }

  drag(event: MouseEvent) {
    if (!this.isDragging)
      return;
    this.dragOffset = [event.pageX - this.dragStart[0], event.pageY - this.dragStart[1]];
  }

  draw(): void {
    if (!this.rC || !this.canvas)
      return;
    this.rC.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.rC.globalCompositeOperation = 'source-over';

    this.rC.save();

    // this.rC.beginPath()
    // this.rC.strokeStyle = "white"
    // // this.rC.strokeText("TEST", 0, 0);
    // this.rC.strokeRect(600, 800, 1000, 1000);
    // this.rC.stroke();

    this.rC.fillStyle = "white"
    this.rC.strokeStyle = "white"
    const startPosition = [this.canvas.width / 2, this.canvas.height / 2];

    this.rC.fillText("" + this.dragOffset[0] + " - " + this.dragOffset[1], 400, 400);

    this.tempTechTree.nodes.forEach(node => {
      const nodePosition = [node.pos[0] + startPosition[0] + this.dragOffset[0], node.pos[1] + startPosition[1] + this.dragOffset[1]]
      this.rC?.fillText(node.name, nodePosition[0], nodePosition[1]);
      this.rC?.beginPath();
      this.rC?.moveTo(nodePosition[0], nodePosition[1]);
      const parentPos = this.tempTechTree.getParentNodePos(node);
      this.rC?.lineTo(parentPos[0] + startPosition[0] + this.dragOffset[0], parentPos[1] + startPosition[1] + this.dragOffset[1]);
      this.rC?.stroke();
    })

    this.rC.restore();
  }


}

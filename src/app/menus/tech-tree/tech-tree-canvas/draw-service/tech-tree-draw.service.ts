import { Injectable } from '@angular/core';
import { GridService } from 'src/app/objects/background/services/grid.service';
import { TechTree } from 'src/app/objects/tech-tree/TechTree';
import { Colour } from 'src/app/objects/util/colour';
import { Settings } from 'src/app/objects/util/settings';

@Injectable({
  providedIn: 'root'
})
export class TechTreeDrawService {

  private rC: CanvasRenderingContext2D | undefined | null;
  private canvas: HTMLCanvasElement | undefined;
  private lastTickTime = new Date().getTime();

  private tempTechTree = new TechTree();
  private isDragging: boolean = false;
  private dragOffset: number[] = [0, 0];
  private dragStart: number[] = [0, 0];


  private gradientArray = [0, 0, 0.15, 0.17, 1];
  private hexOffset = 0;
  private hexOffsetDir = 1;

  constructor() { }

  initialiseContext(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.height = Settings.screenH;
    canvas.width = Settings.screenW;

    this.rC = canvas.getContext("2d");
    console.log("Initialised")
    if (!this.rC) {
      return;
    }

    this.rC.font = this.rC.font.replace(/\d+px/, "24px");
    // this.rC.font = "Comic Sans 24px"

    this.canvas.addEventListener('mousedown', this.enableDrag.bind(this), false)
    this.canvas.addEventListener('mouseup', this.disableDrag.bind(this), false)
    this.canvas.addEventListener('mousemove', this.drag.bind(this), false)

    setInterval(() => {
      if (new Date().getTime() - this.lastTickTime < 20) {
        return;
      }
      this.lastTickTime = new Date().getTime();
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

    // this.rC.fillText("" + this.dragOffset[0] + " - " + this.dragOffset[1], 400, 400);

    this.tempTechTree.nodes.forEach(node => {
      if (!this.rC)
        return
      const nodePosition = [node.pos[0] + startPosition[0] + this.dragOffset[0], node.pos[1] + startPosition[1] + this.dragOffset[1]]


      this.rC.beginPath()
      this.rC.strokeStyle = "white"
      this.rC.lineWidth = 2;
      // this.rC.strokeText("TEST", 0, 0);
      const boxDim = [150, 30];
      this.rC.strokeRect(nodePosition[0], nodePosition[1], boxDim[0], (node.pos[1] <= 0 ? -boxDim[1] : boxDim[1]));
      this.rC.stroke();
      this.rC.fillStyle = new Colour(25, 25, 35, 255).toString();
      this.rC.fillRect(nodePosition[0], nodePosition[1], boxDim[0], (node.pos[1] <= 0 ? -boxDim[1] : boxDim[1]));


      this.rC.beginPath();
      this.rC.moveTo(nodePosition[0], nodePosition[1]);
      const parentPosOffset = this.tempTechTree.getParentNodePos(node);
      const parentPos = [parentPosOffset[0] + startPosition[0] + this.dragOffset[0], parentPosOffset[1] + startPosition[1] + this.dragOffset[1]];


      //If they're not lined up, do some cool diagonal stuff

      const straightLength = 20;
      const diagLength = 10;
      if (parentPos[0] != nodePosition[0] || parentPos[1] != nodePosition[1]) {
        const xDiff = (parentPos[0] - nodePosition[0]);
        const yDiff = (parentPos[1] - nodePosition[1]);

        this.rC.lineTo(nodePosition[0], nodePosition[1] + (straightLength * Math.sign(yDiff)));
        this.rC.lineTo(nodePosition[0] + (diagLength * Math.sign(xDiff)), nodePosition[1] + ((diagLength + straightLength) * Math.sign(yDiff)));
        this.rC.lineTo(parentPos[0] - (diagLength * Math.sign(xDiff)), nodePosition[1] + ((diagLength + straightLength) * Math.sign(yDiff)));
        this.rC.lineTo(parentPos[0], nodePosition[1] + ((2 * diagLength + straightLength) * Math.sign(yDiff)));
      }

      this.rC.lineTo(parentPos[0], parentPos[1]);
      this.rC.stroke();

      this.rC.font = this.rC.font.replace(/\d+px/, "16px");
      this.rC.fillStyle = "white";
      this.rC.fillText(node.name, nodePosition[0], nodePosition[1] + (node.pos[1] <= 0 ? -10 : 20));
    })

    this.rC.restore();


    //Cool hex grid thing

    const hexStartPos = [0, 0];
    this.rC.save()
    this.rC.strokeStyle = "white"
    this.rC.globalCompositeOperation = 'destination-over';

    const extraSpace = 300;
    let gradient = this.rC?.createLinearGradient(-extraSpace, 0, this.canvas.width + extraSpace, this.canvas.height);
    gradient?.addColorStop(this.gradientArray[0], "black");
    gradient?.addColorStop(this.gradientArray[1], "black");
    gradient?.addColorStop(this.gradientArray[2], "gold");
    gradient?.addColorStop(this.gradientArray[3], "black");
    gradient?.addColorStop(this.gradientArray[4], "black");

    this.gradientArray[1] += 0.001;
    this.gradientArray[2] += 0.001;
    this.gradientArray[3] += 0.001;


    if (this.gradientArray[1] > 1)
      this.gradientArray[1] -= 1;

    if (this.gradientArray[2] > 1)
      this.gradientArray[2] -= 1;

    if (this.gradientArray[3] > 1)
      this.gradientArray[3] -= 1;

    this.rC.strokeStyle = gradient


    this.rC.fillStyle = "white"
    this.drawHexGrid(this.canvas.width, this.canvas.height, this.rC);
    this.rC.restore();


  }

  drawHexGrid(width: number, height: number, rC: CanvasRenderingContext2D): void {
    const hexDim = 120;
    const angle = Math.PI * 2 / 6;
    // + hexDim * Math.sin(angle)
    // + hexDim * (1 + Math.cos(angle))
    for (let row = 0; row - 2 * (hexDim * Math.sin(angle)) < height; row += 2 * (hexDim * Math.sin(angle))) {
      // for (let row = height; row > 0; row -= 2 * (hexDim * Math.sin(angle))) {
      for (let x = -hexDim, j = 0; x - hexDim * (1 + Math.cos(angle)) < width; x += hexDim * (1 + Math.cos(angle)), j++) {
        let yOffest = 0.5 * hexDim * Math.sin(angle);
        if (j % 2 == 0)
          yOffest *= -1;
        this.drawHex(x, row - yOffest, rC);

        // this.rC?.fillText(" " + x + ":" + (row - yOffest), x, row - yOffest);
      }
    }
  }


  drawHex(x: number, y: number, rC: CanvasRenderingContext2D): void {
    const hexDim = 120;
    const angle = Math.PI * 2 / 6;
    // let gradient = this.rC?.createLinearGradient(x, y - 60, x, y + 60);
    rC.save();
    // console.log(x)

    // rC.globalCompositeOperation = 'source-over';


    //Glowing lines

    rC.lineWidth = 3;
    rC.beginPath();
    for (let i = 0; i < 6; i++) {
      rC.lineTo(x + hexDim * Math.cos(angle * i), y + hexDim * Math.sin(angle * i));
    }
    rC.closePath();
    rC.stroke();

    //Light/Dark edge highlights
    rC.beginPath();
    rC.strokeStyle = new Colour(200, 200, 200, 0.15).toString()
    for (let i = 3; i < 6; i++) {
      rC.lineTo(x + (hexDim - 3) * Math.cos(angle * i), y + (hexDim - 3) * Math.sin(angle * i));
    }
    rC.stroke();
    rC.beginPath();
    rC.strokeStyle = new Colour(0, 0, 0, 0.5).toString()
    for (let i = 0; i < 2; i++) {
      rC.lineTo(x + (hexDim - 3) * Math.cos(angle * i), y + (hexDim - 3) * Math.sin(angle * i));
    }
    rC.stroke();

    //Filled Hex
    //TODO: Add some cool animation here

    rC.fillStyle = new Colour(25, 25, 35, 255).toString();
    // if (x == 600 && y > 500 && y < 700) {

    //   if (this.hexOffset > 10 && this.hexOffsetDir == 1) {
    //     this.hexOffsetDir = -1;
    //   }
    //   else if (this.hexOffset < 5 && this.hexOffsetDir == -1) {

    //     this.hexOffsetDir = 1;
    //   }
    //   this.hexOffset += this.hexOffsetDir * 0.05;
    //   // rC.fillStyle = "red"
    //   y -= this.hexOffset;
    // }
    rC.beginPath();
    for (let i = 0; i < 6; i++) {
      rC.lineTo(x + hexDim * Math.cos(angle * i), y + hexDim * Math.sin(angle * i));
    }
    rC.closePath();
    rC.fill()

    rC.restore();
  }

}

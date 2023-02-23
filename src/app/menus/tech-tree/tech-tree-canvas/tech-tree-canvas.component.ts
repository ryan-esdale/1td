import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Settings } from 'src/app/objects/util/settings';
import { TechTreeDrawService } from './draw-service/tech-tree-draw.service';

@Component({
  selector: 'app-tech-tree-canvas',
  templateUrl: './tech-tree-canvas.component.html',
  styleUrls: ['./tech-tree-canvas.component.css']
})
export class TechTreeCanvasComponent implements OnInit, AfterViewInit {

  //@ts-ignore
  @ViewChild('techTreeCanvas') private canvas: ElementRef;

  public sceneW = Settings.screenW;
  public sceneH = Settings.screenH;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.doResize();
  }

  constructor(
    private drawService: TechTreeDrawService,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(this.canvas)
    if (!this.canvas) {
      alert("Canvas not supplied! cannot bind WebGL context");
      console.log("Canvas not supplied! cannot bind WebGL context");
      return;
    }

    this.doResize();
    this.drawService.initialiseContext(this.canvas.nativeElement);
  }

  doResize() {
    if (window.innerWidth > 1250) {
      Settings.screenW = Math.floor((window.innerWidth) / Settings.gridSpacing) * Settings.gridSpacing;
    } else {
      Settings.screenW = Math.floor((window.innerWidth - Settings.menuW) / Settings.gridSpacing) * Settings.gridSpacing;
    }
    Settings.screenH = Math.floor((window.innerHeight - Settings.navH) / Settings.gridSpacing) * Settings.gridSpacing;
    console.log("Settings W/H: " + Settings.screenW + " - " + Settings.screenH);
    const xDiff = Settings.screenW - this.sceneW;
    const yDiff = Settings.screenH - this.sceneH;
    this.sceneW = Settings.screenW;
    this.sceneH = Settings.screenH;
    this.canvas.nativeElement.width = this.sceneW;
    this.canvas.nativeElement.height = this.sceneH;
  }

}

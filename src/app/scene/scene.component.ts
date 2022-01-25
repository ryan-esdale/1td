import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GridService } from '../objects/background/services/grid.service';
import { Entity_Base } from '../objects/base/entity_base';
import { Particle } from '../objects/base/particle_base';
import { Settings } from '../objects/util/settings';
import { BackgroundDrawService } from './services/background-draw.service';
import { DrawService } from './services/draw.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit, AfterViewInit {

  //@ts-ignore
  @ViewChild('sceneCanvas') private canvas: ElementRef;
  //@ts-ignore
  // @ViewChild('backgroundCanvas') private bgCanvas: ElementRef;
  public sceneW = Settings.screenW;
  public sceneH = Settings.screenH;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.doResize();
  }

  constructor(
    private drawService: DrawService,
    private backgroundService: BackgroundDrawService,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // console.log(this.canvas)
    if (!this.canvas) {
      alert("Canvas not supplied! cannot bind WebGL context");
      console.log("Canvas not supplied! cannot bind WebGL context");
      return;
    }
    this.drawService.initialiseContext(this.canvas.nativeElement);
    this.doResize();

    // this.backgroundService.initialiseContext(this.bgCanvas.nativeElement);
  }

  doResize() {

    if (window.innerWidth > 1250) {
      Settings.screenW = Math.floor((window.innerWidth) / Settings.gridSpacing) * Settings.gridSpacing;
    } else {
      Settings.screenW = Math.floor((window.innerWidth - Settings.menuW) / Settings.gridSpacing) * Settings.gridSpacing;
    }
    Settings.screenH = Math.floor((window.innerHeight - Settings.navH) / Settings.gridSpacing) * Settings.gridSpacing;
    // console.log(Settings.screenW + " - " + Settings.screenH);
    const xDiff = Settings.screenW - this.sceneW;
    const yDiff = Settings.screenH - this.sceneH;
    this.sceneW = Settings.screenW;
    this.sceneH = Settings.screenH;
    this.canvas.nativeElement.width = this.sceneW;
    this.canvas.nativeElement.height = this.sceneH;
    GridService.prototype.newGrid();
    // console.log("xD: " + xDiff);
    Particle.particles.forEach(p => {
      p.x += xDiff / 2;
      p.y += yDiff / 2;
    });
    Entity_Base.entities.forEach(e => {
      e.x += xDiff / 2;
      e.y += yDiff / 2;
    })
  }
}

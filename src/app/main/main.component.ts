import { Component, OnInit } from '@angular/core';
import { DrawService } from '../scene/services/draw.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private drawService: DrawService) { }

  ngOnInit(): void {
  }

  shouldDrawGridView(): boolean {
    return this.drawService.shouldDraw;
  }
}

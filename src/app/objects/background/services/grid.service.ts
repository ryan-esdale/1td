import { Injectable } from '@angular/core';
import { Settings } from '../../util/settings';
import { Grid } from '../grid';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private static grid: Grid;

  constructor() {
    GridService.grid = new Grid(Settings.screenW, Settings.screenH, Settings.gridSpacing);
  }

  getGrid() {
    return GridService.grid;
  }

  newGrid() {
    GridService.grid = new Grid(Settings.screenW, Settings.screenH, Settings.gridSpacing);
  }

  gridCentre() {
    return [Settings.screenW / 2, Settings.screenH / 2];
  }
}

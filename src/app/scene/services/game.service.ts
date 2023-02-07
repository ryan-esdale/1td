import { Injectable } from '@angular/core';
import { Game_Controller } from 'src/app/objects/game_controller';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public static gameController: Game_Controller;

  constructor() {
    GameService.gameController = new Game_Controller();
    GameService.gameController.startCurrentRound();
  }
}

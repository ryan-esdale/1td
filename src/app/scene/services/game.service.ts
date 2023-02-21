import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { Game_Controller } from 'src/app/objects/game_controller';
import { DrawService } from './draw.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public static gameController: Game_Controller;

  constructor(private alerts: AlertService) {
    GameService.gameController = new Game_Controller(alerts);
    GameService.gameController.startCurrentRound();
  }
}

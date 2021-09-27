import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  public getPoints(): number {
    return this.gameService.points;
  }

  public getTotal(): number {
    return this.gameService.total;
  }

}

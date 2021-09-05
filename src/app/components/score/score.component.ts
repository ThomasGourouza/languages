import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/service/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
  }

  public getPoints(): number {
    return this.scoreService.points;
  }

  public getTotal(): number {
    return this.scoreService.total;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _points: number;
  private _total: number;

  constructor() { 
    this._points = 0;
    this._total = 0;
  }

  get points(): number {
    return this._points;
  }

  set points(points: number) {
    this._points = points;
  }

  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = total;
  }

}

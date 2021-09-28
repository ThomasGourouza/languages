import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _start$ = new Subject<boolean>();
  private _revision$ = new Subject<boolean>();
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

  public get start$(): Observable<boolean> {
    return this._start$.asObservable();
  }

  public setStart$(start: boolean): void {
    this._start$.next(start);
  }

  public get revision$(): Observable<boolean> {
    return this._revision$.asObservable();
  }

  public setRevision$(revision: boolean): void {
    this._revision$.next(revision);
  }

}

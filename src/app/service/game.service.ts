import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _start$ = new Subject<boolean>();

  constructor() { }

  public get start$(): Observable<boolean> {
    return this._start$.asObservable();
  }

  public setStart$(start: boolean): void {
    this._start$.next(start);
  }

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public isArrayIncluded(array1: Array<Word>, array2: Array<Word>): boolean {
    return !array1.some((word) => !array2.map((w) => w.german).includes(word.german));
  }

  public isWordIncluded(word: Word, array: Array<Word>): boolean {
    return array.map((w) => w.german).includes(word.german);
  }
}

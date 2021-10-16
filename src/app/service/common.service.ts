import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export interface Item {
  label: string;
  value: string | number;
}
export interface Mode {
  icon: string,
  activated: boolean
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _categories: Array<Item>;
  private _numbersOfWords: Array<number>;
  private _numbersOfOptions: Array<number>;
  private _numbersOfRounds: Array<number>;
  private _ratings: Array<Item>;
  private _modes: Array<Mode>;
  private _mode: Mode

  constructor() {
    this._categories = [
      { label: 'Verb', value: 'verb' },
      { label: 'Adjective', value: 'adjective' },
      { label: 'Noun', value: 'noun' },
      { label: 'Phrase', value: 'phrase' },
      { label: 'Conjonction', value: 'conjonction' },
    ];
    this._numbersOfWords = [
      5, 10, 20, 30
    ];
    this._numbersOfOptions = [
      3, 5, 10
    ];
    this._numbersOfRounds = [
      10, 20, 30, 50, 100
    ];
    this._ratings = [
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];
    this._modes = [
      { icon: 'pi pi-sun', activated: true },
      { icon: 'pi pi-moon', activated: false }
    ];
    this._mode = this._modes[0];
  }

  get mode(): Mode {
    return this._mode;
  }

  set mode(mode: Mode) {
    this._mode = mode;
  }

  get categories(): Array<Item> {
    return this._categories;
  }

  get numbersOfWords(): Array<number> {
    return this._numbersOfWords;
  }

  get numbersOfOptions(): Array<number> {
    return this._numbersOfOptions;
  }

  get numbersOfRounds(): Array<number> {
    return this._numbersOfRounds;
  }

  get ratings(): Array<Item> {
    return this._ratings;
  }

  get modes(): Array<Mode> {
    return this._modes;
  }

}

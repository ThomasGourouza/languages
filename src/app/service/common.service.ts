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
  private _ratings: Array<Item>;
  private _modes: Array<Mode>;
  private _activated$ = new Subject<boolean>();

  constructor() {
    this._categories = [
      { label: 'Verb', value: 'verb' },
      { label: 'Adjective', value: 'adjective' },
      { label: 'Noun', value: 'noun' },
      { label: 'Phrase', value: 'phrase' },
      { label: 'Conjonction', value: 'conjonction' },
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
  }

  public get categories(): Array<Item> {
    return this._categories;
  }

  public get ratings(): Array<Item> {
    return this._ratings;
  }

  public get modes(): Array<Mode> {
    return this._modes;
  }

  public get activated$(): Observable<boolean> {
    return this._activated$.asObservable();
  }

  public setModeActive$(activated: boolean): void {
    this._activated$.next(activated);
  }

}

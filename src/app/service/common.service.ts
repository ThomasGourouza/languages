import { Injectable } from '@angular/core';
export interface Item {
  label: string;
  value: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _categories: Array<Item>;
  private _ratings: Array<Item>;

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
  }

  public get categories(): Array<Item> {
    return this._categories;
  }

  public get ratings(): Array<Item> {
    return this._ratings;
  }

}

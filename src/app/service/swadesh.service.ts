import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Category, Subcategory } from '../models/swadesh-categories';
import { SwadeshItem } from '../models/swadesh-item';
import { Language, Languages } from '../models/swadesh-languages';

@Injectable({
  providedIn: 'root'
})
export class SwadeshService {

  private _swadeshItems$!: Observable<Array<SwadeshItem>>;
  private _languages: Array<Language>;
  private _categories: Map<Category, Array<Subcategory>>;
  public _accordionTabSelected: number;

  constructor(
    private http: HttpClient
  ) {
    this._accordionTabSelected = 0;
    this._swadeshItems$ = from(this.getData());
    this._languages = [];
    let index = 1;
    for (let language in Languages) {
      this._languages.push({
        name: language,
        selected: [Languages.english.toString(), Languages.german.toString()]
          .includes(language),
        rank: index
      });
      index++;
    }
    this._categories = new Map<Category, Array<Subcategory>>();
    this._categories.set(
      Category.conjunction,
      [
        Subcategory.personal_pronoun,
        Subcategory.demonstrative_pronoun,
        Subcategory.interrogative_pronoun,
        Subcategory.adverb,
        Subcategory.preposition,
        Subcategory.quantity,
        Subcategory.number
      ]
    );
    this._categories.set(
      Category.adjective,
      [
        Subcategory.color,
        Subcategory.size,
        Subcategory.state,
        Subcategory.other
      ]
    );
    this._categories.set(
      Category.noun,
      [
        Subcategory.family,
        Subcategory.animal,
        Subcategory.nature,
        Subcategory.body,
        Subcategory.weather,
        Subcategory.landscape,
        Subcategory.other
      ]
    );
    this._categories.set(
      Category.verb,
      [
        Subcategory.mouth,
        Subcategory.animation,
        Subcategory.life,
        Subcategory.survival,
        Subcategory.action,
        Subcategory.mobility,
        Subcategory.other
      ]
    );
  }

  private async getData(): Promise<Array<SwadeshItem>> {
    return this.http.get<SwadeshItem[]>('assets/data/swadesh_list.json').toPromise();
  }

  get swadeshItems$(): Observable<Array<SwadeshItem>> {
    return this._swadeshItems$;
  }

  get languages(): Array<Language> {
    return this._languages;
  }

  get categories(): Map<Category, Array<Subcategory>> {
    return this._categories;
  }

  get accordionTabSelected(): number {
    return this._accordionTabSelected;
  }

  set accordionTabSelected(index: number) {
    this._accordionTabSelected = index;
  }

}

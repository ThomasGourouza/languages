import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class AddWordService {

  private _wordDialog$ = new Subject<boolean>();
  private _word$ = new Subject<Word>();
  private _submitted$ = new Subject<boolean>();

  constructor() {}

  get wordDialog$(): Observable<boolean> {
    return this._wordDialog$.asObservable();
  }

  public setWordDialog$(wordDialog: boolean): void {
    this._wordDialog$.next(wordDialog);
  }

  get submitted$(): Observable<boolean> {
    return this._submitted$.asObservable();
  }

  public setSubmitted$(submitted: boolean): void {
    this._submitted$.next(submitted);
  }

  get word$(): Observable<Word> {
    return this._word$.asObservable();
  }

  public setWord$(word: Word): void {
    this._word$.next(word);
  }

  public initWord$(): void {
    this.setWord$({
      category: '',
      german: '',
      translation: '',
      numberOfViews: 0,
      numberOfSuccess: 0,
      isActive: true,
      deactivationDate: null
    });
  }

}

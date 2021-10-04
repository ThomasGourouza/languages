import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, Observable } from 'rxjs';
import { Word } from '../models/word';
import { CommonService } from './common.service';
import { DictionaryService } from './dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _start$ = new Subject<boolean>();

  private _categoriesSelected: Array<string>;
  private _numberOfWords: number;
  private _numberOfOptions: number;
  private _numberOfRounds: number;
  private _revision: boolean;

  constructor(
    private commonService: CommonService,
    private dictionaryService: DictionaryService,
    private messageService: MessageService
  ) {
    this._categoriesSelected = this.commonService.categories
      .map((category) =>
        category.value.toString()
      );
    this._numberOfWords = 20;
    this._numberOfOptions = 5;
    this._numberOfRounds = 10;
    this._revision = false;
  }

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

  public get categoriesSelected(): Array<string> {
    return this._categoriesSelected;
  }

  public set categoriesSelected(categoriesSelected: Array<string>) {
    this._categoriesSelected = categoriesSelected;
  }

  public get numberOfWords(): number {
    return this._numberOfWords;
  }

  public set numberOfWords(numberOfWords: number) {
    this._numberOfWords = numberOfWords;
  }

  public get numberOfOptions(): number {
    return this._numberOfOptions;
  }

  public set numberOfOptions(numberOfOptions: number) {
    this._numberOfOptions = numberOfOptions;
  }

  public get numberOfRounds(): number {
    return this._numberOfRounds;
  }

  public set numberOfRounds(numberOfRounds: number) {
    this._numberOfRounds = numberOfRounds;
  }

  public get revision(): boolean {
    return this._revision;
  }

  public set revision(revision: boolean) {
    this._revision = revision;
  }

  public limitError(): void {
    const detailMessage = 'The limit for \"Word\" is too high !';
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: detailMessage, life: 3000 });
  }

  public manageWordInDB(word: Word, isCorrect: boolean): void {
    const rating = (word.numberOfViews > 0) ?
      Math.round(5 * (word.numberOfSuccess / word.numberOfViews)) : 0;
    if (
      +word.numberOfViews >= 99
      && !!word.id
    ) {
      if (rating === 5) {
        this.dictionaryService.deleteWord(word.id, word.german, true);
      } else {
        this.dictionaryService.deactivateWord(word.id, word.german);
      }
    } else if (!!word.id) {
      this.dictionaryService.viewWord(
        word.id,
        +word.numberOfViews,
        +word.numberOfSuccess,
        isCorrect
      );
    }
  }

}

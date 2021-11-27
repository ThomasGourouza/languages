import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MessageService } from 'primeng/api';
import { from, Observable } from 'rxjs';
import { Filterform } from '../components/dictionary/dictionary.component';
import { Word } from '../models/word';
import { WordUpdate } from '../models/word-update';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private _wordsCollection!: AngularFirestoreCollection<Word>;
  private _words!: Observable<Array<Word>>;
  private _filterform: Filterform;

  private COLLECTION!: string;
  private FIREBASE!: boolean;
  private DEACTIVATION_TIME: number = 30;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private messageService: MessageService,
    private settingsService: SettingsService
  ) {
    this.COLLECTION = this.settingsService.languageInit;
    this.FIREBASE = this.settingsService.firebaseInit;
    this.settingsService.language$.subscribe((language) => {
      this.COLLECTION = language;
      this.loadWords();
    });
    this.settingsService.firebase$.subscribe((firebase) => {
      this.FIREBASE = firebase;
      this.loadWords();
    });
    this._filterform = {
      german: '',
      translation: '',
      categories: [],
      ratings: []
    }
  }

  private loadWords(): void {
    if (this.FIREBASE) {
      this._wordsCollection = this.afs.collection(this.COLLECTION);
      this._words = this._wordsCollection.valueChanges({ idField: 'id' });
    } else {
      this._words = from(this.getData());
    }
  }

  get filterform(): Filterform {
    return this._filterform;
  }

  set filterform(form: Filterform) {
    this._filterform = form;
  }

  public isFilterNotEmpty(): boolean {
    return this._filterform.categories.length > 0
      || this._filterform.ratings.length > 0
      || this._filterform.german != ''
      || this._filterform.translation != '';
  }

  private async getData(): Promise<Array<Word>> {
    return this.http.get<Word[]>('assets/data/dictionary.json').toPromise();
  }

  get words(): Observable<Array<Word>> {
    return this._words;
  }

  public addWord(word: WordUpdate, wordExists: boolean): void {
    if (wordExists) {
      const detailMessage = 'Word ' + word.german + ' already exists';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: detailMessage, life: 3000 });
    } else {
      this.afs.collection(this.COLLECTION)
        .add(word).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word saved', life: 3000 });
        }).catch(() => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save failure', life: 3000 });
        });
    }
  }

  public deleteWord(id: string, german: string, fromGame?: boolean): void {
    this.afs.collection(this.COLLECTION).doc(id)
      .delete().then(() => {
        const detailMessage = 'The word \"' + german + '\" has been deleted';
        const sev = !fromGame ? 'success' : 'info';
        const sum = !fromGame ? 'Successful' : 'Info';
        this.messageService.add({ severity: sev, summary: sum, detail: detailMessage, life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete failure for ' + '\"' + german + '\"', life: 3000 });
      });
  }

  public activateWord(id: string, german: string): void {
    this.wordActivationControl(id, true, german, 0);
  }

  public deactivateWord(id: string, german: string, rating: number | undefined): void {
    this.wordActivationControl(id, false, german, rating);
  }

  private wordActivationControl(id: string, isActiveValue: boolean, german: string, ratingValue: number | undefined): void {
    const wordUpdate: WordUpdate = {
      isActive: isActiveValue,
      numberOfViews: isActiveValue ? 0 : 100,
      numberOfSuccess: 0,
      rating: ratingValue,
      deactivationDate: isActiveValue ? null : new Date()
    };
    this.afs.collection(this.COLLECTION).doc(id)
      .update(wordUpdate).then(() => {
        const detailMessage = 'The word \"' + german + '\" has been ' + (isActiveValue ? 'activated' : 'deactivated');
        this.messageService.add({ severity: 'info', summary: 'Info', detail: detailMessage, life: 3000 });
      }).catch(() => {
        const detailMessage = (isActiveValue ? 'Activation failure' : 'Deactivation failure') + ' for \"' + german + '\"';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: detailMessage, life: 3000 });
      });
  }

  public update(id: string, wordUpdate: WordUpdate): void {
    this.afs.collection(this.COLLECTION).doc(id)
      .update(wordUpdate).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word updated', life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failure', life: 3000 });
      });
  }

  public viewWord(id: string, view: number, success: number, isCorrect: boolean): void {
    const wordUpdate: WordUpdate = {
      numberOfViews: view + 5,
      numberOfSuccess: isCorrect ? success + 5 : success
    };
    this.afs.collection(this.COLLECTION).doc(id).update(wordUpdate);
  }

  public manageWord(words: Array<Word>, activated: boolean): Array<Word> {
    const activeWords = words.filter((word) => word.isActive === activated);
    activeWords.forEach((word) => {
      if (!word.isActive) {
        const reactivationDate = new Date();
        reactivationDate.setDate(word.deactivationDate.toDate().getDate() + this.DEACTIVATION_TIME);
        const today = new Date();
        if (this.compareDate(today, reactivationDate) === -1) {
          for (let i = 0; i < this.DEACTIVATION_TIME; i++) {
            const reactivationDateStatus = new Date();
            reactivationDateStatus.setDate(word.deactivationDate.toDate().getDate() + i);
            const status = Math.floor(((this.DEACTIVATION_TIME - i) / this.DEACTIVATION_TIME) * 100);
            if (reactivationDateStatus.toLocaleDateString() === today.toLocaleDateString()
              && word.numberOfViews !== status) {
              const wordUpdate: WordUpdate = {
                numberOfViews: status
              };
              this.afs.collection(this.COLLECTION).doc(word.id).update(wordUpdate);
              break;
            }
          }
        } else if (word.numberOfViews !== 0) {
          const wordUpdate: WordUpdate = {
            numberOfViews: 0
          };
          this.afs.collection(this.COLLECTION).doc(word.id).update(wordUpdate);
        }
      } else {
        word.rating = (word.numberOfViews > 0) ?
          Math.round(5 * (word.numberOfSuccess / word.numberOfViews)) : 0;
      }
    });
    return activeWords;
  }

  private compareDate(date1: Date, date2: Date): number {
    const yearDiffResult = this.returnResult(date1.getFullYear() - date2.getFullYear());
    const monthDiffResult = this.returnResult(date1.getMonth() - date2.getMonth());
    const dayDiffResult = this.returnResult(date1.getDate() - date2.getDate());
    if ([-1, 1].includes(yearDiffResult)) {
      return yearDiffResult;
    }
    if ([-1, 1].includes(monthDiffResult)) {
      return monthDiffResult;
    }
    return dayDiffResult;
  }

  private returnResult(comparison: number): number {
    if (comparison < 0) {
      return -1;
    } else if (comparison > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}

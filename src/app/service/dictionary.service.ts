import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MessageService } from 'primeng/api';
import { from, Observable } from 'rxjs';
import { Word } from '../models/word';
import { WordUpdate } from '../models/word-update';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private _wordsCollection!: AngularFirestoreCollection<Word>;
  private _words!: Observable<Array<Word>>;
  private _localWords!: Observable<Array<Word>>;

  private GERMAN_COLLECTION: string = 'russian';
  private RUSSIAN_COLLECTION: string = 'russian';
  private DEACTIVATION_TIME: number = 7;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private messageService: MessageService,
    private settingsService: SettingsService
  ) {
    this.settingsService.language$.subscribe((lang) => {
      console.log(lang);
    });
    this._wordsCollection = this.afs.collection(this.GERMAN_COLLECTION);
    this._words = this._wordsCollection.valueChanges({ idField: 'id' });
    this._localWords = from(this.getData());
  }

  public async getData(): Promise<Array<Word>> {
    return this.http.get<Word[]>('assets/data/dictionary.json').toPromise();
  }

  get words(): Observable<Array<Word>> {
    return this._words;
  }

  get localWords(): Observable<Array<Word>> {
    return this._localWords;
  }

  public addWord(word: WordUpdate, wordExists: boolean): void {
    if (wordExists) {
      const detailMessage = 'Word ' + word.german + ' already exists';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: detailMessage, life: 3000 });
    } else {
      this.afs.collection(this.GERMAN_COLLECTION)
        .add(word).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word saved', life: 3000 });
        }).catch(() => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save failure', life: 3000 });
        });
    }
  }

  public deleteWord(id: string, german: string, fromGame?: boolean): void {
    this.afs.collection(this.GERMAN_COLLECTION).doc(id)
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
    this.wordActivationControl(id, true, german);
  }

  public deactivateWord(id: string, german: string): void {
    this.wordActivationControl(id, false, german);
  }

  private wordActivationControl(id: string, isActiveValue: boolean, german: string): void {
    const wordUpdate: WordUpdate = {
      isActive: isActiveValue,
      numberOfViews: isActiveValue ? 0 : 100,
      numberOfSuccess: 0,
      deactivationDate: isActiveValue ? null : new Date()
    };
    this.afs.collection(this.GERMAN_COLLECTION).doc(id)
      .update(wordUpdate).then(() => {
        const detailMessage = 'The word \"' + german + '\" has been ' + (isActiveValue ? 'activated' : 'deactivated');
        this.messageService.add({ severity: 'info', summary: 'Info', detail: detailMessage, life: 3000 });
      }).catch(() => {
        const detailMessage = (isActiveValue ? 'Activation failure' : 'Deactivation failure') + ' for \"' + german + '\"';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: detailMessage, life: 3000 });
      });
  }

  public update(id: string, wordUpdate: WordUpdate): void {
    this.afs.collection(this.GERMAN_COLLECTION).doc(id)
      .update(wordUpdate).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word updated', life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failure', life: 3000 });
      });
  }

  public viewWord(id: string, view: number, success: number, isCorrect: boolean): void {
    const wordUpdate: WordUpdate = {
      numberOfViews: view + 1,
      numberOfSuccess: isCorrect ? success + 1 : success
    };
    this.afs.collection(this.GERMAN_COLLECTION).doc(id).update(wordUpdate);
  }

  public manageWord(words: Array<Word>, activated: boolean): Array<Word> {
    const activeWords = words.filter((word) => word.isActive === activated);
    activeWords.forEach((word) => {
      word.rating = (word.numberOfViews > 0) ?
        Math.round(5 * (word.numberOfSuccess / word.numberOfViews)) : 0;
      if (!word.isActive) {
        const reactivationDate: Date = word.deactivationDate.toDate();
        reactivationDate.setDate(reactivationDate.getDate() + this.DEACTIVATION_TIME);
        const today = new Date();
        if (
          reactivationDate.toLocaleDateString() == today.toLocaleDateString()
          && !!word.id
        ) {
          this.activateWord(word.id, word.german);
        } else {
          for (let i = 0; i < this.DEACTIVATION_TIME; i++) {
            const reactivationDateStatus: Date = word.deactivationDate.toDate();
            reactivationDateStatus.setDate(reactivationDateStatus.getDate() + i);
            const status = Math.floor(((this.DEACTIVATION_TIME - i) / this.DEACTIVATION_TIME) * 100);
            if (
              reactivationDateStatus.toLocaleDateString() == today.toLocaleDateString()
              && word.numberOfViews !== status
              && !!word.id
            ) {
              const wordUpdate: WordUpdate = {
                numberOfViews: status
              };
              this.afs.collection(this.GERMAN_COLLECTION).doc(word.id).update(wordUpdate);
              break;
            }
          }
        }
      }
    });
    return activeWords;
  }

}

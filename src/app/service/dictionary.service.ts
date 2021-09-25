import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Word } from '../models/word';
import { WordUpdate } from '../models/word-update';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private _wordsCollection!: AngularFirestoreCollection<Word>;
  private _words!: Observable<Array<Word>>;

  private COLLECTION_NAME: string = 'german';

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this._wordsCollection = this.afs.collection(this.COLLECTION_NAME);
    this._words = this._wordsCollection.valueChanges({ idField: 'id' });
  }

  public async getData(): Promise<Array<WordUpdate>> {
    return this.http.get<WordUpdate[]>('assets/data/dictionary.json').toPromise();
  }

  get words(): Observable<Array<Word>> {
    return this._words;
  }

  public addWord(word: WordUpdate): void {
    this.afs.collection(this.COLLECTION_NAME)
      .add(word).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word saved', life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Save failure', life: 3000 });
      });
  }

  public deleteWord(id: string): void {
    this.afs.collection(this.COLLECTION_NAME).doc(id)
      .delete().then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word deleted', life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Delete failure', life: 3000 });
      });
  }

  public deleteWords(ids: Array<string | undefined>): void {
    ids.forEach((id) => {
      if (!!id) {
        this.deleteWord(id);
      }
    });
  }

  public activateWords(ids: Array<string | undefined>): void {
    ids.forEach((id) => {
      if (!!id) {
        this.activateWord(id);
      }
    });
  }

  public deactivateWords(ids: Array<string | undefined>): void {
    ids.forEach((id) => {
      if (!!id) {
        this.deactivateWord(id);
      }
    });
  }

  public activateWord(id: string): void {
    this.wordActivationControl(id, true);
  }

  public deactivateWord(id: string): void {
    this.wordActivationControl(id, false);
  }

  private wordActivationControl(id: string, isActiveValue: boolean): void {
    const wordupdate: WordUpdate = { isActive: isActiveValue };
    this.afs.collection(this.COLLECTION_NAME).doc(id)
      .update(wordupdate).then(() => {
        const detailMessage = isActiveValue ? 'Word activated' : 'Word deactivated';
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: detailMessage, life: 3000 });
      }).catch(() => {
        const detailMessage = isActiveValue ? 'Activation failure' : 'Deactivation failure';
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: detailMessage, life: 3000 });
      });
  }

  public update(id: string, wordupdate: WordUpdate): void {
    this.afs.collection(this.COLLECTION_NAME).doc(id)
      .update(wordupdate).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word updated', life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Update failure', life: 3000 });
      });
  }

}

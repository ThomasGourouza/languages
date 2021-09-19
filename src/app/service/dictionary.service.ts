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

  private _verbsCategoryName: string = "Verbes";
  private _nounsCategoryName: string = "Noms";
  private _adjectivesCategoryName: string = "Adjectifs";
  private _expressionsCategoryName: string = "Expressions";

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this._wordsCollection = this.afs.collection('words');
    this._words = this._wordsCollection.valueChanges({ idField: 'id' });
  }

  public getData(): Promise<Array<WordUpdate>> {
    return this.http.get<any>('assets/data/dictionary.json')
      .toPromise()
      .then(res => <WordUpdate[]>res.data)
      .then(data => {
        return data;
      });
  }

  get words(): Observable<Array<Word>> {
    return this._words;
  }

  public addWord(word: WordUpdate): void {
    this.afs.collection('words')
      .add(word).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word Saved', life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Save failure', life: 3000 });
      });
  }

  public deleteWord(id: string): void {
    this.afs.collection('words').doc(id)
      .delete().then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });
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

  public update(id: string, wordupdate: WordUpdate): void {
    this.afs.collection('words').doc(id)
      .update(wordupdate).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word Updated', life: 3000 });
      }).catch(() => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Update failure', life: 3000 });
      });
  }

  get verbsCategoryName(): string {
    return this._verbsCategoryName;
  }
  get nounsCategoryName(): string {
    return this._nounsCategoryName;
  }
  get adjectivesCategoryName(): string {
    return this._adjectivesCategoryName;
  }
  get expressionsCategoryName(): string {
    return this._expressionsCategoryName;
  }

}

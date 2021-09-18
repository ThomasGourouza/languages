import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
    private http: HttpClient
  ) {
    this._wordsCollection = this.afs.collection('words');
    this._words = this._wordsCollection.valueChanges({ idField: 'id' });
  }

  public getData(): Promise<Array<Word>> {
    return this.http.get<any>('app/data/dictionary.json')
      .toPromise()
      .then(res => <Word[]>res.data)
      .then(data => { return data; });
  }

  get words(): Observable<Array<Word>> {
    return this._words;
  }

  public addWord(word: Word): void {
    this.afs.collection('words')
      .add(word).then(() => {
        console.log('add success');
      })
      .catch(() => {
        console.log('add error');
      });
  }

  public deleteWord(id: string): void {
    this.afs.collection('words').doc(id)
      .delete().then(() => {
        console.log('delete success');
      }).catch(() => {
        console.log('delete error');
      });
  }

  public update(id: string, wordupdate: WordUpdate): void {
    this.afs.collection('words').doc(id)
      .update(wordupdate).then(() => {
        console.log('update success');
      }).catch(() => {
        console.log('update error');
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

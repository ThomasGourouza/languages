import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
export interface Option {
  label: string;
  value: boolean | string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _firebase: boolean;
  private _language: string;
  private _language$ = new Subject<string>();
  private _firebaseOptions: Array<Option>;
  private _languageOptions: Array<Option>;

  constructor(
    private messageService: MessageService
  ) {
    this._language$.next('german');
    this._firebase = true;
    this._language = 'german';
    this._firebaseOptions = [
      {
        label: 'Local',
        value: false
      },
      {
        label: 'Firebase',
        value: true
      }
    ];
    this._languageOptions = [
      {
        label: 'German',
        value: 'german'
      },
      {
        label: 'Russian',
        value: 'russian'
      },
      {
        label: 'Italian',
        value: 'italian'
      },
      {
        label: 'Spanish',
        value: 'spanish'
      },
      {
        label: 'Japanese',
        value: 'japanese'
      },
      {
        label: 'Chinese',
        value: 'chinese'
      }
    ];
  }

  get firebase(): boolean {
    return this._firebase;
  }

  set firebase(firebase: boolean) {
    this._firebase = firebase;
  }

  get language(): string {
    return this._language;
  }

  set language(language: string) {
    this._language = language;
  }

  get firebaseOptions(): Array<Option> {
    return this._firebaseOptions;
  }

  get languageOptions(): Array<Option> {
    return this._languageOptions;
  }

  get language$(): Observable<string> {
    return this._language$;
  }

  setLanguage$(lang: string) {
    this._language$.next(lang);
  }

  public infoFirebase(): void {
    const message = 'Connected to ' + (this._firebase ? 'Firebase.' : 'Local.');
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
  }

  public infoLanguage(): void {
    const message = this._languageOptions.find((lang) => lang.value === this._language)?.label + ' selected.';
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
  }

}

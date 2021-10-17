import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
export interface Option {
  label: string;
  value: boolean | string;
  disabled: boolean;
}
export interface SettingForm {
  language: string;
  firebase: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _languageInit: string = 'german';
  private _firebaseInit: boolean = false;

  private _language$ = new Subject<string>();
  private _firebase$ = new Subject<boolean>();
  private _settingForm: SettingForm;
  private _firebaseOptions: Array<Option>;
  private _languageOptions: Array<Option>;

  constructor(
    private messageService: MessageService
  ) {
    this._settingForm = {
      language: this._languageInit,
      firebase: this._firebaseInit
    };
    this._firebaseOptions = [
      {
        label: 'Local',
        value: false,
        disabled: false
      },
      {
        label: 'Firebase',
        value: true,
        disabled: false
      }
    ];
    this._languageOptions = [
      {
        label: 'German',
        value: 'german',
        disabled: false
      },
      {
        label: 'Russian',
        value: 'russian',
        disabled: false
      },
      {
        label: 'Italian',
        value: 'italian',
        disabled: false
      },
      {
        label: 'Spanish',
        value: 'spanish',
        disabled: false
      },
      {
        label: 'French',
        value: 'french',
        disabled: false
      },
      {
        label: 'Japanese',
        value: 'japanese',
        disabled: false
      }
    ];
  }

  get firebaseInit(): boolean {
    return this._firebaseInit;
  }

  get languageInit(): string {
    return this._languageInit;
  }

  get settingForm(): SettingForm {
    return this._settingForm;
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

  public init$() {
    this._language$.next(this._languageInit);
    this._firebase$.next(this._firebaseInit);
  }

  public setLanguage$(language: string) {
    this._language$.next(language);
    this._settingForm.language = language;
    this.infoLanguage(language);
  }

  get firebase$(): Observable<boolean> {
    return this._firebase$;
  }

  public setFirebase$(firebase: boolean) {
    this._firebase$.next(firebase);
    this._settingForm.firebase = firebase;
    this.infoFirebase(firebase);
  }

  private infoFirebase(firebase: boolean): void {
    const message = 'Connected to ' + (firebase ? 'Firebase.' : 'Local.');
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
  }

  private infoLanguage(language: string): void {
    const message = this._languageOptions.find((lang) => lang.value === language)?.label + ' selected.';
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
  }

  public getLabel(): string | undefined {
    return this.languageOptions.find((option) =>
      option.value === this.settingForm.language
    )?.label;
  }

}

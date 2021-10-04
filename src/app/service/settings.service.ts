import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _firebase: boolean;

  constructor(
    private messageService: MessageService
  ) {
    this._firebase = true;
  }

  get firebase(): boolean {
    return this._firebase;
  }

  set firebase(firebase: boolean) {
    this._firebase = firebase;
  }

  public info(): void {
    const message = 'Connected to ' + (this._firebase ? 'Firebase.' : 'Local.');
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
  }

}

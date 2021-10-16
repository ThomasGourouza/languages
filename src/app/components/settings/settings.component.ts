import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService, Option } from 'src/app/service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public languageForm!: FormGroup;
  public connectionForm!: FormGroup;
  public firebaseOptions: Array<Option>;
  public languageOptions: Array<Option>;

  constructor(
    private settingsService: SettingsService
  ) {
    this.firebaseOptions = this.settingsService.firebaseOptions;
    this.languageOptions = this.settingsService.languageOptions;
  }

  ngOnInit(): void {
    this.initLanguageForm();
    this.initConnectionForm();
    this.disableLanguageOptions(this.connectionForm.controls['firebase'].value);
  }

  private initLanguageForm(): void {
    this.languageForm = new FormGroup({
      language: new FormControl(this.settingsService.settingForm.language, Validators.required)
    });
    this.languageForm.controls['language'].valueChanges.subscribe((language) => {
      this.settingsService.setLanguage$(language);
    });
  }

  private initConnectionForm(): void {
    this.connectionForm = new FormGroup({
      firebase: new FormControl(this.settingsService.settingForm.firebase, Validators.required)
    });
    this.connectionForm.controls['firebase'].valueChanges.subscribe((firebase) => {
      this.settingsService.setFirebase$(firebase);
      this.disableLanguageOptions(firebase);
    });
  }

  private disableLanguageOptions(firebase: boolean): void {
    if (!firebase) {
      this.settingsService.setLanguage$(this.settingsService.languageInit);
    }
    this.languageOptions.forEach((option) => {
      if (option.value !== this.settingsService.languageInit) {
        option.disabled = !firebase;
      }
    });
    this.initLanguageForm();
  }

}

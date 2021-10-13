import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService, Option } from 'src/app/service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public languageForm!: FormGroup;
  public settingsForm!: FormGroup;
  public firebaseOptions: Array<Option>;
  public languageOptions: Array<Option>;

  constructor(
    private settingsService: SettingsService
  ) {
    this.firebaseOptions = this.settingsService.firebaseOptions;
    this.languageOptions = this.settingsService.languageOptions;
  }

  ngOnInit(): void {
    this.initGameForm();
    this.initLanguageForm();
    this.settingsForm.controls['firebase'].valueChanges.subscribe((firebase) => {
      this.settingsService.firebase = firebase;
      this.settingsService.infoFirebase();
    });
    this.languageForm.controls['language'].valueChanges.subscribe((language) => {
      this.settingsService.language = language;
      this.settingsService.setLanguage$(language);
      this.settingsService.infoLanguage();
    });
  }

  private initLanguageForm(): void {
    this.languageForm = new FormGroup({
      language: new FormControl(this.settingsService.language, Validators.required)
    });
  }

  private initGameForm(): void {
    this.settingsForm = new FormGroup({
      firebase: new FormControl(this.settingsService.firebase, Validators.required)
    });
  }

}

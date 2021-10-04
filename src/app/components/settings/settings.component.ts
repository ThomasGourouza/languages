import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/service/settings.service';
export interface Option {
  label: string;
  value: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public settingsForm!: FormGroup;
  public options: Array<Option>;

  constructor(
    private settingsService: SettingsService
  ) {
    this.options = [
      {
        label: 'Local',
        value: false
      },
      {
        label: 'Firebase',
        value: true
      }
    ];
  }

  ngOnInit(): void {
    this.initGameForm();
    this.settingsForm.controls['firebase'].valueChanges.subscribe((firebase) => {
      this.settingsService.firebase = firebase;
      this.settingsService.info();
    });
  }

  private initGameForm(): void {
    this.settingsForm = new FormGroup({
      firebase: new FormControl(this.settingsService.firebase, Validators.required)
    });
  }

}

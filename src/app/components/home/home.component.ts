import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, Item } from 'src/app/service/common.service';
import { SettingsService } from 'src/app/service/settings.service';
export interface FormQueryParam {
  german?: string;
  translation?: string;
  categories?: string;
  ratings?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public formFilter!: FormGroup;
  public categories: Array<Item>;
  public ratings: Array<Item>;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private settingsService: SettingsService
  ) {
    this.initFormFilter();
    this.categories = this.commonService.categories;
    this.ratings = this.commonService.ratings;
  }

  public isFirebase(): boolean {
    return this.settingsService.settingForm.firebase;
  }

  private initFormFilter(): void {
    this.formFilter = new FormGroup({
      german: new FormControl(''),
      translation: new FormControl(''),
      categories: new FormControl([]),
      ratings: new FormControl([])
    });
  }

  public onSubmit(): void {
    const formValue = this.formFilter.value;
    const german = formValue.german;
    const translation = formValue.translation;
    const categories = formValue.categories;
    const ratings = formValue.ratings;
    let formQueryParam: FormQueryParam = {};
    if (!!german) {
      formQueryParam.german = german;
    }
    if (!!translation) {
      formQueryParam.translation = translation;
    }
    if (categories.length > 0) {
      formQueryParam.categories = categories.join(',');
    }
    if (ratings.length > 0) {
      formQueryParam.ratings = ratings.join(',');
    }
    this.router.navigate(['/dictionary'], { queryParams: formQueryParam });
  }

  public getLanguage(): string | undefined {
    return this.settingsService.getLabel();
  }

}

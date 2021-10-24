import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { ActivatedRoute } from '@angular/router';
import { AddWordService } from 'src/app/service/add-word.service';
import { CommonService, Item, Mode } from 'src/app/service/common.service';
import { ExcelService } from 'src/app/service/excel.service';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/service/settings.service';

export interface Filterform {
  german: string;
  translation: string;
  categories: Array<string>;
  ratings: Array<number>;
}

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit, OnDestroy {

  private wordSubscription: Subscription;
  private words!: Array<Word>;
  public wordsFiltered!: Array<Word>;
  public categories: Array<Item>;
  public ratings: Array<Item>;
  public filterForm!: FormGroup;
  public filterSelected: boolean;
  public modes: Array<Mode>;
  public mode: Mode;
  public firebase!: boolean;

  constructor(
    private dictionaryService: DictionaryService,
    private settingsService: SettingsService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private addWordService: AddWordService,
    private commonService: CommonService,
    private excelService: ExcelService
  ) {
    this.categories = this.commonService.categories;
    this.ratings = this.commonService.ratings;
    this.modes = this.commonService.modes;
    this.mode = this.commonService.mode;
    this.filterSelected = false;
    this.wordSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.addWordService.setWordDialog$(false);
    this.addWordService.setSubmitted$(false);
    this.route.queryParams.subscribe(params => {
      const german = params.german;
      const translation = params.translation;
      const categories = params.categories;
      const ratings = params.ratings;
      this.filterSelected = !!german || !!translation || !!categories || !!ratings;
      this.initFilterform(german, translation, categories, ratings);
    });
    this.loadWords();
    this.filterForm.valueChanges.subscribe((form: Filterform) => {
      this.dictionaryService.filterform = {
        german: form.german,
        translation: form.translation,
        categories: form.categories,
        ratings: form.ratings
      };
      this.onFilter(form.german, form.translation, form.categories, form.ratings);
    });
  }

  private loadWords(): void {
    this.wordSubscription = this.dictionaryService.words.subscribe((words) => {
      this.firebase = this.settingsService.settingForm.firebase;
      this.words = this.dictionaryService.manageWord(words, this.firebase ? this.mode.activated : true);
      this.filterFromForm();
    });
  }

  public onModeChange(): void {
    this.commonService.mode = this.mode;
    this.loadWords();
  }

  ngOnDestroy(): void {
    this.wordSubscription.unsubscribe();
  }

  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.wordsFiltered, 'dictionary');
  }

  private initFilterform(german: string, translation: string, categories: string, ratings: string): void {
    const categoryList = !!categories ? categories.split(',') : [];
    const ratingList = !!ratings ? ratings.split(',').map((r) => +r) : [];
    if (this.filterSelected) {
      this.dictionaryService.filterform = {
        german: !!german ? german : '',
        translation: !!translation ? translation : '',
        categories: categoryList,
        ratings: ratingList
      };
    } else if (this.dictionaryService.isFilterNotEmpty()) {
      this.filterSelected = true;
    }
    this.filterForm = new FormGroup({
      german: new FormControl(this.dictionaryService.filterform.german),
      translation: new FormControl(this.dictionaryService.filterform.translation),
      categories: new FormControl(this.dictionaryService.filterform.categories),
      ratings: new FormControl(this.dictionaryService.filterform.ratings)
    });
  }

  private onFilter(german: string, translation: string, categories: Array<string>, ratings: Array<number>): void {
    this.wordsFiltered = this.words.filter((word) => {
      const germanFilter = (!!german) ? this.removeBrackets(word.german).toLowerCase().includes(german.toLowerCase()) : true;
      const translationFilter = (!!translation) ? this.removeBrackets(word.translation).toLowerCase().includes(translation.toLowerCase()) : true;
      const categoriesFilter = (categories.length > 0) ? categories.includes(word.category) : true;
      const ratingsFilter = (ratings.length > 0) ? (word.rating != undefined && ratings.includes(word.rating)) : true;
      return germanFilter && translationFilter && categoriesFilter && ratingsFilter;
    });
  }

  private removeBrackets(text: string): string {
    return text.replace('(', '').replace(')', '');
  }

  public openNew(): void {
    this.addWordService.initWord$();
    this.addWordService.setSubmitted$(false);
    this.addWordService.setWordDialog$(true);
  }

  public deleteWord(word: Word): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + word.german + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const wordId = word.id;
        if (!!wordId) {
          this.dictionaryService.deleteWord(wordId, word.german);
        }
      }
    });
  }

  public deactivateWord(word: Word): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to deactivate ' + word.german + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const wordId = word.id;
        if (!!wordId) {
          this.dictionaryService.deactivateWord(wordId, word.german, word.rating);
        }
      }
    });
  }

  public activateWord(word: Word): void {
    const wordId = word.id;
    if (!!wordId) {
      this.dictionaryService.activateWord(wordId, word.german);
    }
  }

  public updateWord(word: Word): void {
    this.addWordService.setWord$({ ...word });
    this.addWordService.setWordDialog$(true);
  }

  public resetFilter(): void {
    this.initFilterform('', '', '', '');
    this.onFilter('', '', [], []);
    this.filterForm.valueChanges.subscribe((form: Filterform) => {
      this.onFilter(form.german, form.translation, form.categories, form.ratings);
    });
  }

  private filterFromForm(): void {
    const german = this.filterForm.get('german')?.value;
    const translation = this.filterForm.get('translation')?.value;
    const categories = this.filterForm.get('categories')?.value;
    const ratings = this.filterForm.get('ratings')?.value;
    this.onFilter(german, translation, categories, ratings);
  }

  public getLabel(): string | undefined {
    return this.settingsService.getLabel();
  }

}

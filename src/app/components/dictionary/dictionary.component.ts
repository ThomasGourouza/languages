import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { ActivatedRoute } from '@angular/router';
import { AddWordService } from 'src/app/service/add-word.service';
import { CommonService, Item, Mode } from 'src/app/service/common.service';
import { ExcelService } from 'src/app/service/excel.service';
import { SettingsService } from 'src/app/service/settings.service';
import { Subscription } from 'rxjs';

export interface FormFilter {
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

  private firebaseSubscription: Subscription;
  private localSubscription: Subscription;
  private words!: Array<Word>;
  public wordsFiltered!: Array<Word>;
  public categories: Array<Item>;
  public ratings: Array<Item>;
  public formFilter!: FormGroup;
  public filterSelected: boolean;
  public modes: Array<Mode>;
  public mode: Mode;
  public activated: boolean;

  constructor(
    private dictionaryService: DictionaryService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private addWordService: AddWordService,
    private commonService: CommonService,
    private excelService: ExcelService,
    private settingsService: SettingsService
  ) {
    this.categories = this.commonService.categories;
    this.ratings = this.commonService.ratings;
    this.modes = this.commonService.modes;
    this.mode = this.modes[0];
    this.activated = true;
    this.filterSelected = false;
    this.firebaseSubscription = new Subscription();
    this.localSubscription = new Subscription();
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
      this.initFormFilter(german, translation, categories, ratings);
    });
    this.commonService.activated$.subscribe((activated) => {
      this.activated = activated;
      this.connection();
    });
    this.connection();
    this.formFilter.valueChanges.subscribe((form: FormFilter) => {
      this.onFilter(form.german, form.translation, form.categories, form.ratings);
    });
  }

  public onModeChange(): void {
    this.commonService.setModeActive$(this.mode.activated);
  }

  ngOnDestroy(): void {
    this.localSubscription.unsubscribe();
    this.firebaseSubscription.unsubscribe();
  }

  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.wordsFiltered, 'dictionary');
  }

  private initFormFilter(german: string, translation: string, categories: string, ratings: string): void {
    const categoryList = !!categories ? categories.split(',') : [];
    const ratingList = !!ratings ? ratings.split(',').map((r) => +r) : [];
    this.formFilter = new FormGroup({
      german: new FormControl(!!german ? german : ''),
      translation: new FormControl(!!translation ? translation : ''),
      categories: new FormControl(categoryList),
      ratings: new FormControl(ratingList)
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
          this.dictionaryService.deactivateWord(wordId, word.german);
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
    this.initFormFilter('', '', '', '');
    this.onFilter('', '', [], []);
    this.formFilter.valueChanges.subscribe((form: FormFilter) => {
      this.onFilter(form.german, form.translation, form.categories, form.ratings);
    });
  }

  private connection(): void {
    if (this.settingsService.firebase) {
      this.localSubscription.unsubscribe();
      this.firebaseSubscription = this.dictionaryService.words.subscribe((words) => {
        this.initWords(words);
      });
    } else {
      this.firebaseSubscription.unsubscribe();
      this.localSubscription = this.dictionaryService.localWords.subscribe((localWords) => {
        this.initWords(localWords);
      });
    }
  }

  private initWords(words: Array<Word>): void {
    this.words = this.dictionaryService.manageWord(words, this.activated);
    this.filterFromForm();
  }

  private filterFromForm(): void {
    const german = this.formFilter.get('german')?.value;
    const translation = this.formFilter.get('translation')?.value;
    const categories = this.formFilter.get('categories')?.value;
    const ratings = this.formFilter.get('ratings')?.value;
    this.onFilter(german, translation, categories, ratings);
  }

}

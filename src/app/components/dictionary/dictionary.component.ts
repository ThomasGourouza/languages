import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { ActivatedRoute } from '@angular/router';
import { AddWordService } from 'src/app/service/add-word.service';
import { CommonService, Item } from 'src/app/service/common.service';
import { ExcelService } from 'src/app/service/excel.service';

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
export class DictionaryComponent implements OnInit {

  private words!: Array<Word>;
  public wordsFiltered!: Array<Word>;
  public categories: Array<Item>;
  public ratings: Array<Item>;
  public formFilter!: FormGroup;
  public selectedWords!: Array<Word> | null;

  constructor(
    private dictionaryService: DictionaryService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private addWordService: AddWordService,
    private commonService: CommonService,
    private excelService: ExcelService
  ) {
    this.categories = this.commonService.categories;
    this.ratings = this.commonService.ratings;
  }

  ngOnInit() {
    this.addWordService.setWordDialog$(false);
    this.addWordService.setSubmitted$(false);
    this.route.queryParams.subscribe(params => {
      const german = params.german;
      const translation = params.translation;
      const categories = params.categories;
      const ratings = params.ratings;
      this.initFormFilter(german, translation, categories, ratings);
    });
    this.dictionaryService.words.subscribe((words) => {
      this.words = words;
      this.words.forEach((word) => {
        word.rating = (word.numberOfViews > 0) ?
          Math.round(5 * (word.numberOfSuccess / word.numberOfViews)) : 0;
      });
      const german = this.formFilter.get('german')?.value;
      const translation = this.formFilter.get('translation')?.value;
      const categories = this.formFilter.get('categories')?.value;
      const ratings = this.formFilter.get('ratings')?.value;
      this.onFilter(german, translation, categories, ratings);
    });
    this.formFilter.valueChanges.subscribe((form: FormFilter) => {
      this.onFilter(form.german, form.translation, form.categories, form.ratings);
    });
  }

  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.wordsFiltered, 'export-to-excel');
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
      const germanFilter = (!!german) ? word.german.includes(german) : true;
      const translationFilter = (!!translation) ? word.french.includes(translation) : true;
      const categoriesFilter = (categories.length > 0) ? categories.includes(word.category) : true;
      const ratingsFilter = (ratings.length > 0) ? (word.rating != undefined && ratings.includes(word.rating)) : true;
      return germanFilter && translationFilter && categoriesFilter && ratingsFilter;
    });
  }

  public openNew(): void {
    this.addWordService.initWord$();
    this.addWordService.setSubmitted$(false);
    this.addWordService.setWordDialog$(true);
  }

  public deleteSelectedWords(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected words?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!!this.selectedWords) {
          const wordIds = this.selectedWords.map((word) => word.id)
          this.dictionaryService.deleteWords(wordIds);
          this.selectedWords = null;
        }
      }
    });
  }

  public deleteWord(word: Word): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + word.german + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const wordId = word.id;
        if (!!wordId) {
          this.dictionaryService.deleteWord(wordId);
        }
      }
    });
  }

  public updateWord(word: Word): void {
    this.addWordService.setWord$({ ...word });
    this.addWordService.setWordDialog$(true);
  }

}

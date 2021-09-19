import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { ActivatedRoute } from '@angular/router';
import { WordUpdate } from 'src/app/models/word-update';
// export interface FormQueryParam {
//   german?: string;
//   translation?: string;
//   categories?: string;
//   ratings?: string;
// }
export interface FormFilter {
  german: string;
  translation: string;
  categories: Array<string>;
  ratings: Array<number>;
}
export interface Item {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  private words!: Array<Word>;
  public wordsFiltered!: Array<Word>;

  public categories: Array<Item>
  public ratings: Array<Item>

  public formFilter!: FormGroup;

  public wordDialog!: boolean;

  public word!: Word;
  public selectedWords!: Array<Word> | null;
  public submitted!: boolean;

  constructor(
    private dictionaryService: DictionaryService,
    private confirmationService: ConfirmationService,
    // private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories = [
      { label: 'Verb', value: 'verb' },
      { label: 'Adjective', value: 'adjective' },
      { label: 'Noun', value: 'noun' },
      { label: 'Phrase', value: 'phrase' }
    ];
    this.ratings = [
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];
  }

  ngOnInit() {
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
      // let formQueryParam: FormQueryParam = {};
      // if (!!form.german) {
      //   formQueryParam.german = form.german;
      // }
      // if (!!form.translation) {
      //   formQueryParam.translation = form.translation;
      // }
      // if (form.categories.length > 0) {
      //   formQueryParam.categories = form.categories.join(',');
      // }
      // if (form.ratings.length > 0) {
      //   formQueryParam.ratings = form.ratings.join(',');
      // }
      // this.router.navigate(['/dictionary'], { queryParams: formQueryParam });
    });
  }

  private initWord(): void {
    this.word = {
      category: '',
      german: '',
      french: '',
      english: '',
      numberOfViews: 0,
      numberOfSuccess: 0
    };
  }

  private initFormFilter(german: string, translation: string, categories: string, ratings: string): void {
    const categoryList = !!categories ? categories.split(',').map((r) => +r) : [];
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

  public openNew() {
    this.initWord();
    this.submitted = false;
    this.wordDialog = true;
  }

  public deleteSelectedWords() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected words?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'btn btn-success',
      accept: () => {
        if (!!this.selectedWords) {
          const wordIds = this.selectedWords.map((word) => word.id)
          this.dictionaryService.deleteWords(wordIds);
          this.selectedWords = null;
        }
      }
    });
  }

  public deleteWord(word: Word) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + word.german + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const wordId = word.id;
        if (!!wordId) {
          this.dictionaryService.deleteWord(wordId);
          this.initWord();
        }
      }
    });
  }

  public hideDialog() {
    this.wordDialog = false;
    this.submitted = false;
  }

  public updateWord(word: Word) {
    this.word = { ...word };
    this.wordDialog = true;
  }

  public saveWord() {
    this.submitted = true;
    const word: WordUpdate = {
      category: this.word.category,
      german: this.word.german,
      french: this.word.french,
      english: this.word.english,
      numberOfViews: this.word.numberOfViews,
      numberOfSuccess: this.word.numberOfSuccess
    }
    if (!!this.word.id) {
      this.dictionaryService.update(this.word.id, word);
    }
    else {
      this.dictionaryService.addWord(word);
    }
    this.wordDialog = false;
    this.initWord();
  }

}

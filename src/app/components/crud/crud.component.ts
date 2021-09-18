import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';
export interface FormFilter {
  category: string;
  ratingFrom: string;
  ratingTo: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  wordDialog!: boolean;

  words!: Word[];
  wordsFiltered!: Word[];

  public categorySearch: string;
  public ratingSearch: string;
  public formFilter!: FormGroup;

  word!: Word;
  selectedWord!: Word[] | null;
  submitted!: boolean;
  categories!: any[];

  constructor(
    private dictionaryService: DictionaryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.categorySearch = '';
    this.ratingSearch = '';
  }

  ngOnInit() {
    this.initFormFilter();
    this.dictionaryService.words.subscribe((words) => {
      this.words = words;
      this.words.forEach((word) => {
        word.rating = (word.numberOfViews > 0) ?
          Math.round(5 * (word.numberOfSuccess / word.numberOfViews)) : 0;
      });
      const category = this.formFilter.get('category')?.value;
      const ratingFrom = this.formFilter.get('ratingFrom')?.value;
      const ratingTo = this.formFilter.get('ratingTo')?.value;
      this.onFilter(category, ratingFrom, ratingTo);
    });
    this.formFilter.valueChanges.subscribe((form: FormFilter) => {
      this.onFilter(form.category, form.ratingFrom, form.ratingTo);
    });

    this.categories = [
      { label: 'Verb', value: 'verb' },
      { label: 'Adjective', value: 'adjective' },
      { label: 'Noun', value: 'noun' },
      { label: 'Phrase', value: 'phrase' }
    ];
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

  // TODO: add query parms from url
  private initFormFilter(): void {
    this.formFilter = new FormGroup({
      category: new FormControl(''),
      ratingFrom: new FormControl(''),
      ratingTo: new FormControl('')
    });
  }

  private onFilter(category: string, ratingFrom: string, ratingTo: string): void {
    this.wordsFiltered = this.words.filter((word) => {
      const categoryFilter = (!!category) ? word.category.includes(category) : true;
      const ratingFromFilter = (!!ratingFrom) ? (word.rating != undefined && word.rating >= +ratingFrom) : true;
      const ratingToFilter = (!!ratingTo) ? (word.rating != undefined && word.rating <= +ratingTo) : true;
      return categoryFilter && ratingFromFilter && ratingToFilter;
    });
  }

  public getMaxForFilterRatingFrom(): number {
    const ratingTo = this.formFilter.get('ratingTo')?.value
    return (ratingTo !== '') ? ratingTo : 5;
  }

  public getMinForFilterRatingTo(): number {
    const ratingFrom = this.formFilter.get('ratingFrom')?.value
    return (ratingFrom !== '') ? ratingFrom : 0;
  }

  openNew() {
    this.initWord();
    this.submitted = false;
    this.wordDialog = true;
  }

  deleteSelectedWords() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected words?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.words = this.words.filter(val => !this.selectedWord?.includes(val));
        this.selectedWord = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Words Deleted', life: 3000 });
      }
    });
  }

  editWord(word: Word) {
    this.word = { ...word };
    this.wordDialog = true;
  }

  deleteWord(word: Word) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + word.german + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.words = this.words.filter(val => val.id !== word.id);
        this.initWord();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.wordDialog = false;
    this.submitted = false;
  }

  saveWord() {
    this.submitted = true;

    if (this.word.german.trim()) {
      if (this.word.id) {
        this.words[this.findIndexById(this.word.id)] = this.word;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word Updated', life: 3000 });
      }
      else {
        this.words.push(this.word);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word Created', life: 3000 });
      }

      this.words = [...this.words];
      this.wordDialog = false;
      this.initWord();
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}

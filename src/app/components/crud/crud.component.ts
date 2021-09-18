import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  wordDialog!: boolean;

  words!: Word[];

  word!: Word;
  selectedWord!: Word[] | null;
  submitted!: boolean;
  categories!: any[];

  constructor(
    private dictionaryService: DictionaryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.dictionaryService.words.subscribe((words) => {
      this.words = words;
      this.words.forEach((word) => {
        word.rating = (word.numberOfViews !== 0) ? 
          Math.round(5 * (word.numberOfSuccess/word.numberOfViews)) : 0;
      });
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
      expression: '',
      translation: '',
      numberOfViews: 0,
      numberOfSuccess: 0
    };
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
      message: 'Are you sure you want to delete ' + word.expression + '?',
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

    if (this.word.expression.trim()) {
      if (this.word.id) {
        this.words[this.findIndexById(this.word.id)] = this.word;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Word Updated', life: 3000 });
      }
      else {
        this.word.id = this.createId();
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

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}

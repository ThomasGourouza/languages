import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word';
import { WordUpdate } from 'src/app/models/word-update';
import { AddWordService } from 'src/app/service/add-word.service';
import { CommonService, Item } from 'src/app/service/common.service';
import { DictionaryService } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html'
})
export class AddWordComponent implements OnInit {

  public wordDialog!: boolean;
  public submitted!: boolean;
  public word!: Word;
  public categories: Array<Item>;

  constructor(
    private addWordService: AddWordService,
    private dictionaryService: DictionaryService,
    private commonService: CommonService
  ) { 
    this.categories = this.commonService.categories;
  }

  ngOnInit(): void {
    this.addWordService.wordDialog$.subscribe((wordDialog) => {
      this.wordDialog = wordDialog;
    });
    this.addWordService.word$.subscribe((word) => {
      this.word = word;     
    });
    this.addWordService.submitted$.subscribe((submitted) => {
      this.submitted = submitted;
    });
  }

  public hideDialog() {
    this.addWordService.setWordDialog$(false);
    this.addWordService.setSubmitted$(false);
  }

  public saveWord() {
    this.addWordService.setSubmitted$(true);
    const word: WordUpdate = {
      category: this.word.category,
      german: this.word.german,
      translation: this.word.translation,
      numberOfViews: this.word.numberOfViews,
      numberOfSuccess: this.word.numberOfSuccess
    }
    if (!!this.word.id) {
      this.dictionaryService.update(this.word.id, word);
    }
    else {
      this.dictionaryService.addWord(word);
    }
    this.addWordService.setWordDialog$(false);
    this.addWordService.initWord$();
  }

}

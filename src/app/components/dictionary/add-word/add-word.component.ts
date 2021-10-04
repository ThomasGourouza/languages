import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Word } from 'src/app/models/word';
import { WordUpdate } from 'src/app/models/word-update';
import { AddWordService } from 'src/app/service/add-word.service';
import { CommonService, Item } from 'src/app/service/common.service';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html'
})
export class AddWordComponent implements OnInit {

  private firebaseSubscription: Subscription;
  private localSubscription: Subscription;
  public wordDialog!: boolean;
  public submitted!: boolean;
  public word!: Word;
  private words!: Array<Word>;
  public categories: Array<Item>;

  constructor(
    private addWordService: AddWordService,
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private settingsService: SettingsService
  ) {
    this.categories = this.commonService.categories;
    this.firebaseSubscription = new Subscription();
    this.localSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.connection();
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
    const newWord: WordUpdate = {
      category: this.word.category,
      german: this.word.german,
      translation: this.word.translation,
      numberOfViews: this.word.numberOfViews,
      numberOfSuccess: this.word.numberOfSuccess,
      isActive: this.word.isActive,
      deactivationDate: this.word.deactivationDate
    }
    if (!!this.word.id) {
      this.dictionaryService.update(this.word.id, newWord);
    } else {
      const wordExists = this.words.map((word) => word.german).includes(this.word.german);
      this.dictionaryService.addWord(newWord, wordExists);
    }
    this.addWordService.setWordDialog$(false);
    this.addWordService.initWord$();
  }

  private connection(): void {
    if (this.settingsService.firebase) {
      this.localSubscription.unsubscribe();
      this.firebaseSubscription = this.dictionaryService.words.subscribe((words) => {
        this.words = words;
      });
    } else {
      this.firebaseSubscription.unsubscribe();
      this.localSubscription = this.dictionaryService.localWords.subscribe((localWords) => {
        this.words = localWords;
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Word } from 'src/app/models/word';
import { CommonService, Item } from 'src/app/service/common.service';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { GameService } from 'src/app/service/game.service';
export interface Answer {
  german: string;
  translation: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public gameForm!: FormGroup;
  public isCorrect: boolean;
  public submited: boolean;
  public randomWord!: Word;
  public randomWordsMemory!: Array<Word>;
  private words!: Array<Word>;
  public dictionaryCategoryLimited: Array<Word>;
  public settingsForm!: FormGroup;
  public start!: boolean;
  public points: number;
  public total: number;
  public revisionSelected: boolean;
  public revision: boolean;
  private categoriesSelected!: Array<string>;
  private numberOfWords!: number;
  public categories!: Array<Item>;
  public numbersOfWords!: Array<number>;

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private gameService: GameService
  ) {
    this.randomWordsMemory = [];
    this.revisionSelected = false;
    this.revision = false;
    this.isCorrect = false;
    this.submited = false;
    this.points = 0;
    this.total = 0;
    this.dictionaryCategoryLimited = [];
  }

  public ngOnInit(): void {
    this.categories = this.commonService.categories;
    this.numbersOfWords = this.commonService.numbersOfWords;
    this.initSettingsForm();
    this.initGameForm();
    this.dictionaryService.words.subscribe((words) => {
      this.words = words;
    });
    this.gameService.setStart$(false);
    this.gameService.start$.subscribe((start) => {
      this.start = start;
    });
  }

  private initGameForm(): void {
    this.gameForm = new FormGroup({
      german: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    });
  }

  private initSettingsForm(): void {
    const initCategoriesSetting = this.categories.map((category) => category.value)
    this.settingsForm = new FormGroup({
      categories: new FormControl(initCategoriesSetting, Validators.required),
      numberOfWords: new FormControl(20, Validators.required),
      revision: new FormControl(true)
    });
  }

  public onSettingsSubmit(): void {
    const categoriesControl = this.settingsForm.get('categories');
    const numberOfWordsControl = this.settingsForm.get('numberOfWords');
    const revisionControl = this.settingsForm.get('revision');
    this.categoriesSelected = categoriesControl?.value;
    this.numberOfWords = +numberOfWordsControl?.value;
    if (this.categoriesSelected.length > 0 && this.numberOfWords > 0) {
      categoriesControl?.disable();
      numberOfWordsControl?.disable();
      revisionControl?.disable();
      this.gameService.setStart$(true);
      this.revisionSelected = revisionControl?.value;
      this.revision = this.revisionSelected;
      this.initGame(this.categoriesSelected, this.numberOfWords);
    }
  }

  private initGame(categories: Array<string>, limit: number): void {
    const dictionaryCategory = this.words.filter((word) => categories.includes(word.category));
    if (!!dictionaryCategory && dictionaryCategory.length >= limit) {
      this.dictionaryCategoryLimited = [];
      this.buildDictionaryCategoryLimited(dictionaryCategory, limit);
      this.runGame();
    } else {
      console.log('the limit is too high!');
    }
  }

  public onGameSubmit(): void {
    this.submited = true;
    this.isCorrect = false;
    const translation = this.gameForm.value.translation;
    if (this.randomWord.translation === translation) {
      this.points++;
      this.isCorrect = true;
    }
    this.total++;
  }

  public onContinue(): void {
    this.submited = false;
    this.revision = this.revisionSelected;
    this.initGame(this.categoriesSelected, this.numberOfWords);
    this.gameForm.controls['translation'].setValue('');
  }

  public onReady(): void {
    this.revision = false;
  }

  public onStop(): void {
    this.gameService.setStart$(false);
    this.initGameForm();
    this.points = 0;
    this.total = 0;
    this.randomWordsMemory = [];
    this.settingsForm.get('categories')?.enable();
    this.settingsForm.get('numberOfWords')?.enable();
    this.settingsForm.get('revision')?.enable();
  }

  // Technical:

  private buildDictionaryCategoryLimited(dictionaryCategory: Array<Word>, limit: number): void {
    while (this.dictionaryCategoryLimited.length < limit) {
      const randomIndex = this.gameService.getRandomInt(dictionaryCategory.length);
      const randomWord = dictionaryCategory[randomIndex];
      if (
        this.dictionaryCategoryLimited.length === limit - 1
        && this.randomWordsMemory.length >= limit
        && this.gameService.isArrayIncluded(this.dictionaryCategoryLimited, this.randomWordsMemory)
      ) {
        const newWord = dictionaryCategory.find((word) =>
          !this.gameService.isWordIncluded(word, this.randomWordsMemory)
        );
        if (!!newWord) {
          this.dictionaryCategoryLimited.push(newWord);
        } else {
          // TODO
          console.log('The game is over -> ask to replay');
          this.onStop();
          break;
        }
      } else if (!this.gameService.isWordIncluded(randomWord, this.dictionaryCategoryLimited)) {
        this.dictionaryCategoryLimited.push(randomWord);
      }
    }
  }

  private runGame(): void {
    do {
      const index = this.gameService.getRandomInt(this.dictionaryCategoryLimited.length);
      this.randomWord = this.dictionaryCategoryLimited[index];
    } while (this.gameService.isWordIncluded(this.randomWord, this.randomWordsMemory));
    this.randomWordsMemory.push(this.randomWord);
    // TODO: german -> french or french -> german
    this.gameForm.controls['german'].setValue(this.randomWord.german);
  }

}

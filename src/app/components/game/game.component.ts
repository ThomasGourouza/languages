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

  public randomItem!: Word;
  public randomWords!: Array<Word>;
  private words!: Array<Word>;
  private dictionaryCategoryLimited: Array<Word>;
  public settingsForm!: FormGroup;
  public start!: boolean;
  public points: number;
  public total: number;
  public revision: boolean;
  // public category!: string;
  // public numberOfWords!: number;
  public categories!: Array<Item>;
  public numbersOfWords!: Array<number>;

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private gameService: GameService
  ) {
    this.randomWords = [];
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

    const categories: Array<string> = categoriesControl?.value;
    const numberOfWords: number = +numberOfWordsControl?.value;

    if (categories.length > 0 && numberOfWords > 0) {
      categoriesControl?.disable();
      numberOfWordsControl?.disable();
      revisionControl?.disable();

      this.gameService.setStart$(true);
      this.revision = revisionControl?.value;

      this.initGame(categories, numberOfWords);
    }
  }

  private initGame(categories: Array<string>, limit: number): void {
    const dictionaryCategory = this.words.filter((word) => categories.includes(word.category));
    if (!!dictionaryCategory && dictionaryCategory.length >= limit) {
      this.dictionaryCategoryLimited = [];
      while (this.dictionaryCategoryLimited.length < limit) {
        const randomIndex = this.getRandomInt(dictionaryCategory.length);
        const randomWord = dictionaryCategory[randomIndex];
        if (!this.dictionaryCategoryLimited.map((word) => word.german).includes(randomWord.german)) {
          this.dictionaryCategoryLimited.push(randomWord);
        }
      }
      this.runGame();
    } else {
      console.log('the limit is too high!');
    }
  }

  public runGame(): void {
    this.submited = false;
    const index = this.getRandomInt(this.dictionaryCategoryLimited.length);
    this.randomItem = this.dictionaryCategoryLimited[index];

    // TODO: german -> french or french -> german
    this.gameForm.controls['german'].setValue(this.randomItem.german);
  }

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public onGameSubmit(): void {
    this.submited = true;
    this.isCorrect = false;
    const translation = this.gameForm.value.translation;
    if (this.randomItem.translation === translation) {
      this.points++;
      this.isCorrect = true;
    }
    this.total++;
    // this.runGame();
  }

  public onStop(): void {
    this.gameService.setStart$(false);
    this.initGameForm();
    this.points = 0;
    this.total = 0;

    this.settingsForm.get('categories')?.enable();
    this.settingsForm.get('numberOfWords')?.enable();
    this.settingsForm.get('revision')?.enable();
  }

  public getTranslations(): Array<string> {
    return this.dictionaryCategoryLimited.map((word) => word.translation);
  }
}

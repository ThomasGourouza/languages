import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { ScoreService } from 'src/app/service/score.service';
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

  public dictionary!: Array<Word>;
  public category!: string;
  public randomItem!: Word;
  public gameForm!: FormGroup;
  public randomTranslations!: Array<string>;
  public answer!: Answer | undefined;
  public isCorrect!: boolean;
  public memory: Array<string>;
  public categories: Array<string>;

  constructor(
    private dictionaryService: DictionaryService,
    private scoreService: ScoreService
  ) {
    this.categories = [];
    this.randomTranslations = [];
    this.memory = [];
  }

  public ngOnInit(): void {
    this.initForm();
    this.dictionaryService.words.subscribe((words) => {
      this.dictionary = words;
      this.dictionary.forEach((word) => {
        if (!this.categories.includes(word.category)) {
          this.categories.push(word.category);
        }
      });
    });
  }

  private initGame(category: string): void {
    const dictionnaryCategory = this.dictionary.filter((word) => word.category === category);
    if (!!dictionnaryCategory) {
      if (this.memory.length === dictionnaryCategory.length) {
        this.memory = [];
      }
      do {
        const randomCategoryIndex = this.getRandomInt(dictionnaryCategory.length);
        this.randomItem = dictionnaryCategory[randomCategoryIndex];
      } while (this.memory.includes(this.randomItem.german));
      this.memory.push(this.randomItem.german);
      this.setRandomTranslations(this.randomItem.translation, category);
      this.gameForm.controls['german'].setValue(this.randomItem.german);
    }
  }

  private initForm(): void {
    this.gameForm = new FormGroup({
      german: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    });
  }

  public selectCategory(category: string): void {
    this.memory = [];
    this.scoreService.points = 0;
    this.scoreService.total = 0;
    this.answer = undefined;
    this.category = category;
    this.initGame(this.category);
  }

  public onSubmit(): void {
    this.isCorrect = false;
    const formValue = this.gameForm.value;
    this.answer = {
      german: formValue['german'],
      translation: this.randomItem.translation
    }
    const translation = formValue['translation'];
    if (this.randomItem.translation === translation && !!this.category) {
      this.scoreService.points++;
      this.isCorrect = true;
    }
    this.scoreService.total++;
    this.initGame(this.category);
  }

  private setRandomTranslations(translation: string, category: string): void {
    const dictionaryCategory = this.dictionary.filter((word) => word.category === category);
    if (!!dictionaryCategory) {
      const randomTranslations: Array<string> = [];
      const otherTranslations = dictionaryCategory.filter((t) => t.translation != translation);

      let index = 0;
      const limit = (dictionaryCategory.length < 10) ? dictionaryCategory.length : 10;
      const rightAnswerIndex = this.getRandomInt(limit);

      while (index < limit) {
        if (index === rightAnswerIndex) {
          randomTranslations.push(translation);
        } else {
          let randomTranslation: string;
          do {
            const randomIndex = this.getRandomInt(otherTranslations.length);
            randomTranslation = otherTranslations[randomIndex].translation;
          } while (randomTranslations.includes(randomTranslation));
          randomTranslations.push(randomTranslation);
        }
        index++;
      }
      this.randomTranslations = randomTranslations;
    }
  }

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}

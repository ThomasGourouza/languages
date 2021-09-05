import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, DictionaryService, Category } from 'src/app/service/dictionary.service';
import { ScoreService } from 'src/app/service/score.service';
export interface Answer {
  expression: string;
  translation: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public dictionary: Array<Category>;
  public category!: string;
  public randomItem!: Item;
  public gameForm!: FormGroup;
  public randomTranslations!: Array<string>;
  public categories: Array<string>;
  public answer!: Answer | undefined;
  public isCorrect!: boolean;
  public memory: Array<string>;

  constructor(
    private dictionaryService: DictionaryService,
    private scoreService: ScoreService,
    private formBuilder: FormBuilder
  ) {
    const verbs = this.dictionaryService.verbsCategoryName;
    const nouns = this.dictionaryService.nounsCategoryName;
    const adjectives = this.dictionaryService.adjectivesCategoryName;
    const expressions = this.dictionaryService.expressionsCategoryName;
    this.categories = [verbs, nouns, adjectives, expressions];
    this.dictionary = this.dictionaryService.dictionary;
    this.randomTranslations = [];
    this.memory = [];
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initGame(category: string): void {
    const dictionnaryCategory = this.dictionary.find((cat) => cat.name === category);
    if (!!dictionnaryCategory) {
      if (this.memory.length === dictionnaryCategory.content.length) {
        this.memory = [];
      }
      do {
        const randomCategoryIndex = this.getRandomInt(dictionnaryCategory.content.length);
        this.randomItem = dictionnaryCategory.content[randomCategoryIndex];
      } while (this.memory.includes(this.randomItem.expression));
      this.memory.push(this.randomItem.expression);
      this.setRandomTranslations(this.randomItem.translation, category);
      this.gameForm.controls['expression'].setValue(this.randomItem.expression);
    }
  }

  private initForm(): void {
    this.gameForm = this.formBuilder.group(
      {
        expression: ['', Validators.required],
        translation: ['', Validators.required]
      }
    );
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
      expression: formValue['expression'],
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
    const dictionaryCategory = this.dictionary.find((cat) => cat.name === category);
    if (!!dictionaryCategory) {
      const randomTranslations: Array<string> = [];
      const otherTranslations = dictionaryCategory.content.filter((t) => t.translation != translation);

      let index = 0;
      const limit = (dictionaryCategory.content.length < 10) ? dictionaryCategory.content.length : 10;
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

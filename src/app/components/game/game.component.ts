import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, DictionaryService, Category } from 'src/app/service/dictionary.service';
import { ScoreService } from 'src/app/service/score.service';

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
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initGame(category: string): void {
    const randomCategoryIndex = this.getRandomInt(this.dictionary.length);
    const dictionnaryCategory = this.dictionary.find((cat) => cat.name === category);
    if (!!dictionnaryCategory) {
      this.randomItem = dictionnaryCategory.content[randomCategoryIndex];
      this.setRandomTranslations(this.randomItem, category);
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

  public test(event: any): void {
    console.log(event);
  }

  public selectCategory(category: string): void {
    this.category = category;
    this.initGame(this.category);
  }

  public onSubmit(): void {
    const formValue = this.gameForm.value;
    const translation = formValue['translation'];
    if (this.randomItem.translation === translation && !!this.category) {
      this.scoreService.points++;
      this.initGame(this.category);
    }
    this.scoreService.total++;
  }

  private setRandomTranslations(randomItem: Item, category: string): void {
    const dictionaryCategory = this.dictionary.find((cat) => cat.name === category);
    if (!!dictionaryCategory) {
      const randomTranslations: Array<string> = [];
      let index = 0;
      const rightAnswerIndex = this.getRandomInt(10);
      const usedIndexList: Array<number> = [];
      while (index < 10) {
        const randomIndex = this.getRandomInt(dictionaryCategory.content.length);
        if (!usedIndexList.includes(randomIndex)) {
          usedIndexList.push(randomIndex);
          if (usedIndexList.length === rightAnswerIndex + 1) {
            randomTranslations.push(randomItem.translation);
          } else {
            randomTranslations.push(dictionaryCategory.content[randomIndex].translation);
          }
          index++;
        }
      }
      this.randomTranslations = randomTranslations;
    }
  }

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}

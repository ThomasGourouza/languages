import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, DictionaryService } from 'src/app/service/dictionary.service';
import { ScoreService } from 'src/app/service/score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public dictionary: Array<Item>;
  public randomItem!: Item;
  public gameForm!: FormGroup;
  public randomTranslations!: Array<string>;

  constructor(
    private dictionaryService: DictionaryService,
    private scoreService: ScoreService,
    private formBuilder: FormBuilder
  ) {
    this.dictionary = this.dictionaryService.dictionary;
    this.randomTranslations = [];
  }

  public ngOnInit(): void {
    this.initForm();
    this.initGame();
  }

  private initGame(): void {
    const randomIndex = this.getRandomInt(this.dictionary.length);
    this.randomItem = this.dictionary[randomIndex];
    this.setRandomTranslations(this.randomItem);
    this.gameForm.controls['expression'].setValue(this.randomItem.expression);
  }

  private initForm(): void {
    this.gameForm = this.formBuilder.group(
      {
        expression: ['', Validators.required],
        translation: ['', Validators.required]
      }
    );
  }

  public onSubmit(): void {
    const formValue = this.gameForm.value;
    const translation = formValue['translation'];
    if (this.randomItem.translation === translation) {
      this.scoreService.points++;
      this.initGame();
    } 
    this.scoreService.total++;
  }

  private setRandomTranslations(randomItem: Item): void {
    const randomTranslations: Array<string> = [];
    let index = 0;
    const rightAnswerIndex = this.getRandomInt(10);
    const usedIndexList: Array<number> = [];
    while (index < 10) {
      const randomIndex = this.getRandomInt(this.dictionary.length);
      if (!usedIndexList.includes(randomIndex)) {
        usedIndexList.push(randomIndex);
        if (usedIndexList.length === rightAnswerIndex + 1) {
          randomTranslations.push(randomItem.translation);
        } else {
          randomTranslations.push(this.dictionary[randomIndex].translation);
        }
        index++;
      }
    }
    this.randomTranslations = randomTranslations;
  }

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}

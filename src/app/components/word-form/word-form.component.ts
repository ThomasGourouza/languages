import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Word } from 'src/app/models/word';
import { WordUpdate } from 'src/app/models/word-update';
import { DictionaryService } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent implements OnInit, OnDestroy {

  @Input()
  public word!: Word;
  @Input()
  public index!: number;

  private expressionUpdate!: string;
  private translationUpdate!: string;

  public wordForm!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private dictionaryService: DictionaryService
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.initValues();
    this.onValueChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initForm(): void {
    this.wordForm = new FormGroup({
      german: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    });
  }

  private initValues(): void {
    this.wordForm.get('german')?.setValue(this.word.german);
    this.wordForm.get('translation')?.setValue(this.word.french);
  }

  private onValueChange(): void {
    this.subscription = this.wordForm.valueChanges.subscribe((form) => {
      this.expressionUpdate = form['german'];
      this.translationUpdate = form['translation'];
    });
  }

  public update(): void {
    if (!!this.word.id && this.wordForm.valid) {
      const wordUpdate: WordUpdate = {
        german: this.expressionUpdate,
        french: this.translationUpdate
      }
      this.dictionaryService.update(this.word.id, wordUpdate);
    }
  }

  public delete(): void {
    if (!!this.word.id) {
      this.dictionaryService.deleteWord(this.word.id);
    }
  }

}

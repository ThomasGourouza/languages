import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { SettingsService } from 'src/app/service/settings.service';
import { Summary } from '../game.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  @Output()
  stopEmitter = new EventEmitter<undefined>();
  @Output()
  restartEmitter = new EventEmitter<undefined>();
  @Input()
  public summary!: Array<Summary>;
  @Input()
  public numberOfRounds!: number;
  @Input()
  public total!: number;
  @Input()
  public start!: boolean;
  @Input()
  public version!: boolean;

  public mistakeForm!: FormGroup;
  private mistakesOnly: boolean;

  public cols: any[];
  public numbersOfRounds!: Array<number>;

  constructor(
    private commonService: CommonService,
    private settingsService: SettingsService
  ) {
    this.mistakesOnly = false;
    this.cols = [];
  }

  ngOnInit(): void {
    this.initMistakeForm();
    this.numbersOfRounds = this.commonService.numbersOfRounds;
    if (this.version) {
      this.cols.push(
        { field: 'german', header: 'German' },
        { field: 'translation', header: 'Translation' }
      );
    } else {
      this.cols.push(
        { field: 'translation', header: 'Translation' },
        { field: 'german', header: 'German' }
      );
    }
    this.cols.push({ field: 'category', header: 'Category' });
    if (this.settingsService.firebase) {
      this.cols.push(
        { field: 'rating', header: 'Rating' },
        { field: 'numberOfViews', header: 'Views' }
      );
    }
    this.cols.push({ field: 'success', header: 'Success' });
    this.mistakeForm.controls['mistakesOnly'].valueChanges.subscribe((mistakesOnly) => {
      this.mistakesOnly = mistakesOnly;
    });
  }

  private initMistakeForm(): void {
    this.mistakeForm = new FormGroup({
      mistakesOnly: new FormControl(this.mistakesOnly)
    });
  }

  public onStop(): void {
    this.stopEmitter.emit(undefined);
  }

  public onRestart(): void {
    this.restartEmitter.emit(undefined);
  }

  public getRating(summary: Summary): number {
    return (summary.word.numberOfViews > 0) ?
      Math.round(5 * (summary.word.numberOfSuccess / summary.word.numberOfViews)) : 0;
  }

  public getScore(): string {
    const points = this.summary.filter((summary) => summary.success).length;
    const total = this.summary.length;
    return `Score: ` + points + `/` + total;
  }

  public getSummary(): Array<Summary> {
    return this.summary.filter((s) => this.mistakesOnly ? !s.success : true);
  }

  public getCategoryLabel(value: string): string | undefined {
    return this.commonService.categories.find((category) =>
      category.value === value
    )?.label;
  }

}

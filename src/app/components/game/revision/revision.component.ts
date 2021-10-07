import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Word } from 'src/app/models/word';
import { CommonService } from 'src/app/service/common.service';
import { SettingsService } from 'src/app/service/settings.service';
import { Summary } from '../game.component';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html'
})
export class RevisionComponent implements OnInit {

  @Output()
  stopEmitter = new EventEmitter<undefined>();
  @Output()
  readyEmitter = new EventEmitter<undefined>();
  @Input()
  public version!: boolean;
  @Input()
  public dictionaryCategoryLimited!: Array<Word>;

  public cols: any[];
  public numbersOfRounds!: Array<number>;

  constructor(
    private commonService: CommonService,
    private settingsService: SettingsService
  ) {
    this.numbersOfRounds = this.commonService.numbersOfRounds;
    this.cols = [];
  }

  ngOnInit(): void {
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
  }

  public onStop(): void {
    this.stopEmitter.emit(undefined);
  }

  public onReady(): void {
    this.readyEmitter.emit(undefined);
  }

  public getRating(word: Word): number {
    return (word.numberOfViews > 0) ?
      Math.round(5 * (word.numberOfSuccess / word.numberOfViews)) : 0;
  }

  public getCategoryLabel(value: string): string | undefined {
    return this.commonService.categories.find((category) =>
      category.value === value
    )?.label;
  }

}

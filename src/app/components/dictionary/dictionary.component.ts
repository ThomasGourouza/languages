import { Component } from '@angular/core';
import { Word, DictionaryService } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent {

  public dictionary: Array<Word>;
  public categories: Array<string>;

  constructor(
    private dictionaryService: DictionaryService
  ) {
    this.dictionary = this.dictionaryService.dictionary;
    this.categories = [];
    this.dictionary.forEach((word) => {
      if (!this.categories.includes(word.category)) {
        this.categories.push(word.category);
      }
    });
  }

}

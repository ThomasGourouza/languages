import { Component } from '@angular/core';
import { Category, DictionaryService } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent {

  public dictionary: Array<Category>;
  public categories: Array<string>;

  constructor(
    private dictionaryService: DictionaryService
  ) {
    const verbs = this.dictionaryService.verbsCategoryName;
    const nouns = this.dictionaryService.nounsCategoryName;
    const adjectives = this.dictionaryService.adjectivesCategoryName;
    const expressions = this.dictionaryService.expressionsCategoryName;
    this.categories = [verbs, nouns, adjectives, expressions];
    this.dictionary = this.dictionaryService.dictionary;
  }

}

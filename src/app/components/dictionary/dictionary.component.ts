import { Component } from '@angular/core';
import { DictionaryService, Item } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent {

  public dictionary: Array<Item>;

  constructor(
    private dictionaryService: DictionaryService
  ) {
    this.dictionary = this.dictionaryService.dictionary;
  }

}

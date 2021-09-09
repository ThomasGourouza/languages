import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { DictionaryService } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  public dictionary!: Array<any>;
  public categories: Array<string>;

  constructor(
    private dictionaryService: DictionaryService
  ) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.dictionaryService.words.subscribe((words) => {
      console.log(words);
      this.dictionary = words;
      this.dictionary.forEach((word) => {
        if (!this.categories.includes(word.category)) {
          this.categories.push(word.category);
        }
      });
    });
  }

  public addWord(word: any): void {
    this.dictionaryService.addWord(word);
  }

  public deleteWord(): void {
    this.dictionaryService.update();
  }

}

import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word';
import { WordUpdate } from 'src/app/models/word-update';
import { DictionaryService } from 'src/app/service/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  public dictionary!: Array<Word>;
  public categories: Array<string>;

  constructor(
    private dictionaryService: DictionaryService
  ) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.dictionaryService.words.subscribe((words) => {
      this.dictionary = words;
      console.log(this.dictionary);
      this.dictionary.forEach((word) => {
        if (!this.categories.includes(word.category)) {
          this.categories.push(word.category);
        }
      });
    });
  }

  public add(word: Word): void {
    this.dictionaryService.addWord(word);
  }

  public update(id: string, wordupdate: WordUpdate): void {
    this.dictionaryService.update(id, wordupdate);
  }

  public delete(id: string): void {
    this.dictionaryService.deleteWord(id);
  }

}

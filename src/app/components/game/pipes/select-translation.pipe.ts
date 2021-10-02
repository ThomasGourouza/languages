import { Pipe, PipeTransform } from '@angular/core';
import { Word } from 'src/app/models/word';
import { GameService } from 'src/app/service/game.service';

@Pipe({
  name: 'select_translation',
})
export class SelectTranslationPipe implements PipeTransform {

  constructor(
    private gameService: GameService
  ) { }

  transform(array: Array<Word>, limit: number, word: Word): Array<Word> {
    const arrayOfFive = [];
    if (!array) {
      return [];
    }
    while (arrayOfFive.length < limit) {
      const randomInt = this.gameService.getRandomInt(array.length);
      const randomWord = array[randomInt];
      if (!this.gameService.isWordIncluded(randomWord, arrayOfFive)) {
        arrayOfFive.push(randomWord);
      }
    }
    if (!this.gameService.isWordIncluded(word, arrayOfFive)) {
      const randomIndex = this.gameService.getRandomInt(limit);
      arrayOfFive[randomIndex] = word;
    }
    return arrayOfFive;
  }
}

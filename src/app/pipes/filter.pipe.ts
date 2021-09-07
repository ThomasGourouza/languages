import { Pipe, PipeTransform } from '@angular/core';
import { Word } from '../service/dictionary.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: Array<Word>, category: string): Array<Word> {
    if (!array) {
      return [];
    }
    return array.filter((item) => item.category === category);
  }
}

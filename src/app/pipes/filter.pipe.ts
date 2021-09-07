import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: Array<any>, category: string): Array<any> {
    if (!array) {
      return [];
    }
    return array.filter((item) => item.category === category);
  }
}

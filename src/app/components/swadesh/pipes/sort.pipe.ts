import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: Array<any>, key: string): Array<any> {
    if (!array) {
      return [];
    }
    return array.sort((a, b) => {
      return a[key] - b[key];
    });
  }
}

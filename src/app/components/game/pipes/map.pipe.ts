import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
})
export class MapPipe implements PipeTransform {
  transform(array: Array<any>, key: string): Array<string> {
    if (!array) {
      return [];
    }
    return array.map((item) => item[key]);
  }
}

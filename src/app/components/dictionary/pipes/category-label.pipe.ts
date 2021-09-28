import { Pipe, PipeTransform } from '@angular/core';
import { Item, CommonService } from 'src/app/service/common.service';

@Pipe({
  name: 'label',
})
export class CategoryLabelPipe implements PipeTransform {

  private categories: Array<Item>;

  constructor(
    private commonService: CommonService
  ) {
    this.categories = this.commonService.categories;
  }

  transform(categoryValue: string): string | undefined {
    return this.categories.find((category) =>
      category.value === categoryValue
    )?.label;
  }
}

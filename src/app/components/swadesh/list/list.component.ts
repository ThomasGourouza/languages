import { Component, Input, OnInit } from '@angular/core';
import { SwadeshItem } from 'src/app/models/swadesh-item';
import { Language } from 'src/app/models/swadesh-languages';
import { Item } from '../categories-selection/categories-selection.component';
import { SortPipe } from '../pipes/sort.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  @Input() swadeshList!: Array<SwadeshItem>;
  @Input() set languages(value: Array<Language>) {
    this.columns = this.sortPipe.transform(value.filter((item) => item.selected), 'rank')
      .map((item) => item.name);
  }
  @Input() set categoriesArray(value: Array<Item>) {
    this.selectedCategories = value.filter((item) => item.category.selected)
      .map((item) => ({
        category: item.category.name,
        subcategory: item.subcategory
          .filter((subItem) => subItem.selected)
          .map((subItem) => subItem.name)
      }));
  }

  public columns!: Array<string>;
  public selectedCategories!: Array<{ category: string; subcategory: Array<string> }>;

  constructor(
    private sortPipe: SortPipe
  ) { }

  ngOnInit(): void {
    this.swadeshList = this.swadeshList.filter((item) =>
      this.selectedCategories.map((select) => select.category).includes(item.category)
      && this.selectedCategories.find((select) => select.category === item.category)
        ?.subcategory.includes(item.subcategory)
    );
  }

}

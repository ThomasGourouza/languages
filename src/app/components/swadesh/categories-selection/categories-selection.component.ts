import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, Subcategory } from 'src/app/models/swadesh-categories';
import { SelectedCategory } from 'src/app/models/swadesh-selected-category';
export interface Item {
  category: SelectedCategory;
  subcategory: Array<SelectedCategory>;
}

@Component({
  selector: 'app-categories-selection',
  templateUrl: './categories-selection.component.html'
})
export class CategoriesSelectionComponent implements OnInit {

  @Output() categoriesEmitter = new EventEmitter<Array<Item>>();
  @Input() categories!: Map<Category, Array<Subcategory>>;
  public categoriesArray!: Array<Item>;

  ngOnInit(): void {
    this.categoriesArray = Array.from(this.categories, ([name, value]) => ({ name, value }))
      .map((item) => {
        const result: Item = {
          category: {
            name: item.name.toString(),
            selected: true
          },
          subcategory: []
        };
        item.value.forEach((val) => result.subcategory.push({ name: val.toString(), selected: true }));
        return result;
      });
    this.categoriesEmitter.emit(this.categoriesArray);
  }

  public onRowSelect(
    category: SelectedCategory, subcategory: Array<SelectedCategory>, row: SelectedCategory, isSelected: boolean
  ): void {
    row.selected = isSelected;
    if (isSelected || (!isSelected && !subcategory.some((item) => item.selected))) {
      category.selected = isSelected;
    }
    this.categoriesEmitter.emit(this.categoriesArray);
  }

  public checkboxChange(category: SelectedCategory, subcategory: Array<SelectedCategory>, checked: boolean): void {
    category.selected = checked;
    subcategory.forEach((item) => item.selected = checked);
    this.categoriesEmitter.emit(this.categoriesArray);
  }

  public getSelected(array: Array<SelectedCategory>): Array<SelectedCategory> {
    return array.filter((item) => item.selected);
  }

}

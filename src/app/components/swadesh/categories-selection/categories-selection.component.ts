import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class CategoriesSelectionComponent {

  @Output() categoriesEmitter = new EventEmitter<Array<Item>>();
  @Input() set categories(categoriesMap: Map<Category, Array<Subcategory>>) {
    this.categoriesArray = Array.from(categoriesMap, ([name, value]) => ({ name, value }))
      .map((item) => ({
        category: {
          name: item.name.toString(),
          selected: true
        },
        subcategory: item.value.map((val) => ({
          name: val.toString(),
          selected: true
        }))
      }));
    this.categoriesEmitter.emit(this.categoriesArray);
  }
  public categoriesArray!: Array<Item>;

  public onCategoriesSelect(item: Item): void {
    const newcategories = this.categoriesArray.filter((cat) => cat.category.name !== item.category.name);
    newcategories.push(item);
    this.categoriesEmitter.emit(newcategories);    
  }

}

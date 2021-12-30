import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectedCategory } from 'src/app/models/swadesh-selected-category';
import { SwadeshService } from 'src/app/service/swadesh.service';
import { Item } from '../categories-selection.component';

@Component({
  selector: 'app-subcategories-selection',
  templateUrl: './subcategories-selection.component.html'
})
export class SubcategoriesSelectionComponent implements OnInit {

  @Output() categoriesEmitter = new EventEmitter<Item>();
  @Input() item!: Item;

  public selectedCategory!: boolean;
  public selectedSubcategory!: Array<SelectedCategory>;

  constructor(
    private swadeshService: SwadeshService
  ) { }

  ngOnInit(): void {
    if (!this.swadeshService.selectedConjunctions
      || !this.swadeshService.selectedAdjectives
      || !this.swadeshService.selectedNouns
      || !this.swadeshService.selectedVerbs) {
      this.setCategoriesInService(this.item);
    }
    this.selectedSubcategory = this.getCategoriesFromService(this.item.category.name);
    this.refreshSelectedCategories();
  }

  private refreshSelectedCategories(): void {
    this.item.subcategory.forEach((subcat) => {
      subcat.selected = (this.selectedSubcategory.map((selected) => selected.name).includes(subcat.name));
    });
    this.item.category.selected = this.item.subcategory.some((item) => item.selected);
  }

  public getSelectedSubcategories(): Array<SelectedCategory> {
    return this.selectedSubcategory;
  }

  public onRowSelect(
    category: SelectedCategory, subcategory: Array<SelectedCategory>, row: SelectedCategory, isSelected: boolean
  ): void {
    row.selected = isSelected;
    if (isSelected || (!isSelected && !subcategory.some((item) => item.selected))) {
      category.selected = isSelected;
    }
    this.emitItem(category, subcategory);
  }

  public onCheckboxChange(
    category: SelectedCategory, subcategory: Array<SelectedCategory>, checked: boolean
  ): void {
    category.selected = checked;
    subcategory.forEach((item) => item.selected = checked);
    this.emitItem(category, subcategory);
  }

  private emitItem(category: SelectedCategory, subcategory: Array<SelectedCategory>): void {
    const emittedItem: Item = { category, subcategory };
    this.setCategoriesInService(emittedItem);
    this.selectedSubcategory = this.getCategoriesFromService(this.item.category.name);
    this.categoriesEmitter.emit(emittedItem);
  }

  private getCategoriesFromService(categoryName: string): Array<SelectedCategory> {
    switch (categoryName) {
      case 'conjunction':
        return this.swadeshService.selectedConjunctions;
      case 'adjective':
        return this.swadeshService.selectedAdjectives;
      case 'noun':
        return this.swadeshService.selectedNouns;
      case 'verb':
        return this.swadeshService.selectedVerbs;
      default:
        return [];
    }
  }

  private setCategoriesInService(item: Item): void {
    switch (item.category.name) {
      case 'conjunction':
        this.swadeshService.selectedConjunctions = item.subcategory.filter((cat) => cat.selected);
        break;
      case 'adjective':
        this.swadeshService.selectedAdjectives = item.subcategory.filter((cat) => cat.selected);
        break;
      case 'noun':
        this.swadeshService.selectedNouns = item.subcategory.filter((cat) => cat.selected);
        break;
      case 'verb':
        this.swadeshService.selectedVerbs = item.subcategory.filter((cat) => cat.selected);
        break;
      default:
        break;
    }
  }

}

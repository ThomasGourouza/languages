import { Component, OnInit } from '@angular/core';
import { Category, Subcategory } from 'src/app/models/swadesh-categories';
import { SwadeshItem } from 'src/app/models/swadesh-item';
import { Language } from 'src/app/models/swadesh-languages';
import { SwadeshService } from 'src/app/service/swadesh.service';
import { Item } from './categories-selection/categories-selection.component';
import { LanguageSelection } from './languages-selection/languages-selection.component';

@Component({
  selector: 'app-swadesh',
  templateUrl: './swadesh.component.html'
})
export class SwadeshComponent implements OnInit {

  public languages: Array<Language>;
  public categories: Map<Category, Array<Subcategory>>;
  public categoriesArray: Array<Item>;
  public swadeshList: Array<SwadeshItem>;

  public tableLoaded = true;
  public listLoaded = false;

  constructor(
    private swadeshService: SwadeshService
  ) {
    this.categories = this.swadeshService.categories;
    this.languages = this.swadeshService.languages;
    this.categoriesArray = [];
    this.swadeshList = [];
  }

  ngOnInit(): void {
    this.swadeshService.swadeshItems$.subscribe((swadeshItems) => {
      this.swadeshList = swadeshItems;
      this.listLoaded = (this.swadeshService.accordionTabSelected === 2);
    });
  }

  public toArray(categories: Map<Category, Array<Subcategory>>): Array<any> {
    return Array.from(categories, ([name, value]) => ({ name, value }));
  }

  public onLanguageUp(language: Language): void {
    if (language.rank === 1) {
      return;
    }
    this.tableLoaded = false;
    const newRank = language.rank - 1;
    const currentUpperLanguage = this.languages.find((lang) => lang.rank === newRank);
    if (!!currentUpperLanguage) {
      currentUpperLanguage.rank = language.rank;
    }
    language.rank = newRank;
    setTimeout(() => {
      this.tableLoaded = true;
    }, 10);
  }

  public onRowSelect(languageSelection: LanguageSelection): void {
    languageSelection.language.selected = languageSelection.selected;
  }

  public getAccordionTabSelected(): number {
    return this.swadeshService.accordionTabSelected;
  }

  public onTabEvent(index: number, event: string) {
    if (event === 'open') {
      this.swadeshService.accordionTabSelected = index;
      this.listLoaded = (index === 2);
    } else {
      this.swadeshService.accordionTabSelected = -1;
    }
  }

  public getCategories(categoriesArray: Array<Item>): void {
    this.categoriesArray = categoriesArray;
  }

}

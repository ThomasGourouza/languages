import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/models/swadesh-languages';
export interface LanguageSelection {
  language: Language;
  selected: boolean;
}

@Component({
  selector: 'app-languages-selection',
  templateUrl: './languages-selection.component.html'
})
export class LanguagesSelectionComponent implements OnInit {

  @Output() rowSelect = new EventEmitter<LanguageSelection>();
  @Output() languageUp = new EventEmitter<Language>();
  @Input() languages!: Array<Language>;
  public selectedLanguages!: Array<Language>;

  ngOnInit(): void {
    this.selectedLanguages = this.languages.filter((lang) => lang.selected);
  }

  public onLanguageUp(language: Language): void {
    this.languageUp.emit(language);
  }

  public onRowSelect(lang: Language, isSelected: boolean): void {
    this.rowSelect.emit({
      language: lang,
      selected: isSelected
    });
  }

}

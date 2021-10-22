import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Word } from 'src/app/models/word';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { ActivatedRoute } from '@angular/router';
import { AddWordService } from 'src/app/service/add-word.service';
import { CommonService, Item, Mode } from 'src/app/service/common.service';
import { ExcelService } from 'src/app/service/excel.service';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/service/settings.service';

export interface FormFilter {
  german: string;
  translation: string;
  categories: Array<string>;
  ratings: Array<number>;
}

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit, OnDestroy {

  private wordSubscription: Subscription;
  private words!: Array<Word>;
  public wordsFiltered!: Array<Word>;
  public categories: Array<Item>;
  public ratings: Array<Item>;
  public formFilter!: FormGroup;
  public filterSelected: boolean;
  public modes: Array<Mode>;
  public mode: Mode;
  public firebase!: boolean;

  constructor(
    private dictionaryService: DictionaryService,
    private settingsService: SettingsService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private addWordService: AddWordService,
    private commonService: CommonService,
    private excelService: ExcelService
  ) {
    this.categories = this.commonService.categories;
    this.ratings = this.commonService.ratings;
    this.modes = this.commonService.modes;
    this.mode = this.commonService.mode;
    this.filterSelected = false;
    this.wordSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.addWordService.setWordDialog$(false);
    this.addWordService.setSubmitted$(false);
    this.route.queryParams.subscribe(params => {
      const german = params.german;
      const translation = params.translation;
      const categories = params.categories;
      const ratings = params.ratings;
      this.filterSelected = !!german || !!translation || !!categories || !!ratings;
      this.initFormFilter(german, translation, categories, ratings);
    });
    this.loadWords();
    this.formFilter.valueChanges.subscribe((form: FormFilter) => {
      this.onFilter(form.german, form.translation, form.categories, form.ratings);
    });
  }

  private loadWords(): void {
    this.wordSubscription = this.dictionaryService.words.subscribe((words) => {
      this.firebase = this.settingsService.settingForm.firebase;
      this.words = this.dictionaryService.manageWord(words, this.firebase ? this.mode.activated : true);
      const existingWords: Array<string> = [];
      this.getNewWords().forEach((w) => {
        if (this.words.map((wo) => wo.german).includes(w)) {
          existingWords.push(w);
        }
      });
      console.log(existingWords);
      this.filterFromForm();
    });
  }

  private getNewWords(): Array<string> {
    return [
      "vollgas",
      "wiederum",
      "Abnahme",
      "zusätzlich",
      "offensichtlich",
      "freigegeben",
      "genehmigt",
      "so bald ich kann",
      "so bald wie möglich",
      "grundsätzlich",
      "ohne Ende",
      "darüber hinaus",
      "Obwohl",
      "vorsichtig",
      "bestimmt",
      "es ist geklärt",
      "beziungsweise",
      "übersichtlich",
      "Spalte",
      "greifbar",
      "verurteilen",
      "selbstbewusst",
      "eingedrängt",
      "überfüllt",
      "derzeit",
      "so rum",
      "insgesammt",
      "ausgeliefert",
      "abhängig von",
      "deutlich",
      "ausleihen",
      "nach dem",
      "gemeinsam",
      "übergreifen",
      "schmal",
      "selbst nach dem was du erlebst hast",
      "jede stelle",
      "als letztes",
      "beispielsweise",
      "erstmal",
      "gezwungen",
      "erkenntlich",
      "er liest",
      "Allerdings",
      "jedoch",
      "wollte es nur erwähnt haben",
      "ich fange von vorne an",
      "hier steht",
      "ich schreibe mal gerade einen Satz zu Ende.",
      "im vergleich dazu",
      "im Nachhinein",
      "trotz alledem",
      "mittlerweile",
      "tatsächlich",
      "beeinflussen",
      "es erscheint",
      "mir ist klar geworden",
      "es hängt von etwas anderes ab",
      "es kommt auf etwas anderes an",
      "es tritt auf",
      "es auftaucht",
      "es dauert eine Weile",
      "ich kann nicht bis zum Ende bleiben und werde mich daher schon früher ausklinken",
      "berechtigt",
      "gerechtfertigt",
      "das Kreuz",
      "die Darstellung",
      "der Bedarf",
      "die Notwendigkeit",
      "der Umbruch",
      "der Eindringling",
      "hauptsächlich",
      "vorlage",
      "gezeigt",
      "komplizierter als nötig",
      "nichts­des­to­trotz",
      "irgendjemand",
      "merklich",
      "unser Fall",
      "(ab)tauchen",
      "möglicherweise",
      "mächtig",
      "vorschreiben",
      "vorgeschrieben",
      "(ver)leihen",
      "primär",
      "letztens",
      "aufwerben",
      "freigegeben",
      "die Darstellung",
      "erforderlich",
      "ohne Ende",
      "schuldig",
      "zurückgreifen",
      "die Vorgabe",
      "Vielen Dank fürs bescheid geben ",
      "die Wut",
      "der Durchschnitt",
      "der Mittelwert",
      "das Benehmen",
      "das Verhalten",
      "der Zweig",
      "der Fall",
      "die Hass",
      "die Einleitung",
      "die Sitzung",
      "der Betreuer",
      "die Vermutung",
      "die Ansicht",
      "sie halten sich nicht an die regeln",
      "sie läufen Jahre lang durch",
      "so rum",
      "zugeben",
      "beantworten",
      "erscheinen",
      "genehmigen",
      "zuweisen",
      "sich benehmen",
      "aufräumen",
      "betreffen",
      "erstellen",
      "besiegen",
      "verteidigen",
      "ausliefern",
      "bestimmen",
      "verlängern",
      "(er)zwingen",
      "verzeihen",
      "loslegen",
      "heilen",
      "unterbrechen",
      "beurteilen",
      "angucken",
      "auftreten",
      "auftauchen",
      "freigeben",
      "loslassen",
      "verlassen sich auf",
      "ersetzen",
      "berichten",
      "benötigen",
      "erfordern",
      "(ab)speichern",
      "sich daran halten",
      "schalten",
      "übernehmen",
      "abstimmen",
      "aufschreiben",
      "unison",
      "einheitlich",
      "gültig",
      "worum geht es denn?",
      "innerhalb + gen",
      "zurückziehen",
      "abgleichen",
      "abhängigkeit",
      "abrufen",
      "abschätzen",
      "abtauchen",
      "aufendig",
      "aufmerksamkeit",
      "ausklinken",
      "ausreichen",
      "beantworten",
      "bedarf",
      "bedrehen",
      "bedroht",
      "bedürfen",
      "berichtet an",
      "bescheid geben",
      "bestätigt",
      "betreffen",
      "bezüglich",
      "bis zu einem gewissen grad ja",
      "bitte wenden Sie sich an den Support",
      "danach",
      "darüber hinaus",
      "das Fahrzeug",
      "das hat Zeit gekostet",
      "das kostet Zeit",
      "das passen wir demnächst noch an, damit es nicht zu nervig wird",
      "dass er aus registry hollt",
      "die voransetzung zu klären",
      "Du kannst einem echt leid tun",
      "ein Schritt zurück",
      "einrichten",
      "eins von Beiden",
      "entsprechende",
      "ergänzung",
      "erscheinen",
      "erstaunlich",
      "es bringt komplexität mit rein",
      "es gibt ohne Ende Plätz",
      "es ist ein gutes Zeichen",
      "es ist unglaublich langsam",
      "es liegt daran",
      "etwas dass du ewig suchst",
      "festhalten",
      "gewählt",
      "gibt es Fragen Bedarf",
      "glückwunsch, sie haben bestanden",
      "Gott sei dank",
      "greifbar",
      "grundlage",
      "grundzätzlich",
      "ich habe angst davor",
      "ich weiss nicht ob es ausreicht",
      "innerhalb + gen",
      "jedenfalls",
      "kein rolle spielen",
      "kein Unterschied zu dem was ich ...",
      "landersweise",
      "lediglich",
      "losarbeiten",
      "manche spielen Schach",
      "miteinzubinden",
      "nachdem",
      "nachfragen",
      "negotiate",
      "nehme ich mit",
      "offensichtlich",
      "optimal",
      "passt das soweit",
      "rum spielen",
      "sagst das nicht so leicht fertig",
      "Schulung",
      "selbst Verteidigung",
      "selbststandig",
      "Sie dürfen nicht so tun als ob A und B die gleichen Ziele hätten",
      "sie machen das Leben schwer",
      "so rum",
      "Stimmung weiter auf",
      "teilweise",
      "to update",
      "trotz Lockdown",
      "trotzallerdem",
      "übergreifen",
      "unabhangig davon",
      "uninteressant",
      "unterhalb",
      "unterwegs",
      "verarbeiten",
      "verbauen",
      "verfugung",
      "Verhalten",
      "verhandeln",
      "versorgen",
      "verwendbar",
      "vollkommen egal",
      "vollstandig",
      "von meiner Seite aus",
      "wann man versucht es abzurufen",
      "was auch immer",
      "wechseln",
      "wie auch immer",
      "wir haben abgemacht",
      "wir haben beschlossen",
      "wir können das loslegen",
      "Zufall",
      "zufällig",
      "zukunftige",
      "zur Info",
      "zusammenbrechen",
      "zusammenfassung",
      "zusammengebrochen",
      "zuweisen",
      "zwichenfrage"
    ]
  }

  public onModeChange(): void {
    this.commonService.mode = this.mode;
    this.loadWords();
  }

  ngOnDestroy(): void {
    this.wordSubscription.unsubscribe();
  }

  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.wordsFiltered, 'dictionary');
  }

  private initFormFilter(german: string, translation: string, categories: string, ratings: string): void {
    const categoryList = !!categories ? categories.split(',') : [];
    const ratingList = !!ratings ? ratings.split(',').map((r) => +r) : [];
    this.formFilter = new FormGroup({
      german: new FormControl(!!german ? german : ''),
      translation: new FormControl(!!translation ? translation : ''),
      categories: new FormControl(categoryList),
      ratings: new FormControl(ratingList)
    });
  }

  private onFilter(german: string, translation: string, categories: Array<string>, ratings: Array<number>): void {
    this.wordsFiltered = this.words.filter((word) => {
      const germanFilter = (!!german) ? this.removeBrackets(word.german).toLowerCase().includes(german.toLowerCase()) : true;
      const translationFilter = (!!translation) ? this.removeBrackets(word.translation).toLowerCase().includes(translation.toLowerCase()) : true;
      const categoriesFilter = (categories.length > 0) ? categories.includes(word.category) : true;
      const ratingsFilter = (ratings.length > 0) ? (word.rating != undefined && ratings.includes(word.rating)) : true;
      return germanFilter && translationFilter && categoriesFilter && ratingsFilter;
    });
  }

  private removeBrackets(text: string): string {
    return text.replace('(', '').replace(')', '');
  }

  public openNew(): void {
    this.addWordService.initWord$();
    this.addWordService.setSubmitted$(false);
    this.addWordService.setWordDialog$(true);
  }

  public deleteWord(word: Word): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + word.german + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const wordId = word.id;
        if (!!wordId) {
          this.dictionaryService.deleteWord(wordId, word.german);
        }
      }
    });
  }

  public deactivateWord(word: Word): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to deactivate ' + word.german + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const wordId = word.id;
        if (!!wordId) {
          this.dictionaryService.deactivateWord(wordId, word.german);
        }
      }
    });
  }

  public activateWord(word: Word): void {
    const wordId = word.id;
    if (!!wordId) {
      this.dictionaryService.activateWord(wordId, word.german);
    }
  }

  public updateWord(word: Word): void {
    this.addWordService.setWord$({ ...word });
    this.addWordService.setWordDialog$(true);
  }

  public resetFilter(): void {
    this.initFormFilter('', '', '', '');
    this.onFilter('', '', [], []);
    this.formFilter.valueChanges.subscribe((form: FormFilter) => {
      this.onFilter(form.german, form.translation, form.categories, form.ratings);
    });
  }

  private filterFromForm(): void {
    const german = this.formFilter.get('german')?.value;
    const translation = this.formFilter.get('translation')?.value;
    const categories = this.formFilter.get('categories')?.value;
    const ratings = this.formFilter.get('ratings')?.value;
    this.onFilter(german, translation, categories, ratings);
  }

  public getLabel(): string | undefined {
    return this.settingsService.getLabel();
  }

}

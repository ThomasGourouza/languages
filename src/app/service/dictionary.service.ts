import { Injectable } from '@angular/core';
export interface Item {
  expression: string;
  translation: string;
}
export interface Category {
  name: string;
  content: Array<Item>;
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private _dictionary: Array<Category>;

  private _verb!: Category;
  private _noun!: Category;
  private _adjective!: Category;
  private _expression!: Category;

  private _verbsCategoryName: string = "Verbes";
  private _nounsCategoryName: string = "Noms";
  private _adjectivesCategoryName: string = "Adjectifs";
  private _expressionsCategoryName: string = "Expressions";

  constructor() {
    this.init();
    this._dictionary = [
      this._verb,
      this._noun,
      this._adjective,
      this._expression
    ];
  }

  get dictionary(): Array<Category> {
    return this._dictionary;
  }

  get verbsCategoryName(): string {
    return this._verbsCategoryName;
  }
  get nounsCategoryName(): string {
    return this._nounsCategoryName;
  }
  get adjectivesCategoryName(): string {
    return this._adjectivesCategoryName;
  }
  get expressionsCategoryName(): string {
    return this._expressionsCategoryName;
  }

  private init(): void {
    this._verb = {
      name: this._verbsCategoryName,
      content: [
        { expression: "(ver)schief gehen", translation: "go wrong" },
        { expression: "verwalten", translation: "manage" },
        { expression: "einfügen", translation: "insert" },
        { expression: "beibringen", translation: "to teach" },
        { expression: "umsetzen", translation: "implement" },
        { expression: "erfassen", translation: "capture" },
        { expression: "abstimmen", translation: "vote" },
        { expression: "schätzen", translation: "estimate" },
        { expression: "sich beklagen/sich beschweren", translation: "se plaindre" },
        { expression: "verschiebbar", translation: "movable" },
        { expression: "erstellen", translation: "create" },
        { expression: "eingeben", translation: "enter" },
        { expression: "erzeugen", translation: "générer" },
        { expression: "entfernen", translation: "remove" },
        { expression: "anstehen", translation: "stand in line/queue" },
        { expression: "benötigen", translation: "require" },
        { expression: "bevorzugen", translation: "to prefer" },
        { expression: "erkunden", translation: "explore" },
        { expression: "abheben", translation: "zurückziehen" },
        { expression: "halten für", translation: "consider" },
        { expression: "weiterleiten (weitergeleitet)", translation: "forward" },
        { expression: "aufnehmen", translation: "enregistrer/record" },
        { expression: "betrachten", translation: "consider" },
        { expression: "berücksichtigen (berücksichtigt)", translation: "prendre en compte" },
        { expression: "verwandeln", translation: "transform" },
        { expression: "umwandeln", translation: "convert" },
        { expression: "beobachten", translation: "observer" },
        { expression: "stattfinden", translation: "occur / take place" },
        { expression: "auslösen", translation: "déclencher" },
        { expression: "jemanden auslachen", translation: "se moquer de quelqu'un" },
        { expression: "zunehmen", translation: "prendre du poids" },
        { expression: "abnehmen", translation: "perdre du poids" },
        { expression: "wegdrücken", translation: "push away" },
        { expression: "anziehen", translation: "put on" },
        { expression: "ausziehen", translation: "take off" },
        { expression: "nachfragen", translation: "demander" },
        { expression: "auskennen", translation: "to know about" },
        { expression: "rumfragen", translation: "ask around" },
        { expression: "aufklappen", translation: "ouvrir" },
        { expression: "überreden", translation: "persuader" },
        { expression: "überzeugen", translation: "convaincre" },
        { expression: "sich verhalten/sich benehmen", translation: "behave" },
        { expression: "vorgeben", translation: "pretend" },
        { expression: "sich beziehen auf", translation: "se référer à" },
        { expression: "bewerten", translation: "assess" },
        { expression: "ablaufen", translation: "expire" },
        { expression: "übernehmen", translation: "to take over" },
        { expression: "beißen (gebißen)", translation: "mordre" },
        { expression: "ablösen", translation: "détacher" },
        { expression: "besorgen", translation: "take care of" },
        { expression: "beibehalten", translation: "maintenir" },
        { expression: "beibelassen", translation: "leave at it is" },
        { expression: "vorbeikommen", translation: "come over" },
        { expression: "vorbeibringen", translation: "bring over" },
        { expression: "ausschlafen", translation: "faire la grace matinée" },
        { expression: "abbrechen", translation: "abort" },
        { expression: "nachsehen", translation: "check" },
        { expression: "darauf achten", translation: "be careful" },
        { expression: "mitgeben", translation: "révéler" },
        { expression: "herausfinden", translation: "find out" },
        { expression: "einspielen", translation: "donner un signal" },
        { expression: "feststellen", translation: "se rendre compte" },
        { expression: "zurückkehren", translation: "to come back" },
        { expression: "jemanden munter machen", translation: "rendre qqun joyeux" },
        { expression: "jemanden aufheitern", translation: "to cheer up someone" },
        { expression: "ermutigen", translation: "encourage" },
        { expression: "trösten", translation: "consoler" }
      ]
    };
    this._noun = {
      name: this._nounsCategoryName,
      content: [
        { expression: "die Eigenschaft", translation: "property" },
        { expression: "Die Fehlermeldung", translation: "message d'erreur" },
        { expression: "die Schuld", translation: "faute" },
        { expression: "das verständnis", translation: "understanding" },
        { expression: "die anwesenheit", translation: "la présence" },
        { expression: "der Zustand", translation: "state" },
        { expression: "die Schublade", translation: "tiroir" },
        { expression: "die Schablone", translation: "template" },
        { expression: "die Abwechslung / die Vielfalt", translation: "la variété" },
        { expression: "die Anforderung", translation: "requirement" },
        { expression: "Ausnahme", translation: "exception" },
        { expression: "das Erzeugnis", translation: "product" },
        { expression: "der Strich", translation: "trait" },
        { expression: "die Notwendigkeit", translation: "nécessité" },
        { expression: "die Rückmeldung", translation: "feedback" },
        { expression: "die Oberfläche", translation: "surface" },
        { expression: "die Anzahl", translation: "numéro/nombre" },
        { expression: "das Werkzeug", translation: "tool" },
        { expression: "der Mehrzahl", translation: "plural" },
        { expression: "die Umgebung / die Umwelt", translation: "environement" },
        { expression: "der Ansatz", translation: "une approche" },
        { expression: "der Hinweis", translation: "une note / indice" },
        { expression: "der Ausflug", translation: "excursion" },
        { expression: "der Satz", translation: "la phrase" },
        { expression: "das Pech", translation: "bad luck" },
        { expression: "die Tastatur", translation: "clavier" },
        { expression: "der Oberste", translation: "the top one" },
        { expression: "die Reihenfolge", translation: "the order" },
        { expression: "der Unterschied", translation: "la différence" },
        { expression: "der Notfall", translation: "urgence" },
        { expression: "der Wecker", translation: "alarm clock" },
        { expression: "der Vorgängner", translation: "predecessor" },
        { expression: "der Nachgängner", translation: "successor" },
        { expression: "die Maßnahme", translation: "measure" },
        { expression: "die Vermutung", translation: "la supposition" },
        { expression: "das Leerzeichen", translation: "espace" },
        { expression: "das Ausrufezeichen", translation: "exclamation mark" },
        { expression: "das Fragezeichen", translation: "Question mark" },
        { expression: "das Vergnügen", translation: "plaisir" },
        { expression: "der Abstand", translation: "distance" }
      ]
    };
    this._adjective = {
      name: this._adjectivesCategoryName,
      content: [
        { expression: "zugriff verweigert", translation: "access denied" },
        { expression: "zusätzlich", translation: "en plus" },
        { expression: "überzeugt (von)", translation: "convaincu (de)" },
        { expression: "bescheiden", translation: "modeste" },
        { expression: "scheinbar", translation: "apparently" },
        { expression: "überrascht", translation: "surprised" },
        { expression: "regelmäßig", translation: "regularly" },
        { expression: "wesentlich", translation: "considérablement" },
        { expression: "bezüglich + datif", translation: "regarding" },
        { expression: "ggfs.", translation: "gegebenenfalls" },
        { expression: "bzw.", translation: "beziehungsweise" },
        { expression: "abwesend", translation: "absent" },
        { expression: "verantwortlich, zuständig", translation: "responsable" },
        { expression: "wertvoll", translation: "valuable" },
        { expression: "letztendlich", translation: "in the end" },
        { expression: "veraltet", translation: "out of date" },
        { expression: "Notwendig", translation: "nécessaire" },
        { expression: "oberflächlich", translation: "superficial" },
        { expression: "vollkommen / vollständig", translation: "completely" },
        { expression: "erforderlich", translation: "obligatoire" },
        { expression: "auswendig lernen", translation: "apprendre par cœur" },
        { expression: "zurecht", translation: "à juste titre" },
        { expression: "spätestens", translation: "au plus tard" },
        { expression: "mindestens", translation: "au moins" },
        { expression: "übel / böse", translation: "evil" },
        { expression: "förderlich", translation: "bénéfique" },
        { expression: "gemütlich", translation: "confortable" },
        { expression: "regelmäßig", translation: "regularly" },
        { expression: "grundsätzlich", translation: "essentiellement" },
        { expression: "bezüglicherweise", translation: "relatif à" },
        { expression: "besorgt", translation: "concerned" },
        { expression: "frühestens", translation: "at earliest" },
        { expression: "kontraproduktiv", translation: "contre productif" },
        { expression: "im Voraus", translation: "in advance" },
        { expression: "teilweise", translation: "partially/sometimes" },
        { expression: "ursprünglich", translation: "originally" },
        { expression: "verfault", translation: "rotten" },
        { expression: "ausgezeichnet", translation: "excellent" },
        { expression: "nirgends, nirgendwo", translation: "nowhere" }
      ]
    };
    this._expression = {
      name: this._expressionsCategoryName,
      content: [
        { expression: "In dieser Woche habe ich an einer Lösung gearbeitet", translation: "this week I've been working on a solution" },
        { expression: "er mischte zum guten etwas schlechtes und umgekehrt", translation: "he mixed something bad for good and vice versa" },
        { expression: "Kein Thema", translation: "no problem" },
        { expression: "soweit ich weiß", translation: "as far as I know" },
        { expression: "soviel ich weiß", translation: "as much as I know" },
        { expression: "das ganze Thema", translation: "the whole subject" },
        { expression: "soweit ich das verstanden habe", translation: "pour autant que j'ai compris" },
        { expression: "in letzter zeit", translation: "ces dernier temps" },
        { expression: "Ich bin daran gewöhnt", translation: "j'y suis habitué" },
        { expression: "ich verabschiede mich", translation: "I say goodbye" },
        { expression: "er hat beschlossen", translation: "il a décidé" },
        { expression: "Von meiner Seite aus", translation: "from my side" },
        { expression: "wo fahren sie hin", translation: "where are you going" },
        { expression: "an sich", translation: "en soi" },
        { expression: "warum auch immer", translation: "for whatever reason" },
        { expression: "es lag dran", translation: "c'est parceque" },
        { expression: "mir ist aufgefallen", translation: "i noticed" },
        { expression: "mir fällt nichts ein", translation: "I can't think of anything" },
        { expression: "es fällt mir leicht", translation: "It is easy for me" },
        { expression: "in anbetracht", translation: "in view of / considering" },
        { expression: "ich gebe dir recht", translation: "je te donne raison" },
        { expression: "schweigen ist zustimmung", translation: "qui ne dit mot consent" },
        { expression: "2/8", translation: "2 von 8 – 2 durch 8" },
        { expression: "mit jemandem rechnen", translation: "expect someone" },
        { expression: "auf jemanden zählen", translation: "compter sur qqun" },
        { expression: "hiermit", translation: "ci-joint" },
        { expression: "ich halte die anderen für veraltet", translation: "I consider the others are out of date" },
        { expression: "irgendwie sowas", translation: "something like that" },
        { expression: "es ist sowas wie ...", translation: "it is like ..." },
        { expression: "irgendwie sowas lustiges", translation: "somehow something funny" },
        { expression: "würdest du testen wollen?", translation: "would you want to test?" },
        { expression: "wir haben beschlossen", translation: "on a décidé" },
        { expression: "in dem Fall", translation: "dans ce cas" },
        { expression: "ich bin nicht damit vertraut", translation: "I am not familiar with it" },
        { expression: "achten sie bitte", translation: "votre attention svp" },
        { expression: "mit eigenen Augen", translation: "de mes propres yeux" },
        { expression: "bist du unter uns ?", translation: "are you among us ?" },
        { expression: "wenn ich mich nicht irre", translation: "si je ne me trompe pas" },
        { expression: "sie hat mich ausgelacht", translation: "she laughed at me" },
        { expression: "sagt dir das etwas?", translation: "does that ring a bell?" },
        { expression: "wo ich groß geworden bin", translation: "où j'ai grandi" },
        { expression: "habe ich nie gemocht", translation: "I never liked" },
        { expression: "wie hieß es schon?", translation: "comment ça s'appellait déjà?" },
        { expression: "was hältst du davon?", translation: "What do you think about?" },
        { expression: "fleißig am machen", translation: "occupé à faire" },
        { expression: "Ich formuliere nochmals um", translation: "je reformule de nouveau" },
        { expression: "grundsätzliches Problem", translation: "problème fondamental" },
        { expression: "sowas - so ähnlich", translation: "comme ça" },
        { expression: "wer hat worüber Wissen", translation: "who has knowledge of what" },
        { expression: "bis dahin", translation: "until then" },
        { expression: "bis nachher", translation: "see you later" },
        { expression: "die Spannung steigt", translation: "the suspens rises" },
        { expression: "je nachdem", translation: "depending on" },
        { expression: "Ich gehe davon aus", translation: "I assume" },
        { expression: "und so weiter und so fort", translation: "and so on and so forth" },
        { expression: "dazu zu holen", translation: "to bring in" },
        { expression: "ich hätte das nicht machen sollen", translation: "ich hätte das nicht machen sollen" },
        { expression: "sie hängt in Frankreich fest", translation: "she's stuck in France" },
        { expression: "ich gucke mal nach", translation: "I'll have a look" },
        { expression: "stell dir kurz vor", translation: "imagine toi" },
        { expression: "hört sich gut an", translation: "sounds good" },
        { expression: "im vergleich zu", translation: "compared to" },
        { expression: "im Verlauf (+ datif)", translation: "au cours de" }
      ]
    };
  }

}

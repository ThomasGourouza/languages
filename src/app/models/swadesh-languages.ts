export enum Languages {
    english = 'english',
    dutch = 'dutch',
    german = 'german',
    danish = 'danish',
    french = 'french',
    italian = 'italian',
    spanish = 'spanish',
    portuguese = 'portuguese',
    russian = 'russian',
    japanese = 'japanese',
    greek = 'greek'
}

export interface Language {
    name: string;
    selected: boolean;
    rank: number;
}

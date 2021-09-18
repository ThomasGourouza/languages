export interface Word {
    id?: string;
    category: string;
    german: string;
    french: string;
    english: string;
    numberOfViews: number;
    numberOfSuccess: number;
    rating?: number;
}
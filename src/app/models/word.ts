export interface Word {
    id?: string;
    category: string;
    expression: string;
    translation: string;
    numberOfViews: number;
    numberOfSuccess: number;
    rating?: number;
}
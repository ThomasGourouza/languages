export interface Word {
    id?: string;
    category: string;
    german: string;
    translation: string;
    numberOfViews: number;
    numberOfSuccess: number;
    isActive: boolean;
    rating?: number;
}
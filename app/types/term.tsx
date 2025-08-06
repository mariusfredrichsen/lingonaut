import { Category } from './category';

export type Term = {
    id: string;
    languageFrom: string;
    languageTo: string;
    termFrom: string;
    termTo: string;
    description?: string;
    categories: Category[];
};
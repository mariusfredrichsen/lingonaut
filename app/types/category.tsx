import { Term } from './term';

export type Category = {
    id: string;
    title: string;
    languageFrom: string;
    languageTo: string;
    description?: string;
    terms: Term[];
};
import { Term } from './term';



export type Course = {
    id: string;
    title: string;
    languageFrom: string;
    languageTo: string;
    description?: string;
    author: string;
    terms: Term[];
};
import { Category } from './category.model';

export interface Course {
  _id?: string;
  title: string;
  author: string;
  description?: string;
  languageFrom: Language;
  languageTo: Language;
  categories: Category[];
}

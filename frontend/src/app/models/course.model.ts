import { Category } from './category.model';

export interface Course {
  id?: string;
  title: string;
  author: string;
  description?: string;
  from: string;
  to: string;
  categories: Category[];
}

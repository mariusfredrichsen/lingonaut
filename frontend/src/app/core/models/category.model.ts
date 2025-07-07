import { Term } from './term.model';

export interface Category {
  _id?: string;
  title: string;
  description?: string;
  terms: Term[];
}

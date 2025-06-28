import { Term } from './term.model';

export interface Category {
  id?: string;
  title: string;
  description?: string;
  terms: Term[];
}

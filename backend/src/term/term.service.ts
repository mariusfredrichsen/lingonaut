import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Term, TermDocument } from './schemas/term.schema';
import { Model } from 'mongoose';

@Injectable()
export class TermService {
  constructor(
    @InjectModel(Term.name) private courseModel: Model<TermDocument>,
  ) {}

  async findAll(): Promise<Term[]> {
    return this.courseModel.find();
  }

  create(term: Term): Promise<Term> {
    const created = new this.courseModel(term);
    return created.save();
  }
}

import { Controller, Post, Body, Get } from '@nestjs/common';
import { TermService } from './term.service';
import { Term } from './schemas/term.schema';

@Controller('term')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  create(@Body() term: Term) {
    return this.termService.create(term);
  }

  @Get()
  findAll() {
    return this.termService.findAll();
  }
}

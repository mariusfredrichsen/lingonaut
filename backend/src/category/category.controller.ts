import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body() category: Category) {
    return this.categoryService.create(category);
  }

  @Delete(':id')
  async delete(@Body('id') id: string) {
    return this.categoryService.delete(id);
  }
}

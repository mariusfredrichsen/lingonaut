import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { TermModule } from './term/term.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/lingonaut-app'), TermModule, CategoryModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

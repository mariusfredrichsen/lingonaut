import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../core/services/course-service/course-service';
import { Course } from '../../core/models/course.model';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Category } from '../../core/models/category.model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-page',
  imports: [
    DividerModule,
    CommonModule,
    CardModule,
    DividerModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './course-page.html',
  styleUrl: './course-page.scss',
  standalone: true,
})
export class CoursePage {
  courseId: string = '';
  course: Course | undefined;
  selectedCategory: Category | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourse();
  }

  private loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (data) => {
        console.log('[Loaded Course]', data);
        this.course = data;
      },
      error: (err) => console.error('Error loading course', err),
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    console.log(category);
  }
}

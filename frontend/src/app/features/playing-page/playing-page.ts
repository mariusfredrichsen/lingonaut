import { Component } from '@angular/core';
import { Course } from '../../core/models/course.model';
import { Category } from '../../core/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../core/services/course-service/course-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playing-page',
  imports: [ButtonModule, CardModule, CommonModule],
  templateUrl: './playing-page.html',
  styleUrl: './playing-page.scss',
})
export class PlayingPage {
  courseId: string = '';
  categoryId: string = '';
  course: Course | undefined;
  category: Category | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const ids = this.route.snapshot.url.map((segment) => segment.path);
    // Assuming the URL is like /url/:courseId/:categoryId
    console.log('ids', ids);
    const [_, courseId, categoryId] = ids;
    this.categoryId = categoryId;
    this.courseId = courseId;
    this.loadCourseAndCategory();
  }

  private loadCourseAndCategory(): void {
    console.log('ASDASD');
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (data) => {
        this.course = data;
        this.category = this.course?.categories?.find(
          (c) => c._id == this.categoryId
        );
        console.log('[ASD]', this.category);
      },
      error: (err) => console.error('Error loading asd', err),
    });
  }

  navigateBackToCourse(): void {
    this.router.navigate(['course', this.courseId]);
  }
}

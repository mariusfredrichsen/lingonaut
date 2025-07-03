import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Course } from '../../../../core/models/course.model';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [ButtonModule, DividerModule, CardModule, CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCardComponent {
  @Input() course!: Course;

  constructor(private router: Router) {}

  navigateToCourse(): void {
    console.log(this.course._id);
    this.router.navigate(['/course', this.course._id]);
  }
}

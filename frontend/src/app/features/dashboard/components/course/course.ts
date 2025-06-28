import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course',
  imports: [CardModule, CommonModule],
  templateUrl: './course.html',
  styleUrl: './course.scss',
})
export class CourseComponent {
  @Input() course!: Course;
}

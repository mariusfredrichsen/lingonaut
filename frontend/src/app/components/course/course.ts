import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  imports: [CardModule, CommonModule],
  templateUrl: './course.html',
  styleUrl: './course.scss',
})
export class CourseComponent {
  @Input() course!: Course;
}

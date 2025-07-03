import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseList } from './components/course-list/course-list';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Course } from '../../core/models/course.model';
import { CourseService } from '../../core/services/course-service/course-service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CourseList, DividerModule, CardModule, ButtonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  courses: Course[] = [];
  private routerSub!: Subscription;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log('[Loaded Courses]', data);
        this.courses = data;
      },
      error: (err) => console.error('Error loading courses', err),
    });
  }
}

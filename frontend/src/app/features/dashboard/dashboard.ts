import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseList } from './components/course-list/course-list';
import { CourseService } from './components/course/course.service';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CourseList, DividerModule, CardModule, ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardPage implements OnInit, OnDestroy {
  courses: Course[] = [];
  private routerSub!: Subscription;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.loadCourses();
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
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

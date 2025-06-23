import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseList } from '../../components/course-list/course-list';
import { Course } from '../../models/course.model';
import { CourseService } from '../../components/course/course.service';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseList, DividerModule, CardModule, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  courses: Course[] = [];
  private routerSub!: Subscription;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(event);
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

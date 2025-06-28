import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../course/course';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CourseService } from '../course/course.service';
import { filter, Subscription } from 'rxjs';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [CourseComponent, CommonModule, CardModule, ButtonModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.scss'],
  standalone: true,
})
export class CourseList {
  @Input()
  courses!: Course[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToCreate(): void {
    this.router.navigate(['create'], {
      relativeTo: this.route,
    });
  }
}

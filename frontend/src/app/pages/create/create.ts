import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { CreateCategory } from '../../components/create-category/create-category';
import { Select } from 'primeng/select';
import { ReactiveFormsModule } from '@angular/forms';
import languages from '../../assets/languages.json';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';

interface Language {
  name: string;
}

@Component({
  selector: 'app-create',
  imports: [
    CommonModule,
    DividerModule,
    FloatLabelModule,
    FormsModule,
    CreateCategory,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
  standalone: true,
})
export class Create {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      language1: ['', Validators.required],
      language2: ['', Validators.required],
      categories: this.fb.array([]),
    });
  }

  get categories(): FormArray<FormGroup> {
    return this.courseForm.get('categories') as FormArray;
  }

  addCategory(): void {
    const category = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      terms: this.fb.array([]),
    });
    this.categories.push(category);
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  submit(): void {
    if (this.courseForm.valid) {
      console.log('Course Created:', this.courseForm.value);
      // You could emit an event or call a service here
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}

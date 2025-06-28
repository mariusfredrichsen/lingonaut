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
import { CreateCategory } from './components/create-category/create-category';
import { Select, SelectModule } from 'primeng/select';
import { ReactiveFormsModule } from '@angular/forms';
import languages from '../../assets/languages.json';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from './create.service';
import { DropdownModule } from 'primeng/dropdown';

interface Language {
  name: string;
}

@Component({
  selector: 'app-create-page',
  imports: [
    CommonModule,
    DividerModule,
    FloatLabelModule,
    FormsModule,
    CreateCategory,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectModule,
    DropdownModule,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
  standalone: true,
})
export class CreatePage {
  languages: Language[] = languages;
  selectedLanguageFrom: string | undefined;
  selectedLanguageTo: string | undefined;
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private createService: CreateService) {
    const term = this.fb.group({
      termFrom: ['', Validators.required],
      termTo: ['', Validators.required],
      notes: [''],
    });

    const category = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      terms: this.fb.array([term]),
    });

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      author: ['RobertDoberts'],
      languageFrom: ['', Validators.required],
      languageTo: ['', Validators.required],
      categories: this.fb.array([category]),
    });
    console.log(languages);
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
      this.createService.createCourse(this.courseForm.value).subscribe({
        next: (res) => console.log('Course created:', res),
        error: (err) => console.error('Error: ', err),
      });
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  swapLanguage(): void {
    const from = this.courseForm.get('languageFrom')?.value ?? undefined;
    const to = this.courseForm.get('languageTo')?.value ?? undefined;
    console.log('from', from);
    console.log('to', to);
    this.courseForm.patchValue({
      languageFrom: to,
      languageTo: from,
    });
  }
}

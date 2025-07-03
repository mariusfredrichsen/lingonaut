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
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CreateCategory } from './components/create-category/create-category';
import { SelectModule } from 'primeng/select';
import languages from '../../assets/languages.json';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CreateService } from './create-page.service';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

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
  templateUrl: './create-page.html',
  styleUrl: './create-page.scss',
  standalone: true,
})
export class CreatePage {
  languages: Language[] = languages;
  selectedLanguageFrom: Language | undefined;
  selectedLanguageTo: Language | undefined;
  courseForm: FormGroup;

  languageValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    console.log(value);

    if (
      !value ||
      typeof value !== 'object' ||
      typeof value.name !== 'string' ||
      typeof value.originCountryCode !== 'string'
    ) {
      return { invalidLanguageObject: true };
    }
    return null;
  }

  constructor(
    private fb: FormBuilder,
    private createService: CreateService,
    private router: Router
  ) {
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
      languageFrom: [
        null,
        [Validators.required, this.languageValidator.bind(this)],
      ],
      languageTo: [
        null,
        [Validators.required, this.languageValidator.bind(this)],
      ],
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
        next: (res) => {
          console.log('Course created:', res);
          this.router.navigate(['/']);
        },
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

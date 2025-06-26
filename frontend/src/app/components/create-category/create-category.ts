import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Term } from '../../models/term.model';
import { CommonModule } from '@angular/common';
import { CreateTerm } from '../create-term/create-term';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-category',
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    CardModule,
    CreateTerm,
    ReactiveFormsModule,
  ],
  templateUrl: './create-category.html',
  styleUrl: './create-category.scss',
})
export class CreateCategory {
  @Input() form!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get terms(): FormArray {
    return this.form.get('terms') as FormArray;
  }

  addTerm(): void {
    const term = this.fb.group({
      source: ['', Validators.required],
      target: ['', Validators.required],
      notes: [''],
    });
    this.terms.push(term);
  }

  removeTerm(index: number): void {
    this.terms.removeAt(index);
  }
}

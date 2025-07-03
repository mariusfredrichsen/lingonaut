import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-create-term',
  imports: [
    CardModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-term.html',
  styleUrl: './create-term.scss',
})
export class CreateTerm {
  @Input() form!: FormGroup;
  @Output() remove = new EventEmitter<void>();
}

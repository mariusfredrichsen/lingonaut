import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTerm } from './create-term';

describe('CreateTerm', () => {
  let component: CreateTerm;
  let fixture: ComponentFixture<CreateTerm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTerm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTerm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

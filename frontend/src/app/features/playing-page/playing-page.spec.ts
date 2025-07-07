import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingPage } from './playing-page';

describe('PlayingPage', () => {
  let component: PlayingPage;
  let fixture: ComponentFixture<PlayingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaInputComponent } from './formula-input.component';

describe('FormulaInputComponent', () => {
  let component: FormulaInputComponent;
  let fixture: ComponentFixture<FormulaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

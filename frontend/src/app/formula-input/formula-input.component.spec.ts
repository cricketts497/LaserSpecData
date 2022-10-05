import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FormulaInputComponent } from './formula-input.component';
import { FormulaInputTestSupport } from './formula-input.support';

describe('FormulaInputComponent', () => {
  let component: FormulaInputComponent;
  let fixture: ComponentFixture<FormulaInputComponent>;
  let support: FormulaInputTestSupport;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaInputComponent ],
      imports: [
        MatAutocompleteModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    support = new FormulaInputTestSupport(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be labelled correctly', () => {
    expect(support.getLabel()).toEqual('Formula');
  })

  describe('validation errors, ', () => {
    it('should show an error when the input field is empty', () => {
      expect(support.getError()).toEqual('Formula is required');
    });

    it('should not show an error when formula input is valid', () => {
      component.formulaControl.setErrors(null);
      fixture.detectChanges();

      expect(support.getError()).toBeNull();
    });

    it('should show the correct error when a invalid formula error is raised', async () => {
      component.formulaControl.setErrors({pattern: true});
      fixture.detectChanges();
      
      expect(support.getError()).toEqual('Invalid formula');
    });
  });
});

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss']
})
export class FormulaInputComponent implements OnInit {
  formulaControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.formulaControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    return this.options.filter(option => option.includes(value));
  }
}

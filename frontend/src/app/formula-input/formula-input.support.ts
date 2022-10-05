import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormulaInputComponent } from "./formula-input.component";

export class FormulaInputTestSupport {
  constructor(private fixture: ComponentFixture<FormulaInputComponent>) {}

  public getLabel(): string | null {
    const element = this.fixture.debugElement.query(By.css('#lsd-id-formula-input-label'));
    if (!element) {
      return null;
    }
    return element.nativeElement.innerHTML;
  }
  
  public getError(): string | null {
    const element = this.fixture.debugElement.query(By.css('#lsd-id-formula-input-error'));
    if (!element) {
      return null;
    }
    return element.nativeElement.innerHTML;
  }
}
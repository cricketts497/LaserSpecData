import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let loader: HarnessLoader;
  let table: MatTableHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ DataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for a table', async () => {
    const tables = await loader.getAllHarnesses(MatTableHarness);
    
    expect(tables.length).toBe(1);
  });

  describe('table tests', () => {
    beforeEach(async () => {
      table = await loader.getHarness(MatTableHarness);
    });

    it('should have the correct headers', async () => {
      const headers = await table.getHeaderRows();
  
      expect(headers.length).toBe(1);
      
      const headerCells = await headers[0].getCells();
      const headerCellTexts = await parallel(() => headerCells.map(cell => cell.getText()));
      
      expect(headerCellTexts).toEqual(['Symbol', 'Z', 'N', 'J\u03c0', '\u03bc', 'Q']);
    });
    
    it('should be empty by default', async () => {
      const rows = await table.getRows();
      
      expect(rows.length).toBe(0);
    });

    it('updates when a row is added', async () => {
      component.dataSource.addRow({'symbol':'In', 'z':'49', 'n':'66', 'jp':'9/2+', 'magnetic_dipole':'1.234(5)', 'electric_quadrupole':'0.123(4)'});
      fixture.detectChanges();

      const rows = await table.getRows();
      expect(rows.length).toBe(1);

      const rowCells = await rows[0].getCells();
      const rowCellTexts = await parallel(() => rowCells.map(cell => cell.getText()));
      expect(rowCellTexts).toEqual(['In', '49', '66', '9/2+', '1.234(5)', '0.123(4)']);
    });
  });


});

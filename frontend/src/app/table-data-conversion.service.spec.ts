import { TestBed } from '@angular/core/testing';
import { DataRow } from './data-table/data-model';

import { TableDataConversionService } from './table-data-conversion.service';

describe('TableDataConversionService', () => {
  let dataRow: DataRow;
  let service: TableDataConversionService;

  beforeEach(() => {
    dataRow = {z:'', n:'', symbol:'SYMBOL', jp:'JP', magnetic_dipole:'', unc_md:'', electric_quadrupole:'', unc_eq:''};

    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pass symbol and jp through', () => {
    const tableRow = service.getDataTableRow(dataRow);

    expect(tableRow.symbol).toBe('SYMBOL');
    expect(tableRow.jp).toBe('JP');
  });

  describe('z data types', () => {
    it('should pass empty value', () => {
      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.z).toBe('');
    });

    it('should replace invalid values with an empty string', () => {
      const invalids: string[] = ['cdahbca', '0', '-12', '@13'];

      invalids.forEach((invalid: string) => {
        dataRow.z = invalid;

        const tableRow = service.getDataTableRow(dataRow);
  
        expect(tableRow.z).toBe('');
      });
    });

    it('should pass valid value', () => {
      dataRow.z = '49';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.z).toBe('49');
    });

    it('should round non-integer values', () => {
      dataRow.z = '59.6';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.z).toBe('60');
    });
  });

  describe('n data types', () => {
    it('should pass empty value', () => {
      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.n).toBe('');
    });

    it('should replace invalid values with an empty string', () => {
      const invalids: string[] = ['cdahbca', '0', '-12', '@13'];

      invalids.forEach((invalid: string) => {
        dataRow.n = invalid;

        const tableRow = service.getDataTableRow(dataRow);
  
        expect(tableRow.n).toBe('');
      });
    });

    it('should pass valid value', () => {
      dataRow.n = '66';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.n).toBe('66');
    });

    it('should round non-integer values', () => {
      dataRow.n = '76.3';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.n).toBe('76');
    });
  });

  describe('electric quadrupole data types', () => {
    it('should pass missing electric quadrupole', () => {
      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.electric_quadrupole).toBe('');
    });
    
    it('should pass missing electric quadrupole even when error defined', () => {
      dataRow.unc_eq = '2';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.electric_quadrupole).toBe('');
    });

    it('should pass the value when error is missing', () => {
      dataRow.electric_quadrupole = '0.123';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.electric_quadrupole).toBe('0.123');
    });

    it('should combine the value with the error when both are present', () => {
      dataRow.electric_quadrupole = '0.123';
      dataRow.unc_eq = '2';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.electric_quadrupole).toBe('0.123(2)');
    });
  });

  describe('magnetic dipole data types', () => {
    it('should pass missing magnetic dipole', () => {
      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.magnetic_dipole).toBe('');
    });
    
    it('should pass missing magnetic dipole even when error defined', () => {
      dataRow.unc_md = '3';
      
      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.magnetic_dipole).toBe('');
    });

    it('should pass the value when error is missing', () => {
      dataRow.magnetic_dipole = '1.234';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.magnetic_dipole).toBe('1.234');
    });

    it('should combine the value with the error when both are present', () => {
      dataRow.magnetic_dipole = '1.234';
      dataRow.unc_md = '3';

      const tableRow = service.getDataTableRow(dataRow);

      expect(tableRow.magnetic_dipole).toBe('1.234(3)');
    });
  });
});

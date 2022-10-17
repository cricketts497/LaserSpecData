import { Injectable } from '@angular/core';
import { DataRow, DataTableRow } from './data-table/data-model';


@Injectable({
  providedIn: 'root'
})
export class TableDataConversionService {

  getDataTableRow(dataRow: DataRow): DataTableRow {
    const row: DataTableRow = {symbol:dataRow.symbol, jp:dataRow.jp, z:'', n:'', electric_quadrupole:'', magnetic_dipole:''};

    row.z = this.checkNumber(dataRow.z);
    row.n = this.checkNumber(dataRow.n);
    row.electric_quadrupole = this.getValueUnc(dataRow.electric_quadrupole, dataRow.unc_eq);
    row.magnetic_dipole = this.getValueUnc(dataRow.magnetic_dipole, dataRow.unc_md);

    return row;
  }

  private checkNumber(num_string: string): string {
    const num: number = Number(num_string);

    if (isNaN(num) || num <= 0) {
      return '';
    }

    return num.toFixed(0);
  }
  
  private getValueUnc(value: string, unc: string): string {
    if (value === '') {
      return '';
    }

    if (unc === '') {
      return value;
    }

    return `${value}(${unc})`;
  }
}

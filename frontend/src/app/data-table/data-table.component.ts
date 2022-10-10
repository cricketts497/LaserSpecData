import { Component } from '@angular/core';
import { DataTableRow } from './data-model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  displayedColumns: string[] = ['symbol', 'z', 'n', 'jp', 'magnetic_dipole', 'electric_quadrupole']
  dataSource: DataTableRow[] = [
    {z:49, n:66, symbol:'In', jp:'9/2+', magnetic_dipole:'4.123(3)', electric_quadrupole:'2.323'},
    {z:50, n:66, symbol:'Sn', jp:'5+', magnetic_dipole:'5.234', electric_quadrupole:'0.123(1)'}
  ];
}

import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { DataTableRow } from './data-model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  displayedColumns: string[] = ['symbol', 'z', 'n', 'jp', 'magnetic_dipole', 'electric_quadrupole']
  dataSource = new DataTableSource();

  constructor() {
    this.dataSource.addRow({z:49, n:66, symbol:'In', jp:'9/2+', magnetic_dipole:'4.123(3)', electric_quadrupole:'2.323'});
    this.dataSource.addRow({z:50, n:66, symbol:'Sn', jp:'5+', magnetic_dipole:'5.234', electric_quadrupole:'0.123(1)'});
  }
}

class DataTableSource extends DataSource<DataTableRow> {
  private dataStream = new ReplaySubject<DataTableRow[]>;
  private dataTableRows: DataTableRow[];

  constructor(initialRows: DataTableRow[] = []) {
    super();
    this.dataTableRows = initialRows;
    this.update();
  }

  connect(): Observable<DataTableRow[]> {
    return this.dataStream;
  }

  disconnect() {}

  addRow(row: DataTableRow): void {
    this.dataTableRows.push(row);
    this.update();
  }

  private update() {
    this.dataStream.next(this.dataTableRows);
  }
}
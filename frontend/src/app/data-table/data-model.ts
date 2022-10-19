export interface DataTableRow {
  symbol: string;
  z: string;
  n: string;
  jp: string;
  magnetic_dipole: string;
  electric_quadrupole: string;
}

export interface DataRow {
  symbol: string;
  z: string;
  n: string;
  jp: string;
  magnetic_dipole: string;
  unc_md: string;
  electric_quadrupole: string;
  unc_eq: string;
}

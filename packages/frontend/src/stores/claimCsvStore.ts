import { makeAutoObservable } from "mobx";
import { CsvClaimSchema } from "lib/schemas/claims";
import { CsvClaimType } from "lib/types/claims";
import { Field } from "lib/enums/csv-claims";

export type RowType = CsvClaimType & {
  valid: boolean;
  error: string[];
};

class Store {
  file: File | null = null;
  bodyRows: RowType[] = [];
  selectedRows: RowType[] = [];
  submiting = false;
  headCols = [];

  constructor() {
    makeAutoObservable(this);
  }

  setFile(file) {
    this.file = file;
  }

  setCols(cols) {
    this.headCols = cols;
  }

  setSubmiting(submiting) {
    this.submiting = submiting;
  }

  validateRows(rows) {
    return rows.map((row) => {
      const parsed = CsvClaimSchema.safeParse(row);
      return {
        ...row,
        valid: parsed.success,
        error: parsed?.error?.issues?.map((i) => i.message) || [],
      };
    });
  }

  setRows(rows) {
    const invalidRowsFirst = this.validateRows(rows).sort((a, b) => (a.valid === b.valid ? 0 : a.valid ? 1 : -1));
    this.bodyRows = invalidRowsFirst;
  }

  revalidateRows() {
    this.bodyRows = this.validateRows(this.bodyRows);
  }

  setSelectedRows(rows) {
    this.selectedRows = rows;
  }

  deleteRow(claimId: number) {
    this.bodyRows = this.bodyRows.filter((i) => i[Field.ClaimID] !== claimId);
  }

  clear() {
    this.file = null;
    this.bodyRows = [];
    this.headCols = [];
    this.selectedRows = [];
  }

  get rows() {
    return this.bodyRows;
  }

  get cols() {
    return this.headCols;
  }

  get selected() {
    return this.selectedRows;
  }

  get allSelectedAreValid() {
    if (!this.selectedRows.length) {
      return false;
    }
    return this.selectedRows.every((row) => row.valid);
  }
}

const store = new Store();

export default store;

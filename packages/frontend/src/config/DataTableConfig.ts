import { RowClassRules } from "ag-grid-community";
import { ClaimStatus, ClaimType, DivisionID, DivisionName, Field, GroupID, GroupName, MemberGender, PaymentStatus, PlaceOfService, Plan, PlanID } from "lib/enums/csv-claims";

export const DefaultColDef = {
  editable: true,
  sortable: true,
  filter: false,
};

export function GridOptions(rowSelection: "single" | "multiple") {
  return {
    rowSelection: rowSelection,
    pagination: true,
    paginationPageSize: 100,
  };
}

export function BaseClassRules(): RowClassRules {
  return {
    "bg-red-200": (params) => !params.data.valid,
  };
}

export const SelectableColumn = {
  headerCheckboxSelection: true,
  checkboxSelection: true,
  width: 50,
  sortable: false,
  filter: false,
};

export function ColumnField(field) {
  const base = {
    field,
    headerName: field,
  };

  if (field === Field.ClaimStatus) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(ClaimStatus) as [string, ...string[]],
      },
    };
  }

  if (field === Field.PaymentStatus) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(PaymentStatus) as [string, ...string[]],
      },
    };
  }

  if (field === Field.GroupName) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(GroupName) as [string, ...string[]],
      },
    };
  }

  if (field === Field.GroupID) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(GroupID) as [string, ...string[]],
      },
    };
  }

  if (field === Field.DivisionName) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(DivisionName) as [string, ...string[]],
      },
    };
  }

  if (field === Field.DivisionID) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(DivisionID) as [string, ...string[]],
      },
    };
  }

  if (field === Field.Plan) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(Plan) as [string, ...string[]],
      },
    };
  }

  if (field === Field.PlanID) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(PlanID) as [string, ...string[]],
      },
    };
  }

  if (field === Field.PlaceOfService) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(PlaceOfService) as [string, ...string[]],
      },
    };
  }

  if (field === Field.ClaimType) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(ClaimType) as [string, ...string[]],
      },
    };
  }

  if (field === Field.MemberGender) {
    return {
      ...base,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.values(MemberGender) as [string, ...string[]],
      },
    };
  }

  return base;
}

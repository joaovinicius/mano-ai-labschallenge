import { AgGridReact, AgGridReactProps, CustomCellRendererProps } from "ag-grid-react";
import { Button } from "@mantine/core";
import { observer } from "mobx-react-lite";
import store from "~/stores/claimCsvStore";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useMemo } from "react";
import { RowClassRules } from "ag-grid-community";
import { SelectableColumn, ColumnField, DefaultColDef, GridOptions, BaseClassRules } from "~/config/DataTableConfig";

const Valid = (props: CustomCellRendererProps) => {
  if (!props.value.length) {
    return <span className="text-green-600 bg-green-300 rounded-full p-2 py-1 inline-block">Valid</span>;
  }

  return (
    <ul className="text-red-600 pl-6 py-1 list-disc">
      {props.value.map((item, index) => (
        <li key={`error-index-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const Action = (props: CustomCellRendererProps) => {
  return (
    <Button
      onClick={() => {
        store.deleteRow(props.value);
      }}
    >
      Delete
    </Button>
  );
};

const CsvDataTable = () => {
  const table = {
    columnDefs: [
      SelectableColumn,
      {
        headerName: "Validation",
        field: "error",
        editable: false,
        cellClass: "whitespace-normal leading-4 flex items-center",
        autoHeight: true,
        cellRenderer: Valid,
      },
      {
        headerName: "Actions",
        field: "Claim ID",
        cellRenderer: Action,
      },
      ...store.cols.map(ColumnField),
    ],
    rowData: store.rows,
  };

  const rowClassRules = useMemo<RowClassRules>(BaseClassRules, []);

  useEffect(() => {
    store.setSelectedRows([]);
  }, []);

  if (!store.file && !store.cols.length) return null;

  return (
    <div className="ag-theme-alpine grow h-full">
      <AgGridReact
        rowData={table.rowData}
        columnDefs={table.columnDefs}
        defaultColDef={DefaultColDef}
        pagination={true}
        gridOptions={GridOptions("multiple") as AgGridReactProps}
        rowClassRules={rowClassRules}
        onCellValueChanged={() => store.revalidateRows()}
        onSelectionChanged={(data) => {
          store.setSelectedRows(data.api.getSelectedRows());
        }}
      />
    </div>
  );
};

const CsvDataTableObserver = observer(CsvDataTable);

export default CsvDataTableObserver;

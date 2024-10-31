import { FileInput } from "@mantine/core";
import Papa from "papaparse";
import { observer } from "mobx-react-lite";
import store from "~/stores/claimCsvStore";

const CsvFileInput = ({ ref }: { ref?: React.ForwardedRef<HTMLButtonElement> }) => {
  const handleFileChange = (file: File | null) => {
    store.setFile(file);
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        worker: true,
        skipEmptyLines: true,
        complete: function (results) {
          store.setRows(results.data);
          if (results.meta.fields) {
            store.setCols(results.meta.fields);
          }
        },
      });
    } else {
      store.clear();
    }
  };

  return <FileInput ref={ref} className="py-2" placeholder="Upload CSV" accept=".csv" value={store.file} onChange={handleFileChange} clearable />;
};

const CsvFileInputObserver = observer(CsvFileInput);

export default CsvFileInputObserver;

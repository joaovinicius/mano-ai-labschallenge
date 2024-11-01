import CsvDataTable from "~/components/CSVUpload/CsvDataTable";
import CsvFileInput from "~/components/CSVUpload/CsvFileInput";
import CsvSubmitButton from "~/components/CSVUpload/CsvSubmitButton";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useEffect } from "react";
import store from "~/stores/claimCsvStore";
import { observer } from "mobx-react-lite";

function CsvModal() {
  const [opened, { open, close }] = useDisclosure(false);

  function handleClose() {
    store.clear();
    close();
  }

  useEffect(() => {
    if (store.file) {
      open();
    }
  }, [store.file]);

  return (
    <>
      <Modal.Root fullScreen opened={opened} onClose={handleClose} radius={0} transitionProps={{ transition: "fade", duration: 200 }}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <CsvSubmitButton onSuccess={() => {
                close();
              }} />
              <span className="mx-4">Selected rows ({store.selected.length})</span>
              {store.selected.length > 0 && !store.allSelectedAreValid && <span className="text-xs text-red-700">Sorry, some rows are invalid</span>}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <CsvDataTable />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <CsvFileInput />
    </>
  );
}
const CsvModalObserver = observer(CsvModal);

export default CsvModalObserver;

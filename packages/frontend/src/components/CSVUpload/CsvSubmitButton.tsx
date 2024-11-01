import { Button } from "@mantine/core";
import store from "~/stores/claimCsvStore";
import { observer } from "mobx-react-lite";
import { postCsvClaims } from "~/services/csvClaimsService";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";

const CsvSubmitButton = ({ onSuccess }: { onSuccess: () => void}) => {
  function handleSubmit() {
    if (!store.allSelectedAreValid) {
      notifications.show({
        title: "Sorry, some rows are invalid",
        message: "Please fix the errors before submitting or remove the invalid rows",
        color: "red",
      });
      return;
    }

    store.setSubmiting(true);
    postCsvClaims(store.selected)
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Claims submitted successfully",
          color: "green",
        });
        store.clear();
        onSuccess()
      })
      .catch((e) => {
        notifications.show({
          title: "Error",
          message: e.message,
          color: "red",
        });
      })
      .finally(() => {
        store.setSubmiting(false);
      });
  }

  return (
    <>
      {store.submiting ? (
        <Loader />
      ) : (
        <Button variant="primary" onClick={handleSubmit} disabled={!store.selected.length}>
          Submit
        </Button>
      )}
    </>
  );
};
const CsvSubmitButtonObserver = observer(CsvSubmitButton);

export default CsvSubmitButtonObserver;

import store from "~/stores/claimStore";
import { observer } from "mobx-react-lite";
import { ClaimListItem } from "./ClaimListItem";
import { useDisclosure } from '@mantine/hooks';
import { Modal, ScrollArea, Box } from '@mantine/core';
import { useState } from "react";
import { ClaimDetails } from "~/components/Claims/ClaimDetails";
import { fromTimestamp } from "~/utils/helpers";
import { deleteClaim, updateClaim } from "~/services/claimsService";
import { notifications } from "@mantine/notifications";

export function ClaimList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<string>('');
  const claims = store.claims.map((claim) => {
    const [name] = claim.split('.');
    const [userId, claimId, createdAt] = name.split('_');
    return {
      userId,
      claimId,
      createdAt: fromTimestamp(createdAt),
      fileName: claim
    };
  });

  function handleClickedClaim(fileName: string) {
    setSelected(fileName);
    open();
  }

  function handleUpdate(json: string) {
    if (!store.editable) return;
    updateClaim(selected, json).then(() => {
      notifications.show({
        title: "Success",
        message: "Claim update successfully",
        color: "green",
      });
    }).catch((error) => {
      console.error(error);
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }).finally(() => {
      setSelected('');
      close();
    });
  }

  function handleRemove() {
    if (!store.removable) return;
    deleteClaim(selected).then(() => {
      store.removeClaim(selected);
      notifications.show({
        title: "Success",
        message: "Claim removed successfully",
        color: "green",
      });
    }).catch((error) => {
      console.error(error);
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }).finally(() => {
      setSelected('');
      close();
    });
  }

  function handleClose() {
    setSelected('');
    close();
  }

  return (
    <>
      <ScrollArea>
        <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {claims.map((claim, index) => (
            <ClaimListItem
              key={`claim-item-${index}`}
              userId={claim.userId}
              claimId={claim.claimId}
              createdAt={claim.createdAt}
              onClick={() => {
                handleClickedClaim(claim.fileName);
              }}
            />
          ))}
        </Box>
      </ScrollArea>
      <Modal opened={opened} onClose={handleClose} title="Claim" >
        <ClaimDetails
          fileName={selected}
          editable={store.editable}
          removable={store.removable}
          onClickRemove={handleRemove}
          onClickUpdate={handleUpdate}
        />
      </Modal>
    </>
  );
}

const ClaimListObserver = observer(ClaimList);

export default ClaimListObserver;

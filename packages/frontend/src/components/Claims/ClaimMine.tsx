import store from "~/stores/claimStore";
import { observer } from "mobx-react-lite";
import { getMyClaims } from "~/services/claimsService";
import { useEffect } from "react";
import { ClaimTitle } from "~/components/Claims/ClaimTitle";

export function ClaimIndex() {
  useEffect(() => {
    store.clear();
    getMyClaims()
      .then((response) => {
        store.setEditable(true);
        store.setRemovable(true);
        store.setClaims(response.data);
      })
  }, []);

  return (
    <ClaimTitle title="My Claims" />
  );
}

const ClaimIndexObserver = observer(ClaimIndex);

export default ClaimIndexObserver;

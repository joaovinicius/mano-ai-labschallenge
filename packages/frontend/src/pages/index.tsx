import ClaimList from "~/components/Claims/ClaimList";
import ClaimSearchInput from "~/components/Claims/ClaimSearchInput";
import { ClaimTitle } from "~/components/Claims/ClaimTitle";

export default function Page() {

  return (
    <>
      <ClaimTitle title="Claims">
        <ClaimSearchInput />
      </ClaimTitle>
      <ClaimList />
    </>
  );
}

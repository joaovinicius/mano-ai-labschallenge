import { RowType } from "~/stores/claimCsvStore";
import { fetchApi } from "~/utils/fetchApi";

export function postCsvClaims(rows: RowType[]): Promise<void> {
  return fetchApi("/claims", { method: "POST", body: rows });
}

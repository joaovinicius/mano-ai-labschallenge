import { fetchApi } from "~/utils/fetchApi";


export function getSearchClaims(search: string): Promise<{ data: string[] }> {
  return fetchApi(`/claims?q=${search}`);
}

export function getMyClaims(): Promise<{ data: string[] }> {
  return fetchApi("/claims/mine");
}

export function getClaim(fileName: string): Promise<{ data: string }> {
  return fetchApi(`/claims/${fileName}`);
}

export function deleteClaim(fileName: string): Promise<{ data: string }> {
  return fetchApi(`/claims/${fileName}`, { method: "DELETE" });
}

export function updateClaim(fileName: string, json: string): Promise<{ data: string }> {
  return fetchApi(`/claims/${fileName}`, { method: "PUT", body: json });
}
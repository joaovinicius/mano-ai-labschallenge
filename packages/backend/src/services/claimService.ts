import type { CsvClaimType } from "lib/types/claims";
import { ClaimLocalFilesRepository } from "~/repositories/ClaimLocalFilesRepository";
import { DataMapperFromCsvClaimToJsonClaim } from "~/adapters/DataMapperFromCsvClaimToJsonClaim";

const respository = new ClaimLocalFilesRepository();

export const listClaims = async () => {
  try {
    return await respository.list();
  } catch (error) {
    console.error("Repository list claims:", error);
    throw error;
  }
}

export const searchClaims = async (search: string) => {
  try {
    return await respository.search(search);
  } catch (error) {
    console.error("Repository search claims:", error);
    throw error;
  }
}

export const getClaimByFileName = async (fileName: string) => {
  try {
    return await respository.find(fileName);
  } catch (error) {
    console.error("Repository get claim by id:", error);
    throw error;
  }
};

export const listClaimsByUserId = async (userId: number) => {
  try {
    return await respository.listByUserId(userId);
  } catch (error) {
    console.error("Repository list claims by userId:", error);
    throw error;
  }
};

export const createClaims = async (userId: number, claims: CsvClaimType[]) => {
  try {
    const now = new Date().getTime();
    respository.resetFiles();
    claims.forEach((claim) => {
      const jsonClaim = DataMapperFromCsvClaimToJsonClaim.convert(claim);
      const fileName = `${userId}_${claim["Claim ID"]}_${now}`;
      respository.addFile(fileName, JSON.stringify(jsonClaim));
    });
    return await respository.save();
  } catch (error) {
    console.error("Repository save user claims:", error);
    throw error;
  }
};

export const updateFileContent = async (fileName: string, json: string) => {
  try {
    return await respository.update(fileName, json);
  } catch (error) {
    console.error("Repository delete claim by fileName:", error);
    throw error;
  }
}

export const deleteMyFileName = async (fileName: string) => {
  try {
    return await respository.delete(fileName);
  } catch (error) {
    console.error("Repository delete claim by fileName:", error);
    throw error;
  }
}

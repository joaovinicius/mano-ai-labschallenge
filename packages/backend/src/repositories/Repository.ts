import type { UserType } from "lib/types/auth";

export interface IClaimRepository {
  list(): Promise<string[]>;
  save(): Promise<boolean>;
  find(id: string): Promise<string>;
  delete(id: string): Promise<boolean>;
  update(id: string, content: string): Promise<boolean>;
  listByUserId(userId: number): Promise<string[]>;
  search(term: string): Promise<string[]>;
}

export interface IAuthRepository {
  getUserByEmail(email: string): Promise<UserType | undefined>;
}

import type { UserType } from "lib/types/auth";
import type { IAuthRepository } from "~/repositories/Repository";

// Example hash for 'password123'
const hash = "$2b$10$aawWcqy5idjh2jqAcGk6FeM/Fb.0iQbTnyQ54jMpwXRqN/w/LKRBS";

const users: UserType[] = [
  {
    id: 1,
    email: "email@email.com",
    password: hash,
  },
];

export class AuthHardCodedRepository implements IAuthRepository {
  async getUserByEmail(email: string): Promise<UserType | undefined> {
    return new Promise((resolve) => {
      const user = users.find((u) => u.email === email);
      resolve(user);
    });
  }
}

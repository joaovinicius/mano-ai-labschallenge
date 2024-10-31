import type { UserType } from "lib/types/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthHardCodedRepository } from "~/repositories/AuthHardCodedRepository";

const authRespository = new AuthHardCodedRepository();

export const getUserByEmail = async (email: string): Promise<UserType | undefined> => {
  try {
    return authRespository.getUserByEmail(email);
  } catch (error) {
    console.error("Error get user by email:", error);
    throw error;
  }
};

export const validatePassword = async (password: string, userPasword: string) => {
  try {
    return await bcrypt.compare(password, userPasword);
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};

export const generateToken = async (user: UserType, secretKey: string) => {
  try {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("Error generate token:", error);
    throw error;
  }
};

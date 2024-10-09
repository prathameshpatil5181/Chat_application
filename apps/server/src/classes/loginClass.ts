import Prisma from "../Models/Prisma";
import { Encryption } from "./BcryptClass";

export class loginClass {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async login() {
    try {
      const user = await Prisma.userCredentials.findUnique({
        where: {
          emailId: this.email,
        },
      });

      if (!user) {
        return false;
      }

      const validateResult =  await Encryption.validateHash(this.password,user.password)

      if (!validateResult) {
        return false;
      }

      const token = await Encryption.generateJwt(user.emailId, user.name,user.id);
      
      return token;
    } catch (error) {
      throw error;
    }
  }
}

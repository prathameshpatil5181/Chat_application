import { Encryption } from "../classes/BcryptClass";
import Prisma from "./Prisma";

const jwt = require("jsonwebtoken");
export class authclass {
  private email: string;
  private password: string;
  private name: string;

  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  async signUpUser(): Promise<string | boolean> {
    const validation: string | boolean = this.validate();
    if (validation != true) return validation;

    //if user already exits here
    try {
      const user = await Prisma.userCredentials.findUnique({
        where: {
          emailId: this.email,
        },
      });

      if (!user) {
        const hashedPassword = new Encryption(this.password);

        await Prisma.userCredentials.create({
          data: {
            emailId: this.email,
            password: hashedPassword.get(),
            name: this.name,
          },
        });
        return Encryption.generateJwt(this.email, this.name);
      } else {
        return "user already exist";
      }
      // console.log(user);
    } catch (error) {
      throw error;
    }
  }

  validate(): string | boolean {
    // Define regular expressions for each password rule
    const minLengthRegex = /.{8,}/; // Minimum 8 characters
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // At least one special character

    // Check if password meets each rule
    if (this.password.length <= 8) {
      return "Password must be at least 8 characters long";
    }
    if (!uppercaseRegex.test(this.password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!specialCharRegex.test(this.password)) {
      return "Password must contain at least one special character";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regular expression
    if (!emailRegex.test(this.email)) {
      return "Invalid email address";
    }

    const nameRegex = /^[a-zA-Z\- ]+$/;

    // Check if the name matches the regular expression
    if (
      !nameRegex.test(this.name) ||
      this.name === undefined ||
      this.name === null
    ) {
      return "Invalid name";
    }

    return true;
  }

  get values(): { name: string; email: string; password: string } {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}

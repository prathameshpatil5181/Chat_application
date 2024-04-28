import { error } from "console";
import { Encryption } from "../../classes/BcryptClass";
import Prisma from "../Prisma";

const jwt = require("jsonwebtoken");

interface Isignupuser {
  result: boolean;
  status?: string;
}

export class authclass {
  private email: string;
  private password: string;
  private name: string;

  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  async signUpUser(): Promise<Isignupuser> {
    const validation: Isignupuser = this.validate();
    if (validation.result != true) return validation;

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
      } else {
        return { result: false, status: "user already exist" };
      }
      // console.log(user);
    } catch (error) {
      throw error;
    }

     const user = await Prisma.userCredentials.findUnique({
       where: {
         emailId: this.email
       },
     });
    
    if (!user) {
      throw new Error('user not found');
    }
      return {
          result: true,
          status: await Encryption.generateJwt(
            user.emailId,
            user.name,
            user.id,
          ),
        };
  }

  validate(): Isignupuser {
    // Define regular expressions for each password rule
    const minLengthRegex = /.{8,}/; // Minimum 8 characters
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // At least one special character

    // Check if password meets each rule
    if (this.password.length <= 8) {
      return {
        result: false,
        status: "Password must be at least 8 characters long",
      };
    }
    if (!uppercaseRegex.test(this.password)) {
      return {
        result: false,
        status: "Password must contain at least one uppercase letter",
      };
    }
    if (!specialCharRegex.test(this.password)) {
      return {
        result: false,
        status: "Password must contain at least one special character",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regular expression
    if (!emailRegex.test(this.email)) {
      return {
        result: false,
        status: "Invalid email address",
      };
    }

    const nameRegex = /^[a-zA-Z\- ]+$/;

    // Check if the name matches the regular expression
    if (
      !nameRegex.test(this.name) ||
      this.name === undefined ||
      this.name === null
    ) {
      return {
        result: false,
        status: "Invalid name",
      };
    }

    return {
      result: true,
    };
  }

  get values(): { name: string; email: string; password: string } {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}

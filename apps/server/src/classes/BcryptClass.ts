
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
export class Encryption {
  private hash: string;
  constructor(password: string) {
    const salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(password, salt);
  }
  get() {
    return this.hash;
  }

  static async validateHash(password: string, passwordHash: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, passwordHash);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async generateJwt(email: string, name: string,id:string) {
    const data = {
      email,
      name,
      id
    };

    return await jwt.sign(data, process.env.JWT_SECRET_KEY);
  }
}

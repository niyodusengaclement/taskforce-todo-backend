import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class Helpers {
  constructor() {
    this.options = { expiresIn: "365d" };
  }

  /**
   * This is a function.
   *
   * @param {object} info - The information to put in the payload
   * @return {string} -return generated token
   *
   */
  tokenGenerator(info) {
    try {
      this.payload = {
        name: info.name,
        username: info.username,
        id: info.id,
      };
      const secret = process.env.JWT_TOKEN;
      const token = jwt.sign(this.payload, secret, this.options);
      return token;
    } catch (err) {
      return err;
    }
  }

  /**
   * This is a function.
   *
   * @param {string} password - The plain text password
   * @return {string} -return hashed password
   *
   */
  async hashPassword(password) {
    try {
      this.salt = await bcrypt.genSalt(10);
      this.passHash = await bcrypt.hash(password, this.salt);
      return this.passHash;
    } catch (err) {
      return err;
    }
  }
}
export default new Helpers();

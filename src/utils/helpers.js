import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class Helpers {
  constructor() {
    this.options = { expiresIn: "365d" };
  }

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

import { it } from "mocha";
import chai, { request, expect } from "chai";
import http from "chai-http";
import app from "../../src/server";
import userData from "../mocks/user";
import db from "../../src/database/models";
import helpers from "../../src/utils/helpers";

chai.use(http);

describe("Login API", () => {
  before(async () => {
    const userSchema = {
      name: "Brizzy",
      username: "Bruce",
      password: await helpers.hashPassword("P455w0rd"),
    };
    await db.User.create(userSchema);
  });

  after(async () => {
    const exists = await db.User.findOne({
      where: { username: "Bruce" },
    });
    if (exists) {
      await exists.destroy();
    }
  });

  it("User Should not be able to signin if he doesn't provide email or password", (done) => {
    request(app)
      .post("/api/auth/login")
      .send(userData.missingSigninField)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.a.property("status", 400);
        expect(res.body).to.have.a.property("error");
        done();
      });
  });
  it("User should not be able to signin if he is not registered", (done) => {
    request(app)
      .post("/api/auth/login")
      .send(userData.invalidUser)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.a.property("status", 401);
        done();
      });
  });

  it("User should be able to Login if he provides existing email and password", (done) => {
    request(app)
      .post("/api/auth/login")
      .send(userData.allowedSignin)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.a.property("status", 200);
        done();
      });
  });
});

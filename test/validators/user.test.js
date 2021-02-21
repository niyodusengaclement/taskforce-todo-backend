import { it } from "mocha";
import chai, { expect } from "chai";
import http from "chai-http";
import userData from "../mocks/user";
import userValidation from "../../src/validations/UserValidations";
import httpMocks from "node-mocks-http";

chai.use(http);

describe("User schema", () => {
  it("Invalid input Should return bad request (400)", (done) => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: userData.missingSignupField,
    });
    const res = httpMocks.createResponse();
    const next = () => {};
    const response = userValidation.register(req, res, next);
    const resp = response.json();
    expect(resp.statusCode).to.equal(400);
    done();
  });

  it("Valid input Should pass", (done) => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: userData.allowedSignup,
    });
    const res = httpMocks.createResponse();
    const next = () => {};
    userValidation.register(req, res, next);
    done();
  });

  it("Invalid user schema should return Internal Server Error (500)", (done) => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: userData.allowedSignup,
    });
    const res = httpMocks.createResponse();
    const result = userValidation.register(req, res);
    const { statusCode } = result.json();
    expect(statusCode).to.equal(500);
    done();
  });

  it("Invalid login schema should return Internal Server Error (500)", (done) => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: userData.allowedSignin,
    });
    const res = httpMocks.createResponse();
    const result = userValidation.login(req, res);
    const { statusCode } = result.json();
    expect(statusCode).to.equal(500);
    done();
  });
});

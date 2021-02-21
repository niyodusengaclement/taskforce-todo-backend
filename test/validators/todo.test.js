import { it } from "mocha";
import chai, { expect } from "chai";
import http from "chai-http";
import todo from "../mocks/todo";
import TodoValidations from "../../src/validations/TodoValidations";
import httpMocks from "node-mocks-http";

chai.use(http);

describe("Todo schema", () => {
  it("Invalid input Should return bad request (400)", (done) => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: todo.invalid,
    });
    const res = httpMocks.createResponse();
    const next = () => {};
    const response = TodoValidations.Todo(req, res, next);
    const resp = response.json();
    expect(resp.statusCode).to.equal(400);
    done();
  });

  it("Valid input Should pass", (done) => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: todo.valid,
    });
    const res = httpMocks.createResponse();
    const next = () => {};
    TodoValidations.Todo(req, res, next);
    done();
  });

  it("Invalid user schema should return Internal Server Error (500)", (done) => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: todo.valid,
    });
    const res = httpMocks.createResponse();
    const result = TodoValidations.Todo(req, res);
    const { statusCode } = result.json();
    expect(statusCode).to.equal(500);
    done();
  });
});

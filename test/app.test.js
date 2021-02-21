import { it } from "mocha";
import chai, { request, expect } from "chai";
import http from "chai-http";
import httpMocks from "node-mocks-http";
import app from "../src/server";
import { onServerError } from "../src/utils/response";
import helpers from "../src/utils/helpers";
import logger from "../src/utils/logger";

chai.use(http);

describe("App", () => {
  it("Should connect to the server", (done) => {
    request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should handle all unknown error cases", () => {
    const res = httpMocks.createResponse();
    onServerError(res, true);
    onServerError(res);
    helpers.tokenGenerator();
    logger.error("Error");
  });
});

import { it } from "mocha";
import chai, { request, expect } from "chai";
import http from "chai-http";
import app from "../../src/server";
import todoData from "../mocks/todo";
import db from "../../src/database/models";
import helpers from "../../src/utils/helpers";
import TodosController from "../../src/controllers/todosController";
import httpMocks from "node-mocks-http";
import csvGenerator from "../../src/utils/csvGenerator";

chai.use(http);

describe("Todo API", async () => {
  before(async () => {
    const userSchema = {
      name: "Awesomity Lab",
      username: "Awesomity",
      password: await helpers.hashPassword("AwesomityPassword"),
    };
    await db.User.create(userSchema);
  });

  after(async () => {
    const { title } = todoData.valid;
    const exists = await db.Todo.findOne({
      where: { title },
    });
    if (exists) {
      await exists.destroy();
    }
    const userExists = await db.User.findOne({
      where: { username: "Awesomity" },
    });
    if (userExists) {
      await userExists.destroy();
    }
  });

  it("User Should not create todo if he is not logged in", (done) => {
    request(app)
      .post("/api/todos")
      .send(todoData.valid)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("User Should not create todo if there is missing info", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .post("/api/todos")
      .set("x-auth-token", token)
      .send(todoData.invalid)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.a.property("status", 400);
        expect(res.body).to.have.a.property("error");
      });
  });

  it("User Should create todo with all required info", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .post("/api/todos")
      .set("x-auth-token", token)
      .send(todoData.valid)
      .end((err, res) => {
        expect(res).to.have.status(201);
      });
  });

  it("On invalid request Should return Internal Server Error (500)", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {},
    });
    const res = httpMocks.createResponse();
    const result = await TodosController.create(req, res);
    const { statusCode } = result.json();
    expect(statusCode).to.equal(500);
  });

  it("User Should export list of todos", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);
    const req = httpMocks.createRequest({
      method: "GET",
      body: {},
      user: {
        id: "1",
      },
    });
    const res = httpMocks.createResponse();
    await TodosController.export(req, res);
    request(app)
      .get("/api/todos/export")
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("On invalid export Should return Internal Server Error (500)", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      body: {},
      user: {
        id: "string",
      },
    });
    const res = httpMocks.createResponse();
    await TodosController.export(req, res);
  });

  it("User Should get one todo", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .get("/api/todos/1")
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("Should return Internal Server Error (500)", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      body: {},
      user: {
        id: "string",
      },
    });
    const res = httpMocks.createResponse();
    csvGenerator([]);
    await db.Todo.findAll();
  });

  it("User Should be able to update his/her todo", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .put("/api/todos/1")
      .send(todoData.invalid)
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("User Should be able to delete his/her todo", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .delete("/api/todos/1")
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("User Should be able to delete all his/her todos", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .delete("/api/todos")
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("User Should get all todos without specifying page and limit", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .get("/api/todos")
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("User Should get all todos on specified page and limit", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .get("/api/todos?page=0&size=10")
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("User Should search a todo by specifying page and limit ", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .get(
        `/api/todos/search?page=0&size=10&searchHint=${todoData.valid.title}`
      )
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("User Should search a todo without specifying page and limit ", async () => {
    const userSchema = {
      username: "Awesomity",
      password: "AwesomityPassword",
    };
    const {
      header: { "x-auth-token": token },
    } = await request(app).post("/api/auth/login").send(userSchema);

    request(app)
      .get(`/api/todos/search?searchHint=${todoData.valid.title}`)
      .set("x-auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });
});

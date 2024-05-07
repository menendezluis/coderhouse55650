import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");
let temporalIDForTesting = "";

describe("Testing de users ", () => {
  it("2 + 2 = 4", () => {
    expect(2 + 2).to.be.equal(4);
    expect(2 + 2).to.be.a("number");
  });

  it("Tenemos usuarios disponibles Metodo GET /api/users", async () => {
    const result = await requester.get("/api/users").send();
    const { _body, statusCode, ok } = result;
    expect(_body.payload).to.be.an("array").length.greaterThan(0);
  });

  it("Creamos un usuario Metodo POST /api/users", async () => {
    const user = {
      email: "kevin1234@gmail.com",
      first_name: "Kevin",
      last_name: "Gonzalez",
      dni: 12345,
      birthDate: "2024-04-30",
      gender: "M",
      password: "12345",
      role: "student",
    };
    const result = await requester.post("/api/users").send(user);
    temporalIDForTesting = result._body.payload._id;
    console.log(temporalIDForTesting);
    expect(result.statusCode).to.be.equal(200);
    expect(result._body.payload).to.have.property("_id");
  });

  it("Consultamos el usuario por id GET /api/users/:id", async () => {
    const result = await requester
      .get(`/api/users/${temporalIDForTesting}`)
      .send();
    const { _body, statusCode, ok } = result;
    expect(_body.payload.first_name).to.be.equal("Kevin");
  });
});

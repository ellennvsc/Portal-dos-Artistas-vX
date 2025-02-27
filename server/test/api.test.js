import { describe, it, before } from "node:test";
import assert from "node:assert";
import request from "supertest";
import crypto from "node:crypto";
import app from "../server.js";

let user;
var token
var userLogin;
let inscricao = {
  qrCode: "https://via.placeholder.com/100x100.png?text=QR+Code",
  cpf: "12059930456",
  price: "R$ 565,00",
  transaction: "CHAR_C68ER45-89RW-5T6W-CV67-963243TYYU7I9",
  instructions:
    "Mostre o voucher no seu smartphone ou impresso, acompanhado de um documento oficial válido com foto. Certifique-se de que o código de barras esteja legível.",
};

async function loadToken(user) {
  const response = await request(app).post("/login").send(user);
  return response.body.token;
}

function createValidUser() {
  const validUser = {
    password: "12345678",
    phone: "839999999999",
    birth: "2007-08-21"
  };

  const hash = crypto.randomBytes(20).toString("hex");
  validUser.name = `Valid ${hash}`;
  validUser.email = `valid-${hash}@email.com`;

  return validUser;
}

describe('API Portal Artistas', () => {
    before(async () => {
        user = createValidUser();
        await request(app).post("/register").send(user);
        userLogin = { loginEmail: user.email, loginPassword: user.password };
    });

    describe("User routes" , () => {
        describe("POST /register", () => {
            it("deverá criar um usuario", async () => {
                const newUser = createValidUser();
                const response = await request(app).post("/register").send(newUser);
                assert.deepStrictEqual(response.statusCode, 201);
            })
            
            it("deverá retornar um erro se o email já estiver cadastrado", async () => {
                const response = await request(app).post("/register").send(user);
                assert.deepStrictEqual(response.statusCode, 400);
            })

            it("deverá retornar um erro se o usuário for invalido", async () => {
                const userSend = { ...user, email: "invalid-email" };
                const response = await request(app).post("/register").send(userSend);
                assert.deepStrictEqual(response.statusCode, 400);
            })
        })

        describe("POST /login", () => {
            
            it("deverá retornar um token de acesso", async () => {
                token = await loadToken(userLogin);
                assert.ok(token);
            })

            it("deverá retornar um erro se o email não existir", async () => {
                const invalidUserLogin = { loginEmail: "nonexistent@example.com", loginPassword: user.password };
                const response = await request(app).post("/login").send(invalidUserLogin);
                assert.deepStrictEqual(response.statusCode, 403);
            })

            it("deverá retornar um erro se a senha estiver errada", async () => {
                const invalidPasswordLogin = { loginEmail: user.email, loginPassword: "wrongpassword" };
                const response = await request(app).post("/login").send(invalidPasswordLogin);
                assert.deepStrictEqual(response.statusCode, 401);
            })
        })
    })

    describe("rotas de inscrição", () => {
        describe("POST /inscricao/new/:eventId", () => {
            it("deverá criar uma inscrição", async () => {
                const response = await request(app)
                    .post("/inscricao/new/1")
                    .set("Authorization", `Bearer ${token}`)
                    .send(inscricao);
                assert.deepStrictEqual(response.statusCode, 201);
            })
        })
    })
})
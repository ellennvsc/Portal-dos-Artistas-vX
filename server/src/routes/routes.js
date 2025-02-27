import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";

import { isAuthenticated } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { z } from "zod";

//models
import users from "../models/users.js";
import events from "../models/events.js";
import tickets from "../models/tickets.js";

//services
import emailSend from "../utils/emailSend.js";
import uploadConfig from "../middleware/multer.js";

const router = express.Router();
const saltRounds = Number(10);

//todos os eventos
router.get("/events", async (req, res) => {
  try {
    const allEvents = await events.readAll();
    res.status(200).json(allEvents);
  } catch (e) {
    console.log(e);
    res.status(500).send("algo deu errado");
  }
});

//cadastro
// cria usuario
router.post("/register", validate(z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(11),
    birth: z.string(),
    password: z.string().min(6),
  }),
})), async (req, res) => {
  try {
    //dados enviados
    const data = req.body;  
    //console.log(data);
    //separandos senha dos resto dos dados do usuario
    const { password, ...userData } = data;
    //criptografando senha separada
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = await users.criarUser({
      name: userData.name,
      password: hash,
      email: userData.email,
      phone: userData.phone,
      birth: userData.birth,
    });

    //enviando email de boas vindas
    emailSend.userGreetings(userData.email);

    res.status(201).json(newUser);
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(400).json({ "erro":"Email já cadastrado" });
    }
    console.log(e);
    res.status(500).send("algo deu errado");
  }
});

//inscricao >>> ingresso
//cria ingresso
//relacionar com usuario a partir da tabela de relacionamento
router.post("/inscricao/new/:eventId", isAuthenticated, validate(z.object({
  body: z.object({
    qrCode: z.string(),
    cpf: z.string().min(11),
    price: z.string(),
    transaction: z.string(),
    instructions: z.string(),
  }),
  params: z.object({
    eventId: z.string(),
  }),
})), async (req, res) => {
  try {
    const data = req.body;
    const userId = req.userId;
    const { eventId } = req.params;
    //console.log(data);

    //etapa 1: criar ingresso
    //etapa 2: relacionar ingresso e usuario
    const ingresso = await tickets.createTicket(eventId, userId, data);
    console.log(ingresso);

    //etapa 3: criar inscrição
    //etapa 4: relacionar com usuario
    const inscricao = await tickets.createInscricao(eventId, userId);
    console.log(inscricao);

    //enviando email de confirmação de ingresso
    const user = await users.readUserById(userId);
    emailSend.reserveTicket(user.Email);

    res.status(201).json({ ingresso, inscricao });
  } catch (e) {
    console.log(e);
    res.status(500).send("algo deu errado");
  }
});

//login
router.post("/login", validate(z.object({
  body: z.object({
    loginEmail: z.string().email(),
    loginPassword: z.string(),
  }),
})), async (req, res) => {
  try {
    //dados enviados do FrontEnd
    //os inputs de email e senha
    const { loginEmail, loginPassword } = req.body;
    console.log(req.body)
    const user = await users.readUser(loginEmail); //procurando usuario com email
    if (!user) {
      return res.status(403).json({"erro":"Usuário não encontrado"});
    }

    //comparando as senhas
    //utilizando o bcrypt para compara as senhas criptografadas
    if (await bcrypt.compare(loginPassword, user.Senha)) {
      //criando token
      const token = jwt.sign({ userId: user.UsuarioID }, process.env.JWT_SECRET);
      //separando senha do usuario
      delete user.Senha;

      //retornando token e usuarii
      return res.status(200).json({ token, user, isValid:true });
    }

    //a senha enviada é diferente da senha do banco
    res.status(401).json({ "erro":"Senha inválida"});
  } catch (e) {
    console.log(e);
    res.status(500).json({"erro":"algo deu errado"});
  }
});

router.post('/new/event', isAuthenticated, multer(uploadConfig).single("imagem"), async (req, res) => {
  try {
    const data = req.body;
    const imagem = `../images/profile/${req.file.filename}`;
    const event = { ...data, DataHora: new Date(data.DataHora), DataPublicacao: new Date(data.DataPublicacao), ImagemCartaz: imagem, ownerID: req.userId };
    console.log(event);
  
    const newEvent = await events.create(event);
    res.status(201).json("OK");
  } catch (e) {
    console.log(e);
    res.status(500).send("algo deu errado");
  }
});

router.get("/verify-auth", isAuthenticated, (req, res) => {
  res.status(200).send({ isValid: true, message: "Token válido" });
});

export default router;

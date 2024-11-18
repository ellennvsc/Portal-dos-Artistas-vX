import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { isAuthenticated } from "../middleware/auth.js";

//models
import users from "../models/users.js";
import events from "../models/events.js";
import tickets from "../models/tickets.js";

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
router.post("/register", async (req, res) => {
  try {
    //dados enviados
    const data = req.body;  
    console.log(data);
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

    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).send("algo deu errado");
  }
});

//inscricao >>> ingresso
//cria ingresso
//relacionar com usuario a partir da tabela de relacionamento
router.post("/inscricao/new/:eventId/:userId", async (req, res) => {
  try {
    const data = req.body;
    const { eventId, userId } = req.params;
    console.log(data);

    //etapa 1: criar ingresso
    //etapa 2: relacionar ingresso e usuario
    const ingresso = await tickets.createTicket(eventId, userId, data);
    console.log(ingresso);

    //etapa 3: criar inscrição
    //etapa 4: relacionar com usuario
    const inscricao = await tickets.createInscricao(eventId, userId);
    console.log(inscricao);

    res.status(201).json({ ingresso, inscricao });
  } catch (e) {
    console.log(e);
    res.status(500).send("algo deu errado");
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    //dados enviados do FrontEnd
    //os inputs de email e senha
    const { loginEmail, loginPassword } = req.body;

    if( !loginEmail || !loginPassword ){
      return res.status(403).json({"erro":"Email ou senha não informados"});
    } 
    console.log(req.body)
    const user = await users.readUser(loginEmail); //procurando usuario com email
    if (!user) {
      return res.status(403).json({"erro":"Usuário não encontrado"});
    }

    //comparando as senhas
    //utilizando o bcrypt para comparar as senhas criptografadas
    if (await bcrypt.compare(loginPassword, user.Senha)) {
      //criando token
      const token = jwt.sign({ userId: user.UsuarioID }, process.env.JWT_SECRET);
      //separando senha do usuario
      delete user.Senha;

      //retornando token e usuario
      return res.status(200).json({ token, user, isValid:true });
    }

    //a senha enviada é diferente da senha do banco
    res.status(401).json({ "erro":"Senha inválida"});
  } catch (e) {
    console.log(e);
    res.status(500).json({"erro":"algo deu errado"});
  }
});

router.get("/verify-auth", isAuthenticated, (req, res) => {
  res.status(200).send({ isValid: true, message: "Token válido" });
});

export default router;

import prisma from "../../prisma/database.js";

async function criarUser({ name, email, password, phone, birth }) {
  const user = await prisma.usuario.create({
    data: {
      NomeCompleto: name,
      Email: email,
      Senha: password,
      Telefone: phone,
      DataNascimento: new Date(birth),
    },
  });
  return user;
}

async function readUser(email) {
  const user = await prisma.usuario.findUnique({
    where: {
      Email: email,
    },
  });
  return user;
}

export default { criarUser, readUser }; // Exportar a função criarUser
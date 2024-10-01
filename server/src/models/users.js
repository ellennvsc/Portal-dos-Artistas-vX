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

export default { criarUser }; // Exportar a função criarUser

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const saltRounds = 10;

async function main() {
  const events = [
    {
      NomeEvento: "Rock in Rio",
      Descricao: "Coldplay mais uma vez oferecendo um show enérgico e emocionante com seus grandes sucessos no Rock in Rio!",
      DataHora: new Date("2024-09-22T00:00:00Z"),
      Localizacao: "Rio de Janeiro",
      ImagemCartaz: "https://cdn.rockinrio.com/wp-content/uploads/2020/09/whatsapp-image-2020-09-28-at-12-13-54.jpeg",
      owner: {
        create: {
          NomeCompleto: "Coldplay",
          Email: "coldplay@example.com",
          Senha: "password",
          Telefone: "123456789",
          DataNascimento: new Date("1977-09-16T00:00:00Z")
        }
      }
    },
    {
      NomeEvento: "The Town",
      Descricao: "O fenômeno global Bruno Mars está chegando para uma apresentação exclusiva no The Town!",
      DataHora: new Date("2024-11-20T00:00:00Z"),
      Localizacao: "São Paulo",
      ImagemCartaz: "https://igormiranda.com.br/wp-content/uploads/2022/09/The-Town-foto-Filipe-Marques-min.jpg",
      owner: {
        create: {
          NomeCompleto: "Bruno Mars",
          Email: "brunomars@example.com",
          Senha: "password",
          Telefone: "987654321",
          DataNascimento: new Date("1985-10-08T00:00:00Z")
        }
      }
    }
  ];

  for (const event of events) {
    event.owner.create.Senha = await bcrypt.hash(event.owner.create.Senha, saltRounds);

    await prisma.evento.create({
      data: event
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
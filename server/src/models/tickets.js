import prisma from "../../prisma/database.js";

async function readById(id) {
  return await prisma.ticket.findUnique({
    where: {
      id: Number(id),
    },
  });
}

async function createTicket(
  eventId,
  ownerId,
  { qrCode, cpf, price, transaction, instructions }
) {
    return await prisma.ticket.create({
        data: {
        eventId: Number(eventId),
        ownerId: Number(ownerId),
        qrCode,
        cpf,
        price,
        transaction,
        instructions,
        },
    });
}

async function createInscricao(eventId, userId) {
    return await prisma.inscricoesEvento.create({
        data: {
        EventoID: Number(eventId),
        UsuarioID: Number(userId),
        DataInscricao: new Date(),
        },
    });
}

export default { readById, createTicket, createInscricao };

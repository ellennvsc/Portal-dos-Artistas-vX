import prisma from "../../prisma/database.js";

async function readAll(){
    return await prisma.evento.findMany({
        include: {
            owner: true,
        }
    });
}

export default { readAll }
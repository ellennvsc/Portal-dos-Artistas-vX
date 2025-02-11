import prisma from "../../prisma/database.js";

async function readAll(){
    return await prisma.evento.findMany({
        include: {
            owner: true,
        }
    });
}

async function create(event){
    return await prisma.evento.create({
        data: event
    });
}

export default { readAll, create }
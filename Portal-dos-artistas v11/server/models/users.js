import prisma from '../prisma/prismaClient';

async function criarUser(name, email, password) {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hash },
    });
    return user;
}

export default { criarUser }; // Exportar a função criarUser
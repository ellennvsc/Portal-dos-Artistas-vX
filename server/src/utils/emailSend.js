import nodemailer from 'nodemailer';
import mailConfig from '../config/email.js';
 
async function userGreetings(email) {
  try {
    const config = await mailConfig();
 
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: 'portal.artistas@gmail.com',
      to: email,
      subject: 'Bem vindo ao Patrulha Animal',
      text: `Excelente! Seu cadastro como nosso usuário foi concluído com sucesso.\n\nTenha acesso aos eventos`,
    });
 
    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function reserveTicket(email) {
  try {
    const config = await mailConfig();
 
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: 'portal.artistas@gmail.com',
        to: email,
        subject: 'Ingresso reservado',
        text: `Excelente! Seu ticket foi reservado, espero que aproveite.\n\nFique atento a data e hora do evento`,
    });

    if (process.env.NODE_ENV === 'development') {
        console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
        }
    } catch (err) {
        throw new Error(err);
    }
}

 
export default { userGreetings, reserveTicket };
 
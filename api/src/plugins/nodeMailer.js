import nodemailer from "nodemailer";
import MD5 from "crypto-js/md5.js";

export function templateEmail(email) {
  const template = /* HTML */ `
    <div>
      <b>Convite para ser Professor no Graduar FATEC</b>
      <a href="http://localhost:4000/professor/buscar/hash/${MD5(email)}">
        Finalizar Cadastro!
      </a>
      <div></div>
    </div>
  `;
  return template;
}

async function criarTransportador() {
  const testAccount = await nodemailer.createTestAccount();
  const transportador = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  return transportador;
}

export default {
  async enviar(data) {
    const transportador = await criarTransportador();
    const info = await transportador.sendMail(data);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  },
};

import pluginEmail, { templateEmail } from "../plugins/nodeMailer.js";
import {
  invitation,
  createStand,
  updateStand,
  list,
  deleteStand,
  listById,
} from "../services/serviceAdmin.js";
import viewStand from "../views/viewStand.js";

export async function inviteTeacher(req, res) {
  const { emails } = req.body;
  try {
    emails.forEach((email) => {
      const html = templateEmail(email);
      const data = {
        from: '"Graduar Fatec" <graduar@gmail.com>',
        to: email,
        subject: "Convite para ser Professor",
        html: html,
      };
      pluginEmail.enviar(data);
      invitation(email);
    });
    return res.status(200).json({
      message: "Convites enviados com sucesso",
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      menssage: "Ocorreu um erro inesperado!",
    });
  }
}

export async function createBanca(req, res) {
  const { groupId, presentation, teacher1, teacher2, teacher3 } = req.body;
  createStand(groupId, presentation, teacher1, teacher2, teacher3)
    .then(() => {
      return res.status(200).json({
        message: "Banca criada com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function updateBanca(req, res) {
  const { groupId, presentation, teacher1, teacher2, teacher3 } = req.body;
  const { id } = req.params;
  updateStand(groupId, presentation, teacher1, teacher2, teacher3, id)
    .then(() => {
      return res.status(200).json({
        message: "Banca atualizada com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function deleteBanca(req, res) {
  const { bancaId } = req.params;
  deleteStand(bancaId)
    .then(() => {
      return res.status(200).json({
        message: "Banca deletada com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listBanca(req, res) {
  list()
    .then((result) => {
      return res.status(200).json(viewStand.renderMany(result));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listBancaById(req, res) {
  const { id } = req.params;
  listById(id)
    .then((result) => {
      return res.status(200).json(viewStand.renderMany(result));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

import {
  createTeacher,
  updateTeacher,
  confirmStand,
  confirmAdvisor,
  confirmCoAdvisor,
  inviteTeacher,
  listInviteTeacher,
  listInvitations,
} from "../services/serviceTeacher.js";
import { searchInvitation } from "../services/serviceUser.js";
import { sqlDeleteNotification } from "../plugins/sqlNotification.js";

export async function inviteAccept(req, res) {
  const { name, email, password, phone } = req.body;
  const { md5 } = req.params;
  searchInvitation(md5)
    .then((result) => {
      const invitation = result[0];
      if (!invitation) {
        return res.status(401).json({
          menssage: "Convite não encontrado",
        });
      }
      createTeacher(name, email, password, phone).then(() => {
        return res.status(200).json({
          message: "Professor cadastrado com sucesso",
        });
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function update(req, res) {
  const { name, email, password, phone } = req.body;
  const { id } = req.params;
  updateTeacher(name, email, password, phone, id)
    .then(() => {
      return res.status(200).json({
        message: "Professor atualizado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function confirmBanca(req, res) {
  const { standId } = req.params;
  confirmStand(standId)
    .then(() => {
      return res.status(200).json({
        message: "Banca confirmada com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function confirmTAdvisor(req, res) {
  const { groupId } = req.params;
  const { userId } = req;
  confirmAdvisor(userId, groupId)
    .then(() => {
      sqlDeleteNotification(`/advisor/${groupId}/invitation`);
      return res.status(200).json({
        message: "Orientador confirmado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function confirmTCoAdvisor(req, res) {
  const { groupId } = req.params;
  const { userId } = req;
  confirmCoAdvisor(userId, groupId)
    .then(() => {
      return res.status(200).json({
        message: "Orientador confirmado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function inviteTeacherBanca(req, res) {
  const { standId, teacherId } = req.body;
  inviteTeacher(standId, teacherId)
    .then(() => {
      return res.status(200).json({
        message: "Professor adicionado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listTeacherBanca(req, res) {
  const { standId } = req.params;
  listInviteTeacher(standId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listMyInvitations(req, res) {
  const { userId } = req;
  listInvitations(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

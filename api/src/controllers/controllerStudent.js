import {
  createGroup,
  addInGroup,
  createStudent,
  updateStudent,
  updateGroup,
  listGroup,
  groupPreference,
  listGroupPreference,
  listCourse,
  listGroupById,
  listGroupPorId,
} from "../services/serviceStudent.js";
import sqlNotification from "../plugins/sqlNotification.js";
import viewGroup from "../views/viewGroup.js";

export async function update(req, res) {
  const { name, email, password, phone, course_id, RA } = req.body;
  const { id } = req.params;
  updateStudent(name, email, password, phone, course_id, RA, id)
    .then(() => {
      return res.status(200).json({
        message: "Aluno atualizado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function create(req, res) {
  const { name, email, password, phone, course_id, RA } = req.body;
  createStudent(name, email, password, phone, course_id, RA)
    .then(() => {
      return res.status(200).json({
        message: "Aluno criado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listTGroup(req, res) {
  listGroup()
    .then((result) => {
      return res.status(200).json(viewGroup.renderMany(result));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listGroupId(req, res) {
  const { id } = req.params;
  listGroupPorId(id)
    .then((result) => {
      return res.status(200).json(viewGroup.renderMany(result));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listMyGroup(req, res) {
  const { userId } = req;
  listGroupById(userId)
    .then((result) => {
      return res.status(200).json(viewGroup.renderMany(result));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function updateTGroup(req, res) {
  const { termId, themeId, title } = req.body;
  const { groupId } = req.params;
  updateGroup(termId, themeId, title, groupId)
    .then(() => {
      return res.status(200).json({
        message: "Grupo atualizado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function newGroup(req, res) {
  const { termId, themeId, title } = req.body;
  const { userId } = req;
  createGroup(userId, termId, themeId, title)
    .then((result) => {
      return res.status(200).json({
        message: "Grupo criado com sucesso",
        id: result.insertId,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function inviteToGroup(req, res) {
  const { groupId, studentId } = req.body;
  sqlNotification(
    studentId,
    1,
    "Convite para Grupo",
    groupId,
    `/group/${groupId}/invitation`
  )
    .then(() => {
      return res.status(200).json({
        message: "Convite enviado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function addToGroup(req, res) {
  const { groupId } = req.params;
  const { userId } = req;
  addInGroup(groupId, userId)
    .then(() => {
      return res.status(200).json({
        message: "Adicionado do grupo com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function inviteToAdvisor(req, res) {
  const { groupId, teacherId } = req.body;
  sqlNotification(
    teacherId,
    1,
    "Convite para ser Orientador",
    groupId,
    `/advisor/${groupId}/invitation`
  )
    .then(() => {
      return res.status(200).json({
        message: "Convite enviado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function inviteToCoAdvisor(req, res) {
  const { groupId, teacherId } = req.body;
  console.log(groupId, teacherId)
  sqlNotification(
    teacherId,
    1,
    "Convite para ser Coorientador",
    groupId,
    `/co_advisor/${groupId}/invitation`
  )
    .then(() => {
      return res.status(200).json({
        message: "Convite enviado com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function preference(req, res) {
  const { teacherId, status } = req.body;
  const { groupId } = req.params;
  groupPreference(groupId, teacherId, status)
    .then(() => {
      return res.status(200).json({
        message: "Preferencia criada com sucesso",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listPreference(req, res) {
  const { groupId } = req.params;
  listGroupPreference(groupId)
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

export async function listTCourse(req, res) {
  listCourse()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

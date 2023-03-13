import {
  searchByEmail,
  searchByType,
  searchById,
  themes,
  remove,
  add,
} from "../services/serviceUser.js";
import jwt from "jsonwebtoken";
import viewUser from "../views/viewUser.js";
import { sqlListNotification } from "../plugins/sqlNotification.js";

export async function list(req, res) {
  const { type } = req.params;
  searchByType(type)
    .then((result) => {
      return res.status(200).json(viewUser.renderMany(result));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function login(req, res) {
  const { email, password } = req.body;
  searchByEmail(email)
    .then((result) => {
      const user = result[0];
      if (!user || user.password !== password) {
        return res.status(401).json({
          menssage: "Email e/ou Senha invalido(s)",
        });
      }
      const payload = {
        userType: user.type,
      };
      user.token = jwt.sign(payload, process.env.JWT_SECRET, {
        subject: user.id.toString(),
      });
      return res.status(200).json(viewUser.render(user));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function search(req, res) {
  const { id } = req.params;
  searchById(id)
    .then((result) => {
      return res.status(200).json(viewUser.renderMany(result));
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listThemes(req, res) {
  themes()
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

export async function removeUser(req, res) {
  const { id } = req.params;
  remove(id)
    .then(() => {
      return res.status(200).json({
        menssage: "Usuário deletado com successo!",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function addUser(req, res) {
  const { name, email, password, phone, course_id, type } = req.body;
  add(name, email, password, phone, course_id, type)
    .then(() => {
      return res.status(200).json({
        menssage: "Cadastrado com successo!",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({
        menssage: "Ocorreu um erro inesperado!",
      });
    });
}

export async function listNotification(req, res) {
  const { userId } = req.params;
  sqlListNotification(userId)
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

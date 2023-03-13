import { Router } from "express";
import upload from "../plugins/multer.js";
import {
  update,
  confirmBanca,
  confirmTAdvisor,
  confirmTCoAdvisor,
  inviteTeacherBanca,
  listTeacherBanca,
  listMyInvitations,
} from "../controllers/controllerTeacher.js";
import { unlink } from "fs/promises";

const router = Router();
router.post("/advisor/:groupId/invitation", confirmTAdvisor);
router.post("/confirm/coadvisor/:groupId", confirmTCoAdvisor);
router.post("/confirm/banca/:standId", confirmBanca);
router.post("/update/:id", update);
router.post("/invite/teacher", inviteTeacherBanca);
router.get("/list/banca/teacher/:standId", listTeacherBanca);

router.post(
  "/corrections/send/zip/:groupId",
  upload.single("corrections"),
  (req, res) => {
    const file = req.file;
    if (!file) {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    }
    return res.status(200).json({
      message: "Correção enviada com sucesso",
    });
  }
);

router.post("/corrections/remove/zip/:groupId", (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req;
    unlink(`uploads/corrections/${userId}-${groupId}.zip`);
    return res.status(200).json({
      message: "Arquivos removidos com sucesso",
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Ocorreu um erro inesperado!",
    });
  }
});

router.get("/my/invitations", listMyInvitations)

export default router;

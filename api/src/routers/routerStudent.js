import { Router } from "express";
import {
  newGroup,
  inviteToGroup,
  addToGroup,
  update,
  inviteToAdvisor,
  inviteToCoAdvisor,
  updateTGroup,
  listTGroup,
  preference,
  listPreference,
  listMyGroup,
  listGroupId,
} from "../controllers/controllerStudent.js";
import upload from "../plugins/multer.js";
import { unlink } from "fs/promises";

const router = Router();
router.post("/invite/advisor", inviteToAdvisor);
router.post("/invite/coadvisor", inviteToCoAdvisor);
router.post("/update/:id", update);
router.get("/group/list", listTGroup);
router.get("/group/list/my", listMyGroup)
router.get("/group/list/id/:id", listGroupId)
router.post("/group/create", newGroup);
router.post("/group/update/:groupId", updateTGroup);
router.post("/group/invitation", inviteToGroup);
router.post("/group/:groupId/accept", addToGroup);
router.post("/group/preferencia/:groupId", preference);
router.get("/group/preferencia/:groupId", listPreference);

router.post(
  "/project/send/zip/:groupId",
  upload.single("projects"),
  (req, res) => {
    const file = req.file;
    if (!file) {
      console.error(err);
      return res.status(401).json({
        message: "Ocorreu um erro inesperado!",
      });
    }
    return res.status(200).json({
      message: "Arquivos enviados com sucesso",
    });
  }
);

router.post("/project/remove/zip/:groupId", (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req;
    unlink(`uploads/projects/${userId}-${groupId}.zip`);
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

export default router;

import { Router } from "express";
import {
  inviteTeacher,
  createBanca,
  updateBanca,
  listBanca,
  deleteBanca,
  listBancaById,
} from "../controllers/controllerAdmin.js";

const router = Router();
router.post("/teacher/invitation", inviteTeacher);
router.post("/create/banca", createBanca);
router.post("/update/banca/:id", updateBanca);
router.get("/list/banca", listBanca);
router.delete("/delete/banca/:bancaId", deleteBanca)
router.get("/list/banca/:id", listBancaById)

export default router;

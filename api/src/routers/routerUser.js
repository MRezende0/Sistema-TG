import { Router } from "express";
import {
  login,
  list,
  search,
  listThemes,
  removeUser,
  addUser,
  listNotification,
} from "../controllers/controllerUser.js";

const router = Router();
router.get("/list/:type", list);
router.get("/:id", search);
router.post("/login", login);
router.get("/themes/list", listThemes);
router.delete("/remove/:id", removeUser);
router.post("/add", addUser);
router.get("/notifications/:userId", listNotification);

export default router;

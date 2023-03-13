import { Router } from "express";
import { userAuth } from "../plugins/userAuth.js";
import routerUser from "./routerUser.js";
import routerStudent from "./routerStudent.js";
import routerAdmin from "./routerAdmin.js";
import routerTeacher from "./routerTeacher.js";
import { create, listTCourse } from "../controllers/controllerStudent.js";
import { inviteAccept, update } from "../controllers/controllerTeacher.js";

const router = Router();
router.use("/user", routerUser);

router.use("/student", userAuth, routerStudent);
router.post("/create/student", create);

router.use("/admin", userAuth, routerAdmin);

router.use("/teacher", userAuth, routerTeacher);
router.post("/invitation/:md5/accept", inviteAccept);

router.get("/course", listTCourse)

export default router;

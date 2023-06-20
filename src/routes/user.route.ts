import { Router } from "express";

import { CreateUser } from "../controllers/user.controller";

const router = Router();

router.post('/create', CreateUser);

export default router;
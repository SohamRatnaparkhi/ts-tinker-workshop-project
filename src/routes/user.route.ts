import { Router } from "express";

import { createUser, getUserById, loginUser } from "../controllers/user.controller";

const router = Router();

router.post('/create', createUser);
router.get('/:id', getUserById);
router.post('/login', loginUser);

export default router;
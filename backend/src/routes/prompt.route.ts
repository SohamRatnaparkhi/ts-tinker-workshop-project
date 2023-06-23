import { Router } from "express";

import { getPromptById, getPromptsByLevel, matchPrompt } from "../controllers/prompt.controller";

const router = Router();

router.get('/level/:level', getPromptsByLevel);
router.get('/:id', getPromptById);
router.post('/match', matchPrompt);

export default router;
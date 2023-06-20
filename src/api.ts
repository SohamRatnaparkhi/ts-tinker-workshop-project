import { Router } from "express";
import userRoutes from "./routes/user.route"
import promptRoutes from "./routes/prompt.route"

const router = Router();

router.use('/user', userRoutes);
router.use('/prompt', promptRoutes);

export default router;
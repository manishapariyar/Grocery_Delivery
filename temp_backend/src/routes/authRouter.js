import { Router } from "express";
import { googleLoginCallback, registerUser, loginUser, logoutUser, userProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authCredentials.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware, logoutUser);
router.get("/is-auth", authMiddleware, userProfile);

// Google OAuth
router.post("/google", googleLoginCallback);


export default router;

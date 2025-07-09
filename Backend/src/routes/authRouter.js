import { Router } from "express";
import { googleAuth, googleCallback } from "../controllers/authController.js";


const router = Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: "Auth Router is working" });
}
);

router.get('/api/auth/google', googleAuth);
router.get('/google/callback', googleCallback)






export default router; 
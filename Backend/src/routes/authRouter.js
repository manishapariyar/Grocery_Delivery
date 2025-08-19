import { Router } from "express";
import { googleAuth, googleCallback, registerUser, loginUser, logoutUser, userProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authCredentials.js";


const router = Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: "Auth Router is working" });
}
);
router.post('/signup', registerUser);
router.post('/login', loginUser)
router.get('/logout', authMiddleware, logoutUser)
router.get('/is-auth', authMiddleware, userProfile)
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback)






export default router; 
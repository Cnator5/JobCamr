import express from "express";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/check-auth", (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      // return auth status
      return res.status(200).json({
        isAuthenticated: true,
        user: req.oidc.user,
      });
    } else {
      return res.status(200).json(false);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

router.get("/user/:id", getUserProfile);

export default router;
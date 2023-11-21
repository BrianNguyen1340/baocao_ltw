import express from "express";
import {
  register,
  login,
  logout,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserIdByAmin,
  updateUserIdByAdmin,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(register).get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", login);
router.post("/logout", logout);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserIdByAmin)
  .put(authenticate, authorizeAdmin, updateUserIdByAdmin);

export default router;

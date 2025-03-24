import express from "express";
import { signUp, signIn, getUsers, getUserById, updateUser, deleteUser, dashboard } from "../controllers/userController";
import { authMiddleware, validateUser } from "../middleware/auth";

const router = express.Router();

// Publika routes
router.post("/sign-up", validateUser, signUp);
router.post("/sign-in", validateUser, signIn);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", validateUser, updateUser);
router.delete("/users/:id", deleteUser);

// Skyddade routes
router.get("/dashboard", authMiddleware, dashboard);

export default router;

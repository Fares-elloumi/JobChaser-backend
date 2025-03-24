import express from "express"
import { createRole, getRole, getRoles, updateRole, deleteRole } from "../controllers/rolController";

const router = express.Router()

router.post("/", createRole);
router.get("/", getRoles);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);



export default router;
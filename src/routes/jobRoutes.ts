import express from "express"
import { createJob, getJob, getJobs, updateJob, deleteJob } from "../controllers/jobController";

const router = express.Router()

router.post("/", createJob);
router.get("/", getJobs);
router.get("/:id", getJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);



export default router;
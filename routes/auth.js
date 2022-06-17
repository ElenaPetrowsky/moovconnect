import express from "express";
import {createUser, verifyUser} from "../controllers/auth.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/verification",verifyUser);

export default router;
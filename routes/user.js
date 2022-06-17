import express from "express";
import {getOneUser} from "../controllers/user.js";
import {authenticationToken} from "../middleware/auth.js";

const router = express.Router();

router.post("/create", getOneUser);

router.get("/:id", authenticationToken, getOneUser);
// router.post("/verification",verifyUser);

export default router;
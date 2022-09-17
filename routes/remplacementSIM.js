import express from "express";
import { authenticationToken } from "../middleware/auth.js";
import {
  getOneRemplacementSIM,
  getAllRemplacementSIM,
  createRemplacementSIM,
  deleteOneRemplacementSIM,
  deleteMultipleRemplacementSIM,
  updateRemplacementSIM,
} from "../controllers/remplacementSIM.js";

const router = express.Router();

router.post("/create", createRemplacementSIM);
router.get("/", getAllRemplacementSIM);
router.get("/:id", getOneRemplacementSIM);
router.patch("/:id", updateRemplacementSIM);
router.delete("/:id", deleteOneRemplacementSIM);
router.post("/:id", deleteMultipleRemplacementSIM);

export default router;

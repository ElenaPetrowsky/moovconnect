import express from "express";
import { authenticationToken } from "../middleware/auth.js";
import {
        getOneRequete,
        getAllRequete,
        createRequete,
        deleteOneRequete,
        deleteAllRequete,
        updateRequete,
} from "../controllers/requete.js";

const router = express.Router();

router.post("/create", createRequete);
router.get("/", getAllRequete);
router.get("/:id", getOneRequete);
router.patch("/:id", updateRequete);
router.delete("/:id", deleteOneRequete);
router.delete("/:id", deleteAllRequete);

export default router;

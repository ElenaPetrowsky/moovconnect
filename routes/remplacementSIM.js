// import express
import express from "express";
import {authenticationToken} from "../middleware/auth.js";
import {getOneRemplacementSIM, getAllRemplacementSIM, createRemplacementSIM,deleteOneRemplacementSIM, deleteMultipleRemplacementSIM, updateRemplacementSIM } from '../controllers/remplacementSIM.js';


const router = express.Router();

router.post('/create',authenticationToken, createRemplacementSIM);
router.get('/', authenticationToken, getAllRemplacementSIM);
router.get('/:id',authenticationToken, getOneRemplacementSIM);
router.patch('/:id',authenticationToken, updateRemplacementSIM);
router.delete('/:id',authenticationToken, deleteOneRemplacementSIM);
router.post('/:id',authenticationToken, deleteMultipleRemplacementSIM);

export default router;
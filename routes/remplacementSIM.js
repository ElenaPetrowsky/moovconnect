// import express
import { express } from 'express';

import {getOneRemplacementSIM, getAllRemplacementSIM, createRemplacementSIM, 
        deleteRemplacementSIM, updateRemplacementSIM } from '../controllers/RemplacementSIM.js';


const router = express.Router();

router.post('/create', createRemplacementSIM);
router.get('/', getAllRemplacementSIM);
router.get('/:id', getOneRemplacementSIM);
router.patch('/:id', updateRemplacementSIM);
router.delete('/:id', deleteRemplacementSIM);

export default router;
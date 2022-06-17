// import express
import { express } from 'express';

import {getOneRequete, getAllRequete, createRequete, 
        deleteRequete, updateRequete } from '../controllers/requete.js';


const router = express.Router();

router.post('/create', createRequete);
router.get('/', getAllRequete);
router.get('/:id', getOneRequete);
router.patch('/:id', updateRequete);
router.delete('/:id', deleteRequete);
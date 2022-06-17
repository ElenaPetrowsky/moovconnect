// import express
import { express } from 'express';

import {getOneIdentificationSIM, getAllIdentificationSIM, createIdentificationSIM, 
        deleteIdentificationSIM, updateIdentificationSIM } from '../controllers/identificationSIM.js';


const router = express.Router();

router.post('/create', createIdentificationSIM);
router.get('/', getAllIdentificationSIM);
router.get('/:id', getOneIdentificationSIM);
router.patch('/:id', updateIdentificationSIM);
router.delete('/:id', deleteIdentificationSIM);

export default router;

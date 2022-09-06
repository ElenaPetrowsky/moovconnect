// import express
import  express  from 'express';

import {
        getOneIdentificationSIM, getAllIdentificationSIM, createIdentificationSIM, 
        deleteOneIdentificationSIM, updateIdentificationSIM
       } from '../controllers/identificationSIM.js';


const router = express.Router();

router.post('/create', createIdentificationSIM);
router.get('/', getAllIdentificationSIM);
router.get('/:id', getOneIdentificationSIM);
router.patch('/:id', updateIdentificationSIM);
router.delete('/:id', deleteOneIdentificationSIM);

export default router;

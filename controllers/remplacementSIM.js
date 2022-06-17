import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { isChiffre, isLettre } from './datavalidation.js'


const { PrismaClient } = Prisma
const prisma = new PrismaClient()

export const createRemplacementSIM = async (req, res) => {
    let error = null

    const {Phone, 
        Motif, 
        AncienICCID, 
        NewICCID, 
        TypePiece,
        NumPiece,
        NomCli,
        PrenomCli,
        DateNaissCli
    } = req.body
    
    if (!(isChiffre(AncienICCID)) || !(isChiffre(NewICCID)) || !(isChiffre(NumPiece))) {
        error = 'Erreur chiffre'
    }
    if(!(isLettre(NomCli)) || !(isLettre(PrenomCli))){
        error = "Erreur lettre"
    }

    if(error && error !==undefined){
        res.status(400).json({
            error:error
        })
    }
    var dateInStantT = new Date(Date.now()).toISOString;
   


}
export const getOneRemplacementSIM = async (req, res) => {}
export const getAllRemplacementSIM = async (req, res) => {}
export const updateRemplacementSIM = async (req, res) => {}
export const deleteOneRemplacementSIM = async (req, res) => {}
export const deleteMultipleRemplacementSIM = async (req, res) => {}



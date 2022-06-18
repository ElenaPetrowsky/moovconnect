import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { isChiffre, isLettre } from './datavalidation.js'


const { PrismaClient } = Prisma
const prisma = new PrismaClient()

export const createRemplacementSIM = async (req, res) => {
    let error = null

    const {NumMSISDN,Motif,AncienICCID,NewICCID, 
        TypePiece,NumPiece,NomCli,
        PrenomCli,DateNaisCli,Localisation,
    } = req.body
    
    if(NewICCID===undefined || NewICCID===""){
        error = "Le nouvel ICCID de la carte SIM doit être spécifié"
    }


    if(Motif===undefined || Motif===""){
        error = "Le motif de la demande doit être spécifié"
    }

    if(PrenomCli===undefined || PrenomCli==="" || ! isLettre(PrenomCli)){
        error = "Le prénom du demandeur est obligatoire, ne peut pas être vide et doit être uniquement contitué de lettres"
    }
    if(NomCli===undefined || NomCli==="" || ! isLettre(NomCli)){
        error = "Le nom du demandeur est obligatoire, ne peut pas être vide et doit être uniquement contitué de lettres"
    }
    if(error && error !==undefined){
        res.status(400).json({
            error:error
        })
    }
    var dateInStantT = new Date(Date.now()).toISOString();
   

    prisma.RemplacementSIM.create({
        data: {
            Id: uuidv4(),
            Reference: dateInStantT,
            Motif : Motif,
            AncienICCID: AncienICCID,
            NewICCID: NewICCID,
            DateNaisCli: DateNaisCli,
            NumMSISDN: NumMSISDN,
            TypePiece: TypePiece,
            NumPiece: NumPiece,
            Localisation: Localisation,
            CreatedBy: req.user.Id,
            UpdateBy: req.user.Id
        }
    }).then(data =>{
            res.status(200).send({
                message: "Enregistrement effectué avec succès"
        })
    }).catch(err =>{
        console.log(err)
        let error = "Une erreur interne au serveur s'est produite";
        let status = 500;

      })

}
export const getOneRemplacementSIM = async (req, res) => {
    const replacement = await prisma.RemplacementSIM.findMany({
        where: {
            CreatedBy: req.user.Id
        }
    }).then(data =>{
        return res.status(200).json({
            data:data
        })
    }).catch(err => {
        console.log(err)
        let error = "Une erreur interne au serveur s'est produite";
        let status = 500;
        res.status(status).json({
            error: error
        })
    })
}
export const getAllRemplacementSIM = async (req, res) => {
    const replacement = await prisma.RemplacementSIM.findMany({
        where: {
            CreatedBy: req.user.Id
        }
    }).then(data =>{
        return res.status(200).json({
            data:data
        })
    }).catch(err => {
        console.log(err)
        let error = "Une erreur interne au serveur s'est produite";
        let status = 500;
        res.status(status).json({
            error: error
        })
    })
}
export const updateRemplacementSIM = async (req, res) => {

}
export const deleteOneRemplacementSIM = async (req, res) => {}
export const deleteMultipleRemplacementSIM = async (req, res) => {}
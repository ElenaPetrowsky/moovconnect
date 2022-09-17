import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()

export const createRequete = async (req, res) => {
    let error = null
    const { Type, Motif, Description} = req.body

    if (Type === undefined || Type === "") {
        error = "Le type de la requete doit être spécifié"
    }

    if (Motif === undefined || Motif === "") {
        error = "Le motif de la requete doit être spécifié"
    }

    if (Description === undefined || Description === "" || Description === null) {
        error = "Veuillez décrire brièvement votre requete"
    }

    if (error && error !== undefined) {
        res.status(400).json({
            error: error
        })
    }


    prisma.requete.create({
        data: {
            Id : uuidv4(),
            CreatedBy: 'req.user.Id',
            UpdateBy: 'req.user.Id',
            Description: Description,
            Motif: Motif,
            Type: Type
        }
    }).then(data => {
        res.status(200).send({
            message: "Requete soumise avec succès",
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })

    })
}

export const getOneRequete = async (req, res) => {
    prisma.requete.findUnique({
        where: {
            Id: req.params.id
        }
    }).then(data => {
        return res.status(200).json({
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
        
    })
}
export const getAllRequete = async (req, res) => {
    prisma.requete.findMany({
        
    }).then(data => {
        if (data.length > 0) {
            return res.status(200).send({
                message: "Récupéré avec succès",
                data: data
            })
        } else {
            return res.status(404).send({
                message: "Aucune requete soumise"
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
    })
}

export const updateRequete = async (req, res) => {
    const { Motif, Type, Description } = req.body

    const updatedReq = {}

    if (Motif !== undefined && Motif !== "") {
        updatedReq.Motif = Motif
    }

    if (Type !== undefined && Type !== "") {
        updatedReq.Type = Type
    }

    if (Description !== undefined && Description !== "") {
        updatedReq.Description = Description
    }

    prisma.requete.update({
        where: {
            Id: req.params.id
        },
        data: updatedReq

    }).then(data => {
        return res.status(200).send({
            message: "Requete modifiée avec succès.",
            data: data
        })

    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite."
        })

    })

}

export const deleteOneRequete = async (req, res) => {

    prisma.requete.delete({
        where: {
            Id: req.params.id
        }
    }).then(data => {
        return res.status(200).send({
            message: "Requete supprimée avec succès",
            data: data
        })
    }).catch(err => {
        console.log(err)
        let error = "Une erreur interne au serveur s'est produite, veuillez réessayer plus tard"
        let status = 500

        if(err.code === "P2025"){
            if(err.meta.cause === "Record to delete does not exist."){
                error = "Requete déjà supprimée" 
            }              
            status = 400
        } 
        return res.status(status).send({
            error: error
        })
    })
}
export const deleteAllRequete = async (req, res) => {

    const { deletedReq } = req.body;

    prisma.requete.deleteMany({
        where: {
            Id: {in: deletedReq}
        }
    }).then(data => {
        return res.status(200).send({
            message: "Toutes les requetes ont été supprimé avec succès",
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
    })
}

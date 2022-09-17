import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { isNumPiece, isLettre, isChiffre } from './datavalidation.js'


const { PrismaClient } = Prisma
const prisma = new PrismaClient()

export const createRemplacementSIM = async (req, res) => {
    let error = null

    const {
        NumMSISDN, Motif, AncienICCID, NewICCID,
        TypePiece, NumPiece, DateNaisCli, Localisation
    } = req.body

    if (NewICCID === undefined || NewICCID === "") {
        error = "Le nouvel ICCID de la carte SIM doit être spécifié"
    }

    if (Motif === undefined || Motif === "") {
        error = "Le motif de la demande doit être spécifié"
    }

    if (error && error !== undefined) {
        res.status(400).json({
            error: error
        })
    }
    var dateInstantT = new Date(Date.now()).toISOString();

    prisma.RemplacementSIM.create({
        data: {
            Id: uuidv4(),
            Reference: dateInstantT,
            Motif: Motif,
            AncienICCID: AncienICCID,
            NewICCID: NewICCID,
            DateNaisCli: DateNaisCli,
            NumMSISDN: NumMSISDN,
            TypePiece: TypePiece,
            NumPiece: NumPiece,
            Localisation: Localisation,
            CreatedBy: 'req.User.Id',
            UpdateBy: 'req.user.Id'
        }
    }).then(data => {
        res.status(200).send({
            message: "Demande de remplacement de SIM effectué avec succès",
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })

    })//.finally(async () => {
    //     console.log(error)
    //     res.send(error)    
    // })

}

export const getOneRemplacementSIM = async (req, res) => {
    prisma.RemplacementSIM.findUnique({
        where: {
            CreatedBy: req.params.id
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

export const getAllRemplacementSIM = async (req, res) => {
    prisma.RemplacementSIM.findMany({
        // where: {
        //     CreatedBy: req.user.Id
        // }
    }).then(data => {
        if (data.length > 0) {
            return res.status(200).send({
                message: "Récupéré avec succès",
                data: data
            })
        } else {
            return res.status(404).send({
                message: "Aucun remplacement de SIM trouvé"
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
    })
}

export const updateRemplacementSIM = async (req, res) => {

    const {
        NumMSISDN, AncienICCID, NewICCID, Motif,
        TypePiece, NumPiece, DateNaisCli, Localisation,
    } = req.body

    const remplSIM = {}

    if (NumMSISDN !== undefined && NumMSISDN !== "" && isChiffre(NumMSISDN)) {
        remplSIM.NumMSISDN = NumMSISDN
    }

    if (AncienICCID !== undefined && AncienICCID !== "" && isChiffre(AncienICCID)) {
        remplSIM.AncienICCID = AncienICCID
    }

    if (NewICCID !== undefined && NewICCID !== "" && isChiffre(NewICCID)) {
        remplSIM.NewICCID = NewICCID
    }

    if (Motif !== undefined && Motif !== "" && isLettre(Motif)) {
        remplSIM.Motif = Motif
    }

    if (TypePiece !== undefined && TypePiece !== null) {
        remplSIM.TypePiece = TypePiece
    }

    if (NumPiece !== undefined && NumPiece !== "") {
        remplSIM.NumPiece = NumPiece
    }

    if (DateNaisCli !== undefined && DateNaisCli !== null) {
        remplSIM.DateNaisCli = DateNaisCli
    }

    if (Localisation !== undefined && Localisation !== "") {
        remplSIM.Localisation = Localisation
    }

    prisma.remplacementSIM.update({
        where: {
            Id: req.params.id
        },
        data: remplSIM

    }).then(data => {
        return res.status(200).send({
            message: "Modifié avec succès.",
            data: data
        })

    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite."
        })

    })

}

export const deleteOneRemplacementSIM = async (req, res) => {
    prisma.RemplacementSIM.delete({
        where: {
            Id: req.params.id
        }
    }).then(data => {
        return res.status(200).send({
            message: "Demande de remplacement de SIM supprimé avec succès",
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
    })


}
export const deleteMultipleRemplacementSIM = async (req, res) => {
    const { deletedRempl } = req.body;

    prisma.RemplacementSIM.deleteMany({
        where: {
            Id: {in: deletedRempl}
        }
    }).then(data => {
        return res.status(200).send({
            message: "Supprimé avec succès",
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
    })

}
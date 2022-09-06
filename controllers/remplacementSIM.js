import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { isNumPiece, isLettre, isChiffre } from './datavalidation.js'


const { PrismaClient } = Prisma
const prisma = new PrismaClient()

export const createRemplacementSIM = async (req, res) => {
    let error = null

    const {
        NumMSISDN, Motif, AncienICCID, NewICCID,
        TypePiece, NumPiece, NomCli,
        PrenomCli, DateNaisCli, Localisation,
    } = req.body

    if (NewICCID === undefined || NewICCID === "") {
        error = "Le nouvel ICCID de la carte SIM doit être spécifié"
    }

    if (Motif === undefined || Motif === "") {
        error = "Le motif de la demande doit être spécifié"
    }

    if (PrenomCli === undefined || PrenomCli === "" || !isLettre(PrenomCli)) {
        error = "Le prénom du demandeur est obligatoire, ne peut pas être vide et doit être uniquement contitué de lettres"
    }
    if (NomCli === undefined || NomCli === "" || !isLettre(NomCli)) {
        error = "Le nom du demandeur est obligatoire, ne peut pas être vide et doit être uniquement contitué de lettres"
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
            CreatedBy: req.user.Id,
            UpdateBy: req.user.Id
        }
    }).then(data => {
        res.status(200).send({
            message: "Enregistrement effectué avec succès",
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })

    })

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
        TypePiece, NumPiece, NomCli,
        PrenomCli, DateNaisCli, Localisation,
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

    if (NomCli !== undefined && NomCli !== "" && isLettre(NomCli)) {
        remplSIM.NomCli = NomCli
    }

    if (PrenomCli !== undefined && PrenomCli !== "" && isLettre(PrenomCli)) {
        remplSIM.PrenomCli = PrenomCli
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
        data: identifSIM

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
export const deleteMultipleRemplacementSIM = async (req, res) => {
    prisma.RemplacementSIM.deleteMany({
        where: {
            Id: In(req.body.Id)
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
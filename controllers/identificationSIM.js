import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { isChiffre, isLettre, isNumPiece } from './datavalidation.js'
import multer from 'multer'


const { PrismaClient } = Prisma
const prisma = new PrismaClient()

export const createIdentificationSIM = async (req, res) => {
    let error = null
    const img = uuidv4()
    const imgfile_verso = uuidv4()
    const imgfile_recto = uuidv4()
    

    const {
        NomCli,PrenomCli, DateNaisCli, LieuNaisCli, GenreCli,
        ProfCli, CiviliteCli, Nationalite, AdrGeoCli, Pays, AdrPostale,
        TelPrincipal, TelSecondaire, NumPiece, LieuPiece, DateExPiece, DateEmPiece, TypePiece,
        Photo, PhotoRecto, PhotoVerso
    } = req.body

    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "../images");
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + file.mimetype)
        }
    })
    
    const upload = multer({
        storage : fileStorage
    });
    

    if(NomCli === undefined || NomCli === "" || !isLettre(NomCli)){
        error = "Le nom du demandeur est obligatoire, ne peut pas être vide et doit être uniquement contitué de lettres"
    }

    if(PrenomCli === undefined || PrenomCli === "" || !isLettre(PrenomCli)){
        error = "Le prénom du demandeur est obligatoire, ne peut pas être vide et doit être uniquement contitué de lettres"
    }

    if(LieuNaisCli === undefined || LieuNaisCli === "" || !isLettre(LieuNaisCli)){
        error = "Le lieu de naissance doit être spécifié"
    }
    
    if(CiviliteCli === undefined || CiviliteCli === "" || !isLettre(CiviliteCli)){
        error = "La civilite doit être uniquement contitué de lettres"
    }

    if(ProfCli === undefined || ProfCli === "" || !isLettre(ProfCli)){
        error = "Le profession est obligatoire, ne peut pas être vide et doit être uniquement contitué de lettres"
    }

    if(AdrGeoCli === undefined || AdrGeoCli === "" || !isLettre(AdrGeoCli)){
        error = "L'adresse géographique doit être spécifiée et pas constituée de chiffres"
    }

    if(NumPiece === undefined || NumPiece === "" || isNumPiece(NumPiece)){
        error = "Le numéro de la pièce doit être spécifié"
    }

    if(TypePiece === undefined || TypePiece === ""){
        error = "Le type de la pièce choisit doit être spécifiée"
    }

    if(ProfCli === undefined || Nationalite === "" || !isLettre(Nationalite)){
        error = "La nationalité est obligatoire et doit être uniquement constitué de lettres"
    }

    if(GenreCli === undefined || GenreCli === ""){
        error = "Le genre doit être spécifié"
    }
    
    if(Photo === null || Photo === undefined){
        error = "La photo du requérant est necessaire"
    }

    if(PhotoRecto === null || PhotoRecto === undefined){
        error = "Le recto de la pièce d'identité est necessaire"
    }

    if(PhotoVerso === null || PhotoVerso === undefined){
        error = "Le verso de la pièce d'identité est necessaire"
    }
    
    if(error && error !== undefined){
        res.status(400).json({
            error: error
        })
    }
    
    prisma.identificationSIM.create({
        data: {
            Id: uuidv4(),
            TelPrincipal: TelPrincipal,
            TelSecondaire: TelSecondaire,
            TypePiece: TypePiece,
            NumPiece: NumPiece,
            LieuPiece: LieuPiece,
            DateExPiece: DateExPiece,
            DateEmPiece: DateEmPiece,
            CiviliteCli: CiviliteCli,
            GenreCli: GenreCli,
            NomCli: NomCli,
            PrenomCli: PrenomCli,
            LieuNaisCli: LieuNaisCli,
            DateNaisCli: DateNaisCli,
            ProfCli: ProfCli,
            AdrGeoCli: AdrGeoCli,
            Nationalite: Nationalite,
            Photo: img,
            PhotoVerso: imgfile_verso,
            PhotoRecto: imgfile_recto,
            AdrPostale: AdrPostale,
            Pays: Pays,
            GenreCli: GenreCli,
            CreatedBy: 'req.user.Id',
            UpdateBy: 'req.user.Id'
        }
    }).then(data =>{
            res.status(200).send({
                message: "Enregistrement effectué avec succès",
                data: data
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
        // res.status(400).json({
        //     error : {
        //         message : err.message
        //     }
        // })        

      })

}
export const getOneIdentificationSIM = async (req, res) => {
    prisma.identificationSIM.findUnique({ //before --> findMany
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

export const getAllIdentificationSIM = async (req, res) => {
    prisma.identificationSIM.findMany({}).then(data => {
        if(data.length > 0){
            return res.status(200).send({
                message: "Récupérée avec succès",
                data: data
            })
        }else{
            return res.status(404).send({
                message: "Aucune identification de SIM trouvée"
            })
        }
    }).catch(err => {
        console.log(err)    
        res.status(500).json({
            error: "Une erreur interne au serveur s'est produite"
        })
    })
}

export const updateIdentificationSIM = async (req, res) => {
   
    const {
        NomCli,PrenomCli, DateNaisCli, LieuNaisCli, GenreCli,
        ProfCli, CiviliteCli, Nationalite, AdrGeoCli, Pays, AdrPostale,
        TelPrincipal, TelSecondaire, NumPiece, LieuPiece, DateExPiece,
        DateEmPiece, TypePiece, Photo, PhotoRecto, PhotoVerso
    } = req.body

    const identifSIM = {}

    identifSIM.AdrPostale = AdrPostale
    identifSIM.Pays = Pays        

    if(NomCli !== undefined && NomCli !== "" && isLettre(NomCli)){
        identifSIM.NomCli = NomCli
    }

    if(PrenomCli !== undefined && PrenomCli !== "" && isLettre(PrenomCli)){
        identifSIM.PrenomCli = PrenomCli
    }

    if(DateNaisCli !== undefined && DateNaisCli !== ""){
        identifSIM.DateNaisCli = DateNaisCli
    }

    if(LieuNaisCli !== undefined && LieuNaisCli !== "" && isLettre(LieuNaisCli)){
        identifSIM.LieuNaisCli = LieuNaisCli
    }
    
    if(CiviliteCli !== undefined && CiviliteCli !== "" && isLettre(CiviliteCli)){
        identifSIM.CiviliteCli = CiviliteCli
    }

    if(ProfCli !== undefined && ProfCli !== "" && isLettre(ProfCli)){
        identifSIM.ProfCli = ProfCli
    }

    if(Nationalite !== undefined && Nationalite !== "" && isLettre(Nationalite)){
        identifSIM.Nationalite = Nationalite
    }

    if(AdrGeoCli !== undefined && AdrGeoCli !== "" && isLettre(AdrGeoCli)){
        identifSIM.AdrGeoCli = AdrGeoCli
    }

    // if(Pays !== undefined && Pays !== "" && isLettre(Pays)){
    // }

    // if(AdrPostale !== undefined && AdrPostale !== ""){
    // }

    if(TelPrincipal !== undefined && TelPrincipal !== ""){
        identifSIM.TelPrincipal = TelPrincipal
    }

    if(TelSecondaire !== undefined && TelSecondaire !== ""){
        identifSIM.TelSecondaire = TelSecondaire
    }

    if(NumPiece !== undefined && NumPiece !== "" && isNumPiece(NumPiece)){
        identifSIM.NumPiece = NumPiece
    }
    
    if(LieuPiece !== undefined && LieuPiece !== ""){
        identifSIM.LieuPiece = LieuPiece
    }

    if(DateEmPiece !== undefined && DateEmPiece !== "" && DateEmPiece !== null){
        identifSIM.DateEmPiece = DateEmPiece
    }

    if(DateExPiece !== undefined && DateExPiece !== "" && DateExPiece !== null){
        identifSIM.DateExPiece = DateExPiece
    }

    if(TypePiece !== undefined && TypePiece !== ""){
        identifSIM.TypePiece = TypePiece
    }

    if(GenreCli !== undefined && GenreCli !== ""){
        identifSIM.GenreCli = GenreCli
    }

    if(Photo !== undefined && Photo !== ""){
        identifSIM.Photo = Photo
    }

    if(PhotoRecto !== undefined && PhotoRecto !== ""){
        identifSIM.PhotoRecto = PhotoRecto
    }
    if(PhotoVerso !== undefined && PhotoVerso !== ""){
        identifSIM.PhotoVerso = PhotoVerso
    }


    prisma.identificationSIM.update({
        where: {
            Id: req.params.Id
        },
        data: identifSIM
    
    }).then(data=>{
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
export const deleteOneIdentificationSIM = async (req, res) => {
    prisma.identificationSIM.delete({
        where: {
            CreatedBy: req.user.Id           
        }
    }).then(data =>{
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
export const deleteMultipleIdentificationSIM = async (req, res) => {}
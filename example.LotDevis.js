import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { isInt } from './errorVerif.js';
const { PrismaClient } = Prisma

const prisma = new PrismaClient();

export const getAllLotDevis = async (req, res) => { 
    prisma.LotDevis.findMany({
    }).then(data=>{
        if(data.length>0){
            return res.status(200).send({
                message:"Récupéré avec succès",
                data:data
            })
        }else{
            return res.status(404).send({
                message:'Aucun lot devis trouvé, veuillez en inserer'
            })
        }
    }).catch(err=>{
        console.log(err)
        return res.status(500).send({
            error:"Une erreur interne au serveur s'est produite, veuillez réessayer plus tard"
        })
    })
};

export const getOneLotDevis = async (req, res) => { 
    const id = req.params.id;

    prisma.LotDevis.findUnique({
        where:{
            ID:id
        },
        include:{
            LigneDevis:true,
            LigneFacture:true,
        }
    }).then((data)=>{
        if(data){
            data.ListOfLigneDevis = data.LigneDevis;
            data.ListOfLigneFacture = data.LigneFacture;
            delete data.LigneDevis;
            delete data.LigneFacture;
            return res.status(200).send({
                data:data
            })
        }else{
            return res.status(404).send({
                error:`Aucun lot de devis trouvé avec l'identifiant ${id}`
            })
        }
    }).catch((err)=>{
        console.log(err)
        let error = "Une erreur interne au serveur s'est produite, veuillez réessayer plus tard"
        let status = 500
        return res.status(status).send({
            error:error
        })
    })
};

export const createLotDevis = async (req, res) => {
    const {
        Intitule, Description, Devis, DateDebutPrevisionnelle, DateFinPrevisionnelle, 
        DateDebutReelle, DateFinReelle, Statut
    } = req.body;

    let error = null;

    if(Statut === undefined || Statut === null || Statut === "" || !isInt(Statut)){
        error = "Le status est obligatoire et ne peut être vide, il doit être un entier"
    }
    if(Devis === undefined || Devis === null || Devis === ""){
        error = "Veuillez spécifier le devis associé au lot"
    }

    if(Intitule === undefined || Intitule === null || Intitule === ""){
        error = "L'intitulé du lot est obligatoire et ne peut être vide"
    }

    if(DateDebutPrevisionnelle !==undefined && (DateDebutPrevisionnelle ===null || DateDebutPrevisionnelle ==="")){
        error = "La valeur définie pour la date de début prévisionnelle est invalide, la chaine vide n'est pas autorisée"
    }
    if(DateFinPrevisionnelle !==undefined && (DateFinPrevisionnelle ===null || DateFinPrevisionnelle ==="")){
        error = "La valeur définie pour la date de fin prévisionnelle est invalide, la chaine vide n'est pas autorisée"
    }
    if(DateDebutReelle !==undefined && (DateDebutReelle ===null || DateDebutReelle ==="")){
        error = "La valeur définie pour la date de début réelle est invalide, la chaine vide n'est pas autorisée"
    }
    if(DateFinReelle !==undefined && (DateFinReelle ===null || DateFinReelle ==="")){
        error = "La valeur définie pour la date de fin réelle est invalide, la chaine vide n'est pas autorisée"
    }


    if(error){
        return res.status(400).send({
            error:error
        })
    }
    const ID = uuidv4();
    const date = new Date(Date.now());
    const lotdevis = {
        ID:ID,
        Intitule:Intitule,
        Description:Description,
        Devis:Devis,
        DateDebutPrevisionnelle:DateDebutPrevisionnelle,
        DateFinPrevisionnelle:DateFinPrevisionnelle,
        DateDebutReelle:DateDebutReelle,
        DateFinReelle:DateFinReelle,
        Statut:Statut,
        CreatedOn:date,
        ModifiedOn:date
    //  CreatedBy:req.user.ID,
    //  ModifiedBy:req.user.ID,
    }
    
    prisma.LotDevis.create({
        data:lotdevis
    }).then(data=>{
        return res.status(201).send({
            message:"Lot de devis créé avec succès",
            data:data
        })
    }).catch((err)=>{
        console.log(err)
        let error = "Une erreur interne au serveur s'est produite, veuillez réessayer plus tard"
        let status = 500

        if(err.code === "P2002"){
            if(err.meta.target==="Entite_Reference_key"){
                error = "Une entité avec cette référence existe déjà"   
            }else if(err.meta.target ==="LotDevis_Reference_key"){
                error = "Un lotdevis avec cette référence existe déjà"
            }
            status = 400
        }        
        if(err.code === "P2003"){
            if(err.meta.field_name==='Devis'){
                error = `Aucun devis trouvé avec l'identifiant '${Devis}'`
            }
            status = 400
        }
        return res.status(status).send({
            error:error
        })
    }).finally(()=>{
        prisma.$disconnect()
        console.log("Database engine disconnected")
    })
    
};

export const updateLotDevis = async (req, res) => { 
    const id = req.params.id
    
    const { 
        Intitule, Description, Devis, DateDebutPrevisionnelle, DateFinPrevisionnelle, 
        DateDebutReelle, DateFinReelle, Statut
    } = req.body;
    
    const lotdevis = {}
    const date = new Date(Date.now())

    if(Intitule !==undefined && Intitule !==null && Intitule !==""){
        lotdevis.Intitule = Intitule
    }
    if(Description !==undefined && Description !==null && Description !==""){
        lotdevis.Description = Description
    }
    if(Devis !==undefined && Devis !==null && Devis !==""){
        lotdevis.Devis = Devis
    }
    if(DateDebutPrevisionnelle !==undefined && DateDebutPrevisionnelle !==null && DateDebutPrevisionnelle !==""){
        lotdevis.DateDebutPrevisionnelle = DateDebutPrevisionnelle
    }
    if(DateFinPrevisionnelle !==undefined && DateFinPrevisionnelle !==null && DateFinPrevisionnelle !==""){
        lotdevis.DateFinPrevisionnelle = DateFinPrevisionnelle
    }
    if(DateDebutReelle !==undefined && DateDebutReelle !==null && DateDebutReelle !==""){
        lotdevis.DateDebutReelle = DateDebutReelle
    }
    if(DateFinReelle !==undefined && DateFinReelle !==null && DateFinReelle !==""){
        lotdevis.DateFinReelle = DateFinReelle
    }
    if(Statut !==undefined && Statut !==null && Statut !==""){
        lotdevis.Statut = Statut
    }

    lotdevis.ModifiedOn = date;
    //  CreatedBy:req.user.ID,
    //  ModifiedBy:req.user.ID,
    
    prisma.LotDevis.update({
        where:{
            ID:id
        },
        data:lotdevis
    }).then(data=>{
        return res.status(200).send({
            message:"Le lot de devis a été modifié avec succès"
        })
    }).catch((err)=>{
        console.log(err)
        let error = "Une erreur interne au serveur s'est produite, veuilez réessayer plus tard"
        let status = 500
        if(err.code==="P2003"){
            if(err.meta.field_name ==="Devis"){
                error = "Aucun devis n'a été trouvé avec l'identifiant '"+Devis+"'"
            }
            status = 400
        }
        return res.status(status).send({
            error:error
        })
    })
};

export const deleteLotDevis = async (req, res) => {
     
    const { listOfLotDevis } = req.body;
        
    if(!listOfLotDevis || !listOfLotDevis.length>0){
        return res.status(400).send({
            error:"Au moins un lotdevis doit être spécifié dans la requette "
        })
    }
    prisma.LotDevis.deleteMany({
        where:{
            ID:{
                in:listOfLotDevis
            }
        }
    }).then((data)=>{
        let message = "Suppression effectuée avec succès"
        if(data.count == 0){
            message = "Aucun élément n'a été supprimé, veuillez verifier les identifiants sélectionnés"
        }
        return res.status(200).send({
            message:message,
            data:data
        })
    }).catch(err=>{
        console.log(err)
        let error = "Une erreur interne au serveur est survenue"
        let status = 500
        if(err.code ==="P2003"){
            let fname = err.meta.field_name;
            if(fname==="LotDevis"){
                error = "Impossible de supprimer ce lot de Devis car il est associé à une ligne devis et/ou à une ligne facture"
            }
        }
        return res.status(status).send({
            error:error
        })
    }).finally(()=>{
        prisma.$disconnect();
        console.log("Disconnected from the server")
    })
};
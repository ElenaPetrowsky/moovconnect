import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()

export const getAllUser = async (req, res) => {
    //get all users
    prisma.user.findMany({
    }).then(data=>{
        if(data.length>0){
            return res.status(200).send({
                message: "Récupéré avec succès",
                data: data
            })
        }else{
            return res.status(404).send({
                message: 'Aucun lot devis trouvé, veuillez en inserer'
            })
        }
    }).catch(err=>{
        console.log(err)
        return res.status(500).send({
            error:"Une erreur interne au serveur s'est produite, veuillez réessayer plus tard"
        })
    })    


}
export const getOneUser = async (req, res) => {
    // return res.send('getOneUserUser')
    prisma.user.findUnique({
        where:{
            Id: req.params.id            
        }
    })

}
export const updateUser = async (req, res) => {}
export const deleteOneUser = async (req, res) => {}
export const deleteMultipleUser = async (req, res) => {}

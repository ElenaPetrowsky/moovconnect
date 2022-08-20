import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { sendMessage } from './datavalidation.js'

const { PrismaClient } = Prisma

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
    let error = null
    const {Phone} = req.body

    const reg = /^\d{10}$/
    if (!reg.test(Phone)) {
        error = 'Le format du numéro de téléphone est incorrect'
    }

    if(!Phone || Phone===undefined) {
        error = "Veuillez rensigner le numéro de téléphone"
    }

    if(error && error !==undefined){
        res.status(400).json({
            error:error
        })
    }
    const oldUser = await prisma.user.findFirst({
        where: {
            Phone: Phone
        }
    })

    // if(oldUser) {
    //     res.status(400).json({
    //         error: "Ce numéro de téléphone est déjà utilisé"
    //     })
    // }
    const otp = Math.floor(Math.random() * 10000)
    if(!oldUser) {
        const user = await prisma.user.create({
            data: {
                Id: uuidv4(),
                Phone: Phone,
                IsActivated: false,
                RelatedOtp: otp.toString()
            }
        }).then(data =>{
            return res.status(200).json({
                state:true,
                message: "Veuillez renseigner le code de vérification reçu par SMS"
            })
        }).catch(err => {
            console.log(err)
            let error = "Une erreur interne au serveur s'est produite";
            let status = 500;
            res.status(status).json({
                error: error
            })
          })
    }else{
        const user = await prisma.user.update({
            where: {
                Id: oldUser.Id
            },
            data: {
                IsActivated: false,
                RelatedOtp: otp.toString()
            }
        }).then(data =>{
            sendMessage(`${data.Phone}`, `MOOV CONNECT\nCher(e) client(e), votre code de vérification est ${data.RelatedOtp}`)
            return res.status(200).json({
                state:true,
                message: "Veuillez renseigner le code de vérification reçu par SMS"
            })
        })
          .catch(err=>{
            console.log(err)
            let error = "Une erreur interne au serveur s'est produite";
            let status = 500;
            res.status(status).json({
                error: error
            })
          })
    }
    console.log(otp)

}

export const verifyUser = async (req, res) => {
    const {Phone, otp} = req.body
    let user = await prisma.user.findUnique({
        where: {
            Phone: Phone
        }
    }).then(data=>{
        if(data.RelatedOtp === otp) {
            return res.status(200).json({
                state:true,
                message: "Votre compte a été activé avec succès"
            })
        }else{
            return res.status(200).json({
                state:false,
                message: "Le code de vérification est incorrect"
            })
        }
    })
    // if(otp != user.RelatedOtp) {
    //     res.status(400).json({
    //         state:false,
    //         error: "Le code de vérification est incorrect, veuillez réessayer"
    //     })
    // }
    user = await prisma.user.update({
        where: {
            Id: user.Id
        },
        data: {
            IsActivated: true,
            RelatedOtp:""
        }
    }).then(data =>{
        const accessToken = jwt.sign(
            user,
            process.env.JWT_SECRET,
            {
              expiresIn: "10m",
            }
        )
        return res.status(200).json({
                state: true,
                message: "Votre numéro de téléphone a été vérifié",
                accessToken: accessToken,
            })
    }).catch(err=>{
        
    })

}
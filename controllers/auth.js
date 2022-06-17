import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

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
    const otp = Math.floor(Math.random() * 1000000)
    if(!oldUser) {
        const user = await prisma.user.create({
            data: {
                Id: uuidv4(),
                Phone: Phone,
                IsActivated: false,
                RelatedOtp: otp.toString()
            }
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
        })
    }
    console.log(otp)
    //sendSMS(`225${user.Phone}`, `MOOV CONNECT\nCher(e) client(e), votre code de vérification est ${user.Otp}`)
    res.status(200).json({
        message: "Veuillez renseigner le code de vérification reçu par SMS"
    })

}

export const verifyUser = async (req, res) => {
    const {Phone, otp} = req.body
    let user = await prisma.user.findUnique({
        where: {
            Phone: Phone
        }
    })
    if(otp != user.RelatedOtp) {
        res.status(400).json({
            error: "Le code de vérification est incorrect, veuillez réessayer"
        })
    }
    user = await prisma.user.update({
        where: {
            Id: user.Id
        },
        data: {
            IsActivated: true,
            RelatedOtp:""
        }
    })
    const accessToken = jwt.sign(
        user,
        process.env.JWT_SECRET,
        {
          expiresIn: "10m",
        }
      );

    res.status(200).json({
        accessToken: accessToken,
        message: "Votre numéro de téléphone a été vérifié"
    })
}
import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

const { PrismaClient } = Prisma

const prisma = new PrismaClient()

export const getAllUser = async (req, res) => {}
export const getOneUser = async (req, res) => {
    return res.send('getOneUserUser')
}
export const updateUser = async (req, res) => {}
export const deleteOneUser = async (req, res) => {}
export const deleteMultipleUser = async (req, res) => {}
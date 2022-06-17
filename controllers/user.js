import Prisma from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
const { PrismaClient } = Prisma

const prisma = new PrismaClient

export const createUser = async (req, res) => {}
export const gelAllUserUser = async (req, res) => {}
export const getOneUserUser = async (req, res) => {}
export const updateUser = async (req, res) => {}
export const deleteOneUser = async (req, res) => {}
export const deleteMultipleUser = async (req, res) => {}
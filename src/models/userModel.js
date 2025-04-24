import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Esquema de validação base para usuário
const baseUserSchema = {
  name: z.string().min(1, 'O nome é obrigatório').max(100, 'O nome deve ter no máximo 100 caracteres'),
  email: z.string().email('E-mail inválido'),
  pass: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
}

// Esquema de validação para usuário
export const userSchema = {
  id: z.coerce.number().int().positive('ID deve ser um número inteiro positivo'),
  create: z.object({
    ...baseUserSchema
  }),
  update: z.object({
    ...Object.entries(baseUserSchema).reduce((acc, [key, schema]) => {
      acc[key] = schema.optional()
      return acc
    }, {})
  })
}

// Função de validação
export const validate = (schema, data) => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const formatted = result.error.format()
    throw { message: 'Erro de validação', errors: formatted }
  }
  return result.data
}

export const create = async (user) => {
  const validatedData = validate(userSchema.create, user)
  const newUser = await prisma.user.create({
    data: validatedData
  })
  return newUser
}

export const findAll = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      pass: false
    }
  })
  return users
}

export const findById = async (id) => {
  const validatedId = validate(userSchema.id, id)
  const user = await prisma.user.findUnique({
    where: {
      id: validatedId
    },
    select: {
      id: true,
      name: true,
      email: true,
      pass: false
    }
  })
  return user
}

export const update = async (id, user) => {
  const validatedId = validate(userSchema.id, id)
  const validatedData = validate(userSchema.update, user)
  
  const updatedUser = await prisma.user.update({
    where: {
      id: validatedId
    },
    data: validatedData,
    select: {
      id: true,
      name: true,
      email: true,
      pass: false
    }
  })
  return updatedUser
}

export const remove = async (id) => {
  const validatedId = validate(userSchema.id, id)
  await prisma.user.delete({
    where: {
      id: validatedId
    }
  })
  return true
}
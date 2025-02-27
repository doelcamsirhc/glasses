'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Product {
  id: string
  model: string
  description: string
  price: number
  quantity: number
}

export async function addProduct(data: FormData) {
  const model = data.get('model') as string
  const description = data.get('description') as string
  const price = parseFloat(data.get('price') as string)
  const quantity = parseInt(data.get('quantity') as string)

  await prisma.product.create({
    data: { model, description, price, quantity },
  })
}

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany()
}

export async function updateProduct(data: FormData) {
  const id = data.get('id') as string
  const model = data.get('model') as string
  const description = data.get('description') as string
  const price = parseFloat(data.get('price') as string)
  const quantity = parseInt(data.get('quantity') as string)

  await prisma.product.update({
    where: { id },
    data: { model, description, price, quantity },
  })
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  })
}

export async function fetchProducts(): Promise<Product[]> {
  return await prisma.product.findMany()
}
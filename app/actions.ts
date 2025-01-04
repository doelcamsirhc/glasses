'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addProduct(data: FormData) {
  try {
    const model = data.get('model') as string
    const description = data.get('description') as string
    const price = parseFloat(data.get('price') as string)
    const quantity = parseInt(data.get('quantity') as string)

    if (!model || !description || isNaN(price) || isNaN(quantity)) {
      throw new Error('Invalid input data')
    }

    await prisma.product.create({
      data: { model, description, price, quantity },
    })
  } catch (error) {
    console.error('Error adding product:', error)
    throw new Error(`Failed to add product: ${error.message}`)
  }
}

export async function getProducts() {
  try {
    return await prisma.product.findMany()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error(`Failed to fetch products: ${error.message}`)
  }
}

export async function updateProduct(data: FormData) {
  try {
    const id = data.get('id') as string
    const model = data.get('model') as string
    const description = data.get('description') as string
    const price = parseFloat(data.get('price') as string)
    const quantity = parseInt(data.get('quantity') as string)

    if (!id || !model || !description || isNaN(price) || isNaN(quantity)) {
      throw new Error('Invalid input data')
    }

    await prisma.product.update({
      where: { id },
      data: { model, description, price, quantity },
    })
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}


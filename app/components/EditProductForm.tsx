'use client'

import { useState } from 'react'
import { updateProduct } from '../actions'

interface Product {
  id: string
  model: string
  description: string
  price: number
  quantity: number
}

interface EditProductFormProps {
  product: Product
  onProductUpdated: () => void
}

export function EditProductForm({ product, onProductUpdated }: EditProductFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  async function handleSubmit(formData: FormData) {
    await updateProduct(formData)
    setIsEditing(false)
    onProductUpdated()
  }

  if (!isEditing) {
    return (
      <button onClick={() => setIsEditing(true)} className="text-indigo-600 hover:text-indigo-900">
        Edit
      </button>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" value={product.id} />
      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
        <input type="text" id="model" name="model" defaultValue={product.model} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" name="description" defaultValue={product.description} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" id="price" name="price" step="0.01" defaultValue={product.price} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input type="number" id="quantity" name="quantity" defaultValue={product.quantity} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
        <button type="button" onClick={() => setIsEditing(false)} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
      </div>
    </form>
  )
}
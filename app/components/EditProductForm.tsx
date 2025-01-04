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

export function EditProductForm({ product, onCancel }: { product: Product, onCancel: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    try {
      await updateProduct(formData)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to update product')
    } finally {
      setLoading(false)
    }
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
        <input type="text" id="description" name="description" defaultValue={product.description} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" id="price" name="price" defaultValue={product.price} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input type="number" id="quantity" name="quantity" defaultValue={product.quantity} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <div className="flex space-x-4">
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button type="button" onClick={() => { setIsEditing(false); onCancel(); }} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
          Cancel
        </button>
      </div>
    </form>
  )
}
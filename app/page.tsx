'use client'

import { useState, useEffect } from 'react'
import { ProductForm } from './components/ProductForm'
import { ProductList } from './components/ProductList'
import { fetchProducts } from './actions'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refreshProducts() {
    try {
      const fetchedProducts = await fetchProducts()
      setProducts(fetchedProducts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Management</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h2>
        <ProductForm onProductAdded={refreshProducts} />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Product List</h2>
        <ProductList products={products} onProductUpdated={refreshProducts} />
      </div>
    </div>
  )
}
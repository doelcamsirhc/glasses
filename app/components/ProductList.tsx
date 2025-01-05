import { EditProductForm } from './EditProductForm'
import { deleteProduct } from '../actions'

interface Product {
  id: string
  model: string
  description: string
  price: number
  quantity: number
}

interface ProductListProps {
  products: Product[]
  onProductUpdated: () => void
}

export function ProductList({ products, onProductUpdated }: ProductListProps) {
  async function handleDelete(id: string) {
    await deleteProduct(id)
    onProductUpdated()
  }

  return (
    <ul className="divide-y divide-gray-200">
      {products.map((product) => (
        <li key={product.id} className="py-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{product.model}</h3>
              <p className="mt-1 text-sm text-gray-600">{product.description}</p>
              <p className="mt-1 text-sm text-gray-900">Price: ${product.price.toFixed(2)}</p>
              <p className="mt-1 text-sm text-gray-900">Quantity: {product.quantity}</p>
            </div>
            <div className="flex space-x-2">
              <EditProductForm product={product} onProductUpdated={onProductUpdated} />
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
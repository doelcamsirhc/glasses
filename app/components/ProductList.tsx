import { EditProductForm } from './EditProductForm'

interface Product {
  id: string
  model: string
  description: string
  price: number
  quantity: number
}

export function ProductList({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="text-gray-600">No products available.</p>
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
            <EditProductForm product={product} onCancel={() => {}} />
          </div>
        </li>
      ))}
    </ul>
  )
}
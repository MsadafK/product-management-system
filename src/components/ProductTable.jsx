import { useState } from 'react';
import { Edit2, Package, Trash2 } from 'lucide-react';


const ProductTable = ({ products, onEdit, onDelete }) => {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (productId) => {
    setImgErrors(prev => ({ ...prev, [productId]: true }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                    {!imgErrors[product.id] && product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        onError={() => handleImgError(product.id)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{product.price}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    product.stock > 50 ? 'bg-green-100 text-green-700' : 
                    product.stock > 20 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>{product.stock}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{product.description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
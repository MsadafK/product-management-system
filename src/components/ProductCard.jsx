import { useState } from 'react';
import { Edit2, Package, Trash2 } from 'lucide-react';


const ProductCard = ({ product, onEdit, onDelete }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {!imgError && product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Package className="w-20 h-20 text-gray-300" />
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => onEdit(product)}
            className="bg-white p-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="bg-white p-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-red-50 transition-all duration-200 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹{product.price}</span>
          <span className="text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full shadow-sm">{product.category}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">Stock</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            product.stock > 50 ? 'bg-green-100 text-green-700' : 
            product.stock > 20 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'
          }`}>{product.stock} units</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
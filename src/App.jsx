import React, { useState, useCallback } from 'react';
import { Search, Grid, List, Plus, Edit2, X, Package, Trash2 } from 'lucide-react';
import SearchBar from './components/SearchBar.jsx';
import ViewToggle from './components/ViewToggle.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductTable from './components/ProductTable.jsx';
import Pagination from './components/Pagination.jsx';
import ProductForm from './components/ProductForm.jsx';

// Sample initial products with images
const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    price: 2999, 
    category: 'Electronics', 
    stock: 45, 
    description: 'High-quality wireless headphones with noise cancellation',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  { 
    id: 2, 
    name: 'Running Shoes', 
    price: 3499, 
    category: 'Sports', 
    stock: 30, 
    description: 'Comfortable running shoes for daily workout',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
  },
  { 
    id: 3, 
    name: 'Coffee Maker', 
    price: 4999, 
    category: 'Appliances', 
    stock: 20, 
    description: 'Automatic coffee maker with timer',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop'
  },
  { 
    id: 4, 
    name: 'Yoga Mat', 
    price: 799, 
    category: 'Sports', 
    stock: 60, 
    description: 'Non-slip yoga mat with carrying strap',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop'
  },
  { 
    id: 5, 
    name: 'Desk Lamp', 
    price: 1299, 
    category: 'Home', 
    stock: 35, 
    description: 'LED desk lamp with adjustable brightness',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop'
  },
  { 
    id: 6, 
    name: 'Backpack', 
    price: 1899, 
    category: 'Accessories', 
    stock: 50, 
    description: 'Water-resistant backpack with laptop compartment',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
  },
  { 
    id: 7, 
    name: 'Smart Watch', 
    price: 8999, 
    category: 'Electronics', 
    stock: 25, 
    description: 'Fitness tracker with heart rate monitor',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
  },
  { 
    id: 8, 
    name: 'Water Bottle', 
    price: 499, 
    category: 'Accessories', 
    stock: 100, 
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop'
  },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(INITIAL_PRODUCTS);
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = 6;

  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [products]);

  const handleSaveProduct = (productData) => {
    if (productData.id) {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
      setFilteredProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      const newProduct = { ...productData, id: Date.now() };
      setProducts(prev => [...prev, newProduct]);
      setFilteredProducts(prev => [...prev, newProduct]);
    }
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setFilteredProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your product inventory with ease</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar onSearch={handleSearch} />
          <ViewToggle view={view} onToggle={setView} />
        </div>

        {paginatedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-700 text-xl font-semibold mb-2">No products found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or add a new product</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <ProductTable products={paginatedProducts} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
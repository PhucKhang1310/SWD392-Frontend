import { Edit, Trash2, Plus, Search } from "lucide-react";
import { useState } from "react";

export function ProductManagement({ products, onUpdateProducts }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleDeleteProduct = (productId) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      onUpdateProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(null);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p,
    );
    onUpdateProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleAddNewProduct = () => {
    setNewProduct({
      id: Date.now(),
      name: "",
      price: 0,
      originalPrice: 0,
      category: "laptop",
      stock: 0,
      image: "https://via.placeholder.com/150",
      description: "",
      rating: 5,
      reviews: 0,
    });
    setEditingProduct(null);
  };

  const handleSaveNewProduct = (e) => {
    e.preventDefault();
    onUpdateProducts([...products, newProduct]);
    setNewProduct(null);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (editingProduct) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Chỉnh sửa sản phẩm</h3>
          <button
            onClick={() => setEditingProduct(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            Hủy
          </button>
        </div>

        <form onSubmit={handleSaveProduct} className="max-w-2xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên sản phẩm
              </label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Danh mục
              </label>
              <select
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="laptop">Laptop</option>
                <option value="phone">Phone</option>
                <option value="tablet">Tablet</option>
                <option value="audio">Audio</option>
                <option value="accessories">Accessories</option>
                <option value="monitor">Monitor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giá
              </label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giá gốc
              </label>
              <input
                type="number"
                value={editingProduct.originalPrice || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    originalPrice: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tồn kho
              </label>
              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    );
  }

  if (newProduct) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Thêm sản phẩm mới</h3>
          <button
            onClick={() => setNewProduct(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            Hủy
          </button>
        </div>

        <form onSubmit={handleSaveNewProduct} className="max-w-2xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên sản phẩm
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Danh mục
              </label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="laptop">Laptop</option>
                <option value="phone">Phone</option>
                <option value="tablet">Tablet</option>
                <option value="audio">Audio</option>
                <option value="accessories">Accessories</option>
                <option value="monitor">Monitor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Hình ảnh
              </label>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giá bán
              </label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giá gốc
              </label>
              <input
                type="number"
                value={newProduct.originalPrice || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    originalPrice: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tồn kho
              </label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả sản phẩm
            </label>
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">
            Danh sách sản phẩm ({filteredProducts.length})
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Quản lý tất cả sản phẩm trong cửa hàng
          </p>
        </div>
        <button
          onClick={handleAddNewProduct}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
        >
          <option value="all">Tất cả danh mục</option>
          <option value="laptop">Laptop</option>
          <option value="phone">Phone</option>
          <option value="tablet">Tablet</option>
          <option value="audio">Audio</option>
          <option value="accessories">Accessories</option>
          <option value="monitor">Monitor</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Sản phẩm
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Giá
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Danh mục
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Kho
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-semibold text-sm line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-red-600">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      {product.originalPrice.toLocaleString("vi-VN")} ₫
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold ${
                      product.stock > 20
                        ? "text-green-600"
                        : product.stock > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
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
}

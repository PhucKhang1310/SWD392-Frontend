import { Package, Eye } from "lucide-react";

export function ProductList({ products, onViewProduct }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-6 h-6 text-red-600" />
          Danh sách sản phẩm
        </h2>
        <p className="text-sm text-gray-600">
          Tổng số: {products.length} sản phẩm
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
                #{product.id}
              </div>
              {product.sale && (
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{product.sale}%
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                {product.sale ? (
                  <div>
                    <p className="text-lg font-bold text-red-600">
                      {formatPrice(product.price * (1 - product.sale / 100))}
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-sm text-gray-600">
                  Kho: <span className="font-semibold">{product.stock}</span>
                </span>
                <button
                  onClick={() => onViewProduct && onViewProduct(product)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-semibold"
                >
                  <Eye className="w-4 h-4" />
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Chưa có sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}

import { X, Package, MapPin, CreditCard, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export function OrderHistory({ isOpen, onClose, orders }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="min-h-screen px-4 py-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl mx-auto relative"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute -top-4 -right-4 bg-white text-gray-800 p-3 rounded-full shadow-2xl hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 to-pink-600 rounded-t-2xl p-6 text-white shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Đơn hàng của tôi</h2>
                </div>
              </motion.div>

              {/* Orders List */}
              <div className="bg-white rounded-b-2xl shadow-xl p-6">
                {orders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-500">
                      Bạn chưa có đơn hàng nào
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 hover:shadow-lg transition-all"
                      >
                        {/* Order Header */}
                        <div className="flex items-start justify-between mb-4 pb-4 border-b">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg">
                                Đơn hàng #{order.id}
                              </h3>
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                              >
                                {getStatusText(order.status)}
                              </motion.span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(order.createdAt).toLocaleDateString(
                                  "vi-VN",
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">
                              Tổng tiền
                            </p>
                            <p className="text-2xl font-bold text-red-600">
                              {order.total.toLocaleString("vi-VN")} ₫
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3 mb-4">
                          {order.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.05 }}
                              className="flex gap-4"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm line-clamp-1">
                                  {item.name}
                                </h4>
                                <p className="text-gray-500 text-sm">
                                  Số lượng: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-red-600">
                                  {item.price.toLocaleString("vi-VN")} ₫
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Delivery Info */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gradient-to-r from-gray-50 to-red-50 rounded-lg p-4 space-y-2"
                        >
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-600 mt-1" />
                            <div>
                              <p className="font-semibold text-sm">
                                Địa chỉ giao hàng
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.address}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <CreditCard className="w-4 h-4 text-gray-600 mt-1" />
                            <div>
                              <p className="font-semibold text-sm">
                                Phương thức thanh toán
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.paymentMethod}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

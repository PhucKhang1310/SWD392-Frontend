import { Package, Download, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export function OrderManagement({ orders, onUpdateOrders, canDelete = true }) {
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    if (onUpdateOrders) {
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      );
      onUpdateOrders(updatedOrders);
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      if (onUpdateOrders) {
        onUpdateOrders(orders.filter((o) => o.id !== orderId));
      }
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    return orderStatusFilter === "all" || order.status === orderStatusFilter;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Chờ xử lý" },
      processing: { color: "bg-blue-100 text-blue-800", text: "Đang xử lý" },
      shipping: { color: "bg-purple-100 text-purple-800", text: "Đang giao" },
      completed: { color: "bg-green-100 text-green-800", text: "Hoàn thành" },
      cancelled: { color: "bg-red-100 text-red-800", text: "Đã hủy" },
    };
    return badges[status] || badges.pending;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">
            Quản lý đơn hàng ({filteredOrders.length})
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Xác nhận và xử lý đơn hàng của khách hàng
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold transition-colors">
          <Download className="w-5 h-5" />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Order Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setOrderStatusFilter("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            orderStatusFilter === "all"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Tất cả ({orders.length})
        </button>
        <button
          onClick={() => setOrderStatusFilter("pending")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            orderStatusFilter === "pending"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Chờ xử lý ({orders.filter((o) => o.status === "pending").length})
        </button>
        <button
          onClick={() => setOrderStatusFilter("processing")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            orderStatusFilter === "processing"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Đang xử lý ({orders.filter((o) => o.status === "processing").length})
        </button>
        <button
          onClick={() => setOrderStatusFilter("completed")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            orderStatusFilter === "completed"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Hoàn thành ({orders.filter((o) => o.status === "completed").length})
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Không có đơn hàng nào</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div
                key={order.id}
                className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-lg">
                        Đơn hàng #{order.id.toString().slice(-6)}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}
                      >
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Ngày đặt:{" "}
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tổng tiền</p>
                    <p className="text-xl font-bold text-red-600">
                      {order.total.toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Khách hàng</p>
                    <p className="font-semibold">{order.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="font-semibold">{order.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                    <p className="font-semibold">{order.address}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Sản phẩm ({order.items.length})
                  </p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.price.toLocaleString("vi-VN")} ₫ ×{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-red-600">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                          ₫
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateOrderStatus(order.id, "processing")
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Xác nhận
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateOrderStatus(order.id, "cancelled")
                        }
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Hủy đơn
                      </button>
                    </>
                  )}
                  {order.status === "processing" && (
                    <button
                      onClick={() =>
                        handleUpdateOrderStatus(order.id, "shipping")
                      }
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      Đang giao hàng
                    </button>
                  )}
                  {order.status === "shipping" && (
                    <button
                      onClick={() =>
                        handleUpdateOrderStatus(order.id, "completed")
                      }
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Hoàn thành
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="ml-auto flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

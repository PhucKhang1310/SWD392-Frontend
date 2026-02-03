import { X, CreditCard, MapPin, User, Phone } from "lucide-react";
import { useState } from "react";

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  user,
  onOrderComplete,
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    paymentMethod: "cod",
    note: "",
  });

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: Date.now().toString(),
      items: cart,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
      email: user.email,
      ...formData,
    };

    onOrderComplete(order);
    onClose();

    // Reset form
    setFormData({
      name: user?.name || "",
      phone: "",
      address: "",
      paymentMethod: "cod",
      note: "",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Thanh toán</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Customer Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-red-600" />
                    Thông tin người nhận
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Địa chỉ giao hàng *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          rows={3}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ghi chú
                      </label>
                      <textarea
                        value={formData.note}
                        onChange={(e) =>
                          setFormData({ ...formData, note: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        rows={2}
                        placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-red-600" />
                    Phương thức thanh toán
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-4 h-4 text-red-600"
                      />
                      <div>
                        <div className="font-semibold">
                          Thanh toán khi nhận hàng (COD)
                        </div>
                        <div className="text-sm text-gray-500">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-4 h-4 text-red-600"
                      />
                      <div>
                        <div className="font-semibold">
                          Chuyển khoản ngân hàng
                        </div>
                        <div className="text-sm text-gray-500">
                          Chuyển khoản qua ngân hàng
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div>
                <h3 className="text-lg font-bold mb-4">Đơn hàng của bạn</h3>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
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
                            SL: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN",
                            )}{" "}
                            ₫
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="font-semibold">
                        {total.toLocaleString("vi-VN")} ₫
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className="font-semibold text-green-600">
                        Miễn phí
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-bold text-lg">Tổng cộng</span>
                      <span className="font-bold text-2xl text-red-600">
                        {total.toLocaleString("vi-VN")} ₫
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold transition-colors"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

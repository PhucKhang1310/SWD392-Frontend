import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { useState } from "react";

export function ProfilePage({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ ...user, ...formData });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bạn chưa đăng nhập
        </h2>
        <p className="text-gray-600">
          Vui lòng đăng nhập để xem thông tin tài khoản
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Thông tin tài khoản
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 text-white">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="opacity-90">{user.email}</p>
              {user.role && (
                <div className="mt-2 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {user.role === "admin"
                      ? "Quản trị viên"
                      : user.role === "staff"
                        ? "Nhân viên"
                        : "Khách hàng"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <User className="w-4 h-4" />
                    Họ và tên
                  </label>
                  <p className="text-lg text-gray-900">{user.name}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <p className="text-lg text-gray-900">{user.email}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Phone className="w-4 h-4" />
                    Số điện thoại
                  </label>
                  <p className="text-lg text-gray-900">
                    {user.phone || "Chưa cập nhật"}
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    Ngày tham gia
                  </label>
                  <p className="text-lg text-gray-900">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                      : "Hôm nay"}
                  </p>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  Địa chỉ
                </label>
                <p className="text-lg text-gray-900">
                  {user.address || "Chưa cập nhật"}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Chỉnh sửa thông tin
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

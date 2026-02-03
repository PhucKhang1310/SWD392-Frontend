import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
  Camera,
  Lock,
  Package,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProfilePage({ user, onUpdateUser, onClose }) {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "Chưa cập nhật",
    address: user?.address || "Chưa cập nhật",
    birthday: user?.birthday || "",
    gender: user?.gender || "other",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    alert("Đổi mật khẩu thành công!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
  };

  const tabs = [
    { id: "info", label: "Thông tin cá nhân", icon: User },
    { id: "security", label: "Bảo mật", icon: Shield },
    { id: "orders", label: "Đơn hàng", icon: Package },
    { id: "wishlist", label: "Yêu thích", icon: Heart },
  ];

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!user) {
    return null;
  }

  return (
    <AnimatePresence>
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
            className="max-w-6xl mx-auto relative"
          >
            {/* Close Button */}
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute -top-4 -right-4 bg-white text-gray-800 p-3 rounded-full shadow-2xl hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Header với Avatar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 mb-8 text-white shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative group">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative">
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=128&background=DC2626&color=fff`
                      }
                      alt={user.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-0 right-0 bg-white text-red-600 p-2 rounded-full shadow-lg"
                    >
                      <Camera className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-white/90 mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">
                    {user.role === "admin"
                      ? "👑 Quản trị viên"
                      : user.role === "staff"
                        ? "👔 Nhân viên"
                        : "👤 Khách hàng"}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                    <Package className="w-6 h-6 mx-auto mb-1" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm opacity-90">Đơn hàng</p>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                    <Heart className="w-6 h-6 mx-auto mb-1" />
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm opacity-90">Yêu thích</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-sm mb-6 p-2">
              <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-red-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "info" && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Thông tin cá nhân
                    </h2>
                    {!isEditing ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Chỉnh sửa
                      </motion.button>
                    ) : (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSubmit}
                          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Lưu
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Hủy
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Họ và tên
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Số điện thoại
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            disabled={!isEditing}
                            placeholder="Nhập số điện thoại"
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Ngày sinh
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            value={formData.birthday}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                birthday: e.target.value,
                              })
                            }
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Địa chỉ
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
                          disabled={!isEditing}
                          rows="3"
                          placeholder="Nhập địa chỉ của bạn"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Giới tính
                      </label>
                      <div className="flex gap-4">
                        {["male", "female", "other"].map((gender) => (
                          <label
                            key={gender}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={gender}
                              checked={formData.gender === gender}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  gender: e.target.value,
                                })
                              }
                              disabled={!isEditing}
                              className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-gray-700">
                              {gender === "male"
                                ? "Nam"
                                : gender === "female"
                                  ? "Nữ"
                                  : "Khác"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Bảo mật tài khoản
                  </h2>

                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Mật khẩu
                          </h3>
                          <p className="text-sm text-gray-600">
                            Cập nhật lần cuối: 2 tuần trước
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setIsChangingPassword(!isChangingPassword)
                          }
                          className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                          <Lock className="w-4 h-4" />
                          {isChangingPassword ? "Hủy" : "Đổi mật khẩu"}
                        </motion.button>
                      </div>

                      {isChangingPassword && (
                        <motion.form
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={handlePasswordChange}
                          className="mt-6 space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Mật khẩu hiện tại
                            </label>
                            <input
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Mật khẩu mới
                            </label>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Xác nhận mật khẩu mới
                            </label>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                          >
                            Cập nhật mật khẩu
                          </button>
                        </motion.form>
                      )}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">
                        💡 Mẹo bảo mật
                      </h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Sử dụng mật khẩu dài ít nhất 8 ký tự</li>
                        <li>
                          • Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt
                        </li>
                        <li>
                          • Không sử dụng mật khẩu giống nhau cho nhiều tài
                          khoản
                        </li>
                        <li>• Thay đổi mật khẩu định kỳ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Đơn hàng của tôi
                  </h2>
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chưa có đơn hàng nào</p>
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Sản phẩm yêu thích
                  </h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chưa có sản phẩm yêu thích</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

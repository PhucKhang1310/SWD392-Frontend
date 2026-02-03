import { X } from "lucide-react";

export function AdminLayout({
  user,
  onClose,
  children,
  activeTab,
  onTabChange,
}) {
  const tabs = [
    { id: "dashboard", label: "Tổng quan", adminOnly: false },
    { id: "products", label: "Quản lý sản phẩm", adminOnly: true },
    { id: "orders", label: "Quản lý đơn hàng", adminOnly: false },
    { id: "users", label: "Quản lý người dùng", adminOnly: true },
  ];

  const isAdmin = user.role === "admin";
  const visibleTabs = tabs.filter((tab) => !tab.adminOnly || isAdmin);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b shadow-md z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-red-600">
              {isAdmin ? "TechShop Admin" : "TechShop Staff"}
            </h1>
            <span className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full font-semibold">
              {isAdmin ? "Quản trị viên" : "Nhân viên"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold"
            >
              <X className="w-5 h-5" />
              <span>Về Shop</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-4 overflow-x-auto">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}

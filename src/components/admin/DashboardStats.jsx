import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

export function DashboardStats({ stats }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Bảng điều khiển</h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Tổng doanh thu</p>
              <p className="text-2xl font-bold mt-2">
                {stats.totalRevenue.toLocaleString("vi-VN")} ₫
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-200" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Hôm nay: {stats.todayRevenue.toLocaleString("vi-VN")} ₫</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Tổng đơn hàng</p>
              <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
            </div>
            <ShoppingBag className="w-12 h-12 text-green-200" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>Chờ xử lý: {stats.pendingOrders}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Sản phẩm</p>
              <p className="text-2xl font-bold mt-2">{stats.totalProducts}</p>
            </div>
            <Package className="w-12 h-12 text-purple-200" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Package className="w-4 h-4" />
            <span>Đang hoạt động</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Người dùng</p>
              <p className="text-2xl font-bold mt-2">{stats.totalUsers}</p>
            </div>
            <Users className="w-12 h-12 text-orange-200" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Đã đăng ký</span>
          </div>
        </div>
      </div>
    </div>
  );
}

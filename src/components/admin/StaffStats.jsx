import { Clock, RefreshCw, CheckCircle, ShoppingBag } from "lucide-react";

export function StaffStats({ stats }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Thống kê công việc</h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Chờ xử lý</p>
              <p className="text-3xl font-bold mt-2">{stats.pendingOrders}</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-200" />
          </div>
          <div className="mt-4 text-sm">Cần xác nhận ngay</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Đang xử lý</p>
              <p className="text-3xl font-bold mt-2">
                {stats.processingOrders}
              </p>
            </div>
            <RefreshCw className="w-12 h-12 text-blue-200" />
          </div>
          <div className="mt-4 text-sm">Đang được xử lý</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Hoàn thành hôm nay</p>
              <p className="text-3xl font-bold mt-2">{stats.completedToday}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-200" />
          </div>
          <div className="mt-4 text-sm">Đơn đã giao thành công</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Tổng đơn hàng</p>
              <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
            </div>
            <ShoppingBag className="w-12 h-12 text-purple-200" />
          </div>
          <div className="mt-4 text-sm">Tất cả đơn hàng</div>
        </div>
      </div>
    </div>
  );
}

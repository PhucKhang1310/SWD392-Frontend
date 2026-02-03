import { useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { DashboardStats } from "../components/admin/DashboardStats";
import { ProductManagement } from "../components/admin/ProductManagement";
import { OrderManagement } from "../components/admin/OrderManagement";
import { UserManagement } from "../components/admin/UserManagement";

export function AdminPage({
  user,
  products,
  orders,
  users,
  onClose,
  onUpdateProducts,
  onUpdateOrders,
  onUpdateUsers,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calculate stats for dashboard
  const stats = {
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    todayRevenue: orders
      .filter((order) => {
        const orderDate = new Date(order.date);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
      })
      .reduce((sum, order) => sum + order.total, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalProducts: products.length,
    lowStock: products.filter((p) => p.stock < 10).length,
    totalUsers: users.length,
    newUsers: users.filter((u) => {
      const userDate = new Date(u.createdAt || Date.now());
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return userDate >= weekAgo;
    }).length,
  };

  return (
    <AdminLayout
      user={user}
      onClose={onClose}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === "dashboard" && <DashboardStats stats={stats} />}

      {activeTab === "products" && (
        <ProductManagement
          products={products}
          onUpdateProducts={onUpdateProducts}
        />
      )}

      {activeTab === "orders" && (
        <OrderManagement
          orders={orders}
          products={products}
          onUpdateOrders={onUpdateOrders}
          userRole="admin"
        />
      )}

      {activeTab === "users" && (
        <UserManagement users={users} onUpdateUsers={onUpdateUsers} />
      )}
    </AdminLayout>
  );
}

import { useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { StaffStats } from "../components/admin/StaffStats";
import { ProductList } from "../components/admin/ProductList";
import { OrderManagement } from "../components/admin/OrderManagement";

export function StaffPage({ user, products, orders, onClose, onUpdateOrders }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calculate stats for dashboard
  const stats = {
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    processingOrders: orders.filter((o) => o.status === "processing").length,
    completedOrders: orders.filter((o) => o.status === "completed").length,
    totalOrders: orders.length,
  };

  return (
    <AdminLayout
      user={user}
      onClose={onClose}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === "dashboard" && <StaffStats stats={stats} />}

      {activeTab === "products" && <ProductList products={products} />}

      {activeTab === "orders" && (
        <OrderManagement
          orders={orders}
          products={products}
          onUpdateOrders={onUpdateOrders}
          userRole="staff"
        />
      )}
    </AdminLayout>
  );
}

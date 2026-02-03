import { Trash2, Users, Mail } from "lucide-react";

export function UserManagement({ users, onUpdateUsers }) {
  const handleDeleteUser = (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      onUpdateUsers(updatedUsers);
    }
  };

  const handleToggleRole = (userId) => {
    const updatedUsers = users.map((u) =>
      u.id === userId
        ? { ...u, role: u.role === "admin" ? "staff" : "admin" }
        : u,
    );
    onUpdateUsers(updatedUsers);
  };

  const roleColors = {
    admin: "bg-purple-100 text-purple-700 border-purple-300",
    staff: "bg-blue-100 text-blue-700 border-blue-300",
    customer: "bg-gray-100 text-gray-700 border-gray-300",
  };

  const roleLabels = {
    admin: "Quản trị viên",
    staff: "Nhân viên",
    customer: "Khách hàng",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-red-600" />
          Quản lý người dùng
        </h2>
        <p className="text-sm text-gray-600">
          Tổng số: {users.length} người dùng
        </p>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={user.role}
                  onChange={() => handleToggleRole(user.id)}
                  className={`px-3 py-1 rounded-full border font-semibold text-sm ${
                    roleColors[user.role]
                  }`}
                >
                  <option value="admin">Quản trị viên</option>
                  <option value="staff">Nhân viên</option>
                  <option value="customer">Khách hàng</option>
                </select>

                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Xóa người dùng"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Chưa có người dùng nào</p>
        </div>
      )}
    </div>
  );
}

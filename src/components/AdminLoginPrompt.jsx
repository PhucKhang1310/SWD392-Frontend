import { X } from "lucide-react";

export function AdminLoginPrompt({ isOpen, onClose }) {
  if (!isOpen) return null;

  const testAccounts = [
    {
      role: "Admin",
      email: "admin@techshop.vn",
      password: "admin123",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      role: "Staff",
      email: "staff@techshop.vn",
      password: "staff123",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      role: "Customer",
      email: "customer@example.com",
      password: "customer123",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl max-w-2xl w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tài khoản test
            </h2>
            <p className="text-gray-600">
              Sử dụng các tài khoản sau để test chức năng hệ thống
            </p>
          </div>

          {/* Test Accounts */}
          <div className="space-y-4">
            {testAccounts.map((account) => (
              <div
                key={account.role}
                className={`${account.bgColor} border-2 ${account.borderColor} rounded-xl p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${account.textColor}`}>
                    {account.role}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600 w-24">
                      Email:
                    </span>
                    <code className="flex-1 bg-white px-3 py-2 rounded-lg font-mono text-sm">
                      {account.email}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600 w-24">
                      Password:
                    </span>
                    <code className="flex-1 bg-white px-3 py-2 rounded-lg font-mono text-sm">
                      {account.password}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Lưu ý:</strong> Đây là các tài khoản demo để test. Trong
              môi trường production, tuyệt đối không hiển thị thông tin đăng
              nhập như thế này.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

export default function Topbar() {
  return (
    <header className="bg-white shadow px-6 py-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-700">Admin Dashboard</span>
        <span className="text-gray-500 text-sm">Logged in as Admin</span>
      </div>
    </header>
  );
}

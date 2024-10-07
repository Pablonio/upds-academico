// pages/index.tsx

import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-800 text-gray-100 flex flex-col">
        <div className="py-4 px-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="#" className="text-sm">Overview</a>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="#" className="text-sm">Users</a>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="#" className="text-sm">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-semibold">CRUD Dashboard</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add New</button>
        </header>

        {/* Table */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">1</td>
                <td className="px-4 py-2 border">John Doe</td>
                <td className="px-4 py-2 border">john@example.com</td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-500 hover:underline">Edit</button> | 
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

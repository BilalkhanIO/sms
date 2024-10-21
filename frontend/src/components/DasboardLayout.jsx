import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const sidebarLinks = [
    { name: 'Dashboard', path: '/', roles: ['admin', 'teacher', 'student', 'parent'] },
    { name: 'Manage Users', path: '/users', roles: ['admin'] },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          {sidebarLinks.map((link) => (
            link.roles.includes(user.role) && (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

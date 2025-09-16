import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Car, 
  Users, 
  LogOut, 
  Shield,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login
    alert("You have been logged out.");
    navigate('/');
  };

  const navItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'from-blue-500 to-blue-600'
    },
    {
      path: '/admin/bookings',
      label: 'Bookings',
      icon: Calendar,
      color: 'from-green-500 to-green-600'
    },
    {
      path: '/admin/cars',
      label: 'Cars',
      icon: Car,
      color: 'from-purple-500 to-purple-600'
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: Users,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `group relative flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:transform hover:scale-[1.01]'
    }`;
  };

  const getIconClass = (path) => {
    const isActive = location.pathname === path;
    return `w-5 h-5 transition-all duration-200 ${
      isActive ? 'text-white drop-shadow-sm' : 'text-gray-500 group-hover:text-gray-700'
    }`;
  };

  return (
    <aside className="w-full md:w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
      
      {/* Header */}
      <div className="relative mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Management Console</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              className={getLinkClass(item.path)}
              to={item.path}
            >
              <div className="flex items-center space-x-3 flex-1">
                <Icon className={getIconClass(item.path)} />
                <span className="font-medium">{item.label}</span>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <ChevronRight className="w-4 h-4 text-white/80" />
              )}
              
              {/* Hover effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider with gradient */}
      <div className="my-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white px-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="group relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:transform hover:scale-[1.01]"
      >
        <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:-rotate-12" />
        <span className="font-medium">Logout</span>
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none" />
      </button>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/30 to-blue-100/30 rounded-full blur-2xl translate-y-12 -translate-x-8"></div>
    </aside>
  );
};

export default Sidebar;
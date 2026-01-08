import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
  ShoppingCart,
  Clock,
  Bell,
  User,
  Upload,
  Activity,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import Button from './Button'; // Import your existing Button component
import { Link, useLocation } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../constants/frontend_urls';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location  = useLocation();

  // Get role from localStorage (simulating your utility function)
  useEffect(() => {
    const storedRole = localStorage.getItem('pharmacy_role'); // Default to regular if not found
    setRole(storedRole);
  },[location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear user data and redirect
    localStorage.removeItem('pharmacy_token');
    localStorage.removeItem('pharmacy_role');
    window.location.href = '/auth'; // Redirect to login page
  };

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-400">PharmaCare</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {
              role == null ?
                <>
                  <NavItem href="/products" icon={<Package className="h-5 w-5" />} text="Products" />
                  <NavItem href={FRONTEND_ROUTES.user_cart} icon={<ShoppingCart className="h-5 w-5" />} text="Cart" />
                </>
              : role === 'admin' ? (
              <>
                <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} text="Dashboard" />
                <NavItem href="/orders" icon={<Users className="h-5 w-5" />} text="User Orders" />
                <NavItem href="/products" icon={<Package className="h-5 w-5" />} text="Products" />
                <NavItem href="/messages" icon={<MessageSquare className="h-5 w-5" />} text="Messages" />
              </>
            ) : (
              <>
                <NavItem href="/products" icon={<Package className="h-5 w-5" />} text="Products" />
                <NavItem href={FRONTEND_ROUTES.user_cart} icon={<ShoppingCart className="h-5 w-5" />} text="Cart" />
                <NavItem href={FRONTEND_ROUTES.user_order_history} icon={<Clock className="h-5 w-5" />} text="Orders" />
                <NavItem href="/notifications" icon={<Bell className="h-5 w-5" />} text="Notifications" />
                <NavItem href="/profile" icon={<User className="h-5 w-5" />} text="Profile" />
                <NavItem href="/upload" icon={<Upload className="h-5 w-5" />} text="Upload Prescription" />
                <NavItem href="/health" icon={<Activity className="h-5 w-5" />} text="Health Report" />
              </>
            )
            }

            {/* Logout Button - Desktop */}
            {
              role ?
                <div className="ml-4">
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<LogOut className="h-4 w-4" />}
                    onClick={handleLogout}
                    className="hidden md:block"
                    iconPosition='mid'
                  />
                </div> :
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Link
                    to={FRONTEND_ROUTES.login}
                    className="relative text-white/90 transition-colors duration-200 hover:text-white
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0
               after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                onClick={() => console.log(FRONTEND_ROUTES.login)}
                  >
                    Login
                  </Link>

                  <span className="text-white/60">/</span>

                  <Link
                    to={FRONTEND_ROUTES.login}
                    className="relative text-white/90 transition-colors duration-200 hover:text-white
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0
               after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Sign Up
                  </Link>
                </div>

            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Logout Button - Mobile (hidden on desktop) */}
            {role ? <Button
              variant="danger"
              size="sm"
              icon={<LogOut className="h-4 w-4" />}
              onClick={handleLogout}
              className="md:hidden"
            />: <div className="flex items-center gap-2 text-sm font-medium">
                  <Link
                    href={FRONTEND_ROUTES.login}
                    className="relative text-white/90 transition-colors duration-200 hover:text-white
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0
               after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Login
                  </Link>

                  <span className="text-white/60">/</span>

                  <Link
                    href={FRONTEND_ROUTES.login}
                    className="relative text-white/90 transition-colors duration-200 hover:text-white
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0
               after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Sign Up
                  </Link>
                </div>}

            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {
              role == null ?
              <>
                <MobileNavItem href="/products" icon={<Package className="h-5 w-5" />} text="Products" />
                <MobileNavItem href={FRONTEND_ROUTES.user_cart} icon={<ShoppingCart className="h-5 w-5" />} text="Cart" />
              </> :
              role === 'admin' ? (
              <>
                <MobileNavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} text="Dashboard" />
                <MobileNavItem href="/orders" icon={<Users className="h-5 w-5" />} text="User Orders" />
                <MobileNavItem href="/products" icon={<Package className="h-5 w-5" />} text="Products" />
                <MobileNavItem href="/messages" icon={<MessageSquare className="h-5 w-5" />} text="Messages" />
              </>
            ) : (
              <>
                <MobileNavItem href="/products" icon={<Package className="h-5 w-5" />} text="Products" />
                <MobileNavItem href={FRONTEND_ROUTES.user_cart} icon={<ShoppingCart className="h-5 w-5" />} text="Cart" />
                <MobileNavItem href={FRONTEND_ROUTES.user_order_history} icon={<Clock className="h-5 w-5" />} text="Orders" />
                <MobileNavItem href="/notifications" icon={<Bell className="h-5 w-5" />} text="Notifications" />
                <MobileNavItem href="/profile" icon={<User className="h-5 w-5" />} text="Profile" />
                <MobileNavItem href="/upload" icon={<Upload className="h-5 w-5" />} text="Upload Prescription" />
                <MobileNavItem href="/health" icon={<Activity className="h-5 w-5" />} text="Health Report" />
              </>
            )
            }

            {/* Mobile Logout Button */}
            { role ?
              <div className="px-3 py-2">
              {role && <Button
                variant="danger"
                size="sm"
                icon={<LogOut className="h-4 w-4" />}
                onClick={handleLogout}
                fullWidth
              />}
            </div> : 
              <div className="flex items-center gap-2 text-sm font-medium">
                  <Link
                    href={FRONTEND_ROUTES.login}
                    className="relative text-white/90 transition-colors duration-200 hover:text-white
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0
               after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Login
                  </Link>

                  <span className="text-white/60">/</span>

                  <Link
                    href={FRONTEND_ROUTES.login}
                    className="relative text-white/90 transition-colors duration-200 hover:text-white
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0
               after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Sign Up
                  </Link>
                </div>
            }
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable Nav Item Component for Desktop
const NavItem = ({ href, icon = null, text }) => {
  return (
    <Link
      to={href}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-blue-400 transition duration-300"
    >
      <span className="mr-2">{icon}</span>
      {text}
    </Link>
  );
};

// Reusable Nav Item Component for Mobile
const MobileNavItem = ({ href, icon, text }) => {
  return (
    <Link
      to={href}
      className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
    >
      <span className="mr-3">{icon}</span>
      {text}
    </Link>
  );
};

export default Navbar;
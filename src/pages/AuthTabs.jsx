import { useEffect, useState } from 'react';
import { User, LockKeyhole, Shield } from 'lucide-react';
import UserSignup from '../components/auth/UserSignup';
import UserLogin from '../components/auth/UserLogin';
import AdminSignup from '../components/auth/AdminSignup';
import AdminLogin from '../components/auth/AdminLogin.jsx';
import { getRole } from '../utils/localStorage.js';
import { useNavigate } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../constants/frontend_urls.js';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState('userLogin');
  const navigation = useNavigate();
  const tabs = [
    { id: 'userLogin', label: 'User Login', icon: <User size={18} /> },
    { id: 'userSignup', label: 'User Signup', icon: <User size={18} /> },
    { id: 'adminLogin', label: 'Admin Login', icon: <Shield size={18} /> },
    { id: 'adminSignup', label: 'Admin Signup', icon: <Shield size={18} /> },
  ];

  useEffect(() => {
    if(getRole() == "regular")
      return navigation(FRONTEND_ROUTES.products);
    
    if(getRole() == "admin")
      return navigation(FRONTEND_ROUTES.admin_dashboard);
  }, [])

  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center justify-center px-4 py-3 text-sm font-medium ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>
      
      
      <div className="p-6">
        {activeTab === 'userLogin' && <UserLogin />}
        {activeTab === 'userSignup' && <UserSignup />}
        {activeTab === 'adminLogin' && <AdminLogin />}
        {activeTab === 'adminSignup' && <AdminSignup />}
      </div>
    </div>
  );
};

export default AuthTabs;
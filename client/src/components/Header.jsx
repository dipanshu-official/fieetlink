import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector , useDispatch } from 'react-redux';
import { userDataSelector } from '../store/globalSelector';
import { getUserProfileAsync } from '../store/globalAction';


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector); // Assuming user data is stored in global state

  useEffect(() => {
    dispatch(getUserProfileAsync());
  },[dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
    toast.success("Logged out successfully");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Fleet Manager</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span>{user?.username}</span>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                user?.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
               
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import AppLayout from './DoctorDashboard/AppLayout';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('user_role');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLoginSuccess = (token: string, role: string, username: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  // Nếu đã đăng nhập thành công -> Hiển thị Dashboard chính
  if (isAuthenticated) {
    return (
      <div className="App">
        <AppLayout />
      </div>
    );
  }

  // Nếu chọn màn hình Đăng ký
  if (currentView === 'register') {
    return (
      <Register 
        onRegisterSuccess={() => setCurrentView('login')} 
        onSwitchToLogin={() => setCurrentView('login')} 
      />
    );
  }

  // Mặc định hiển thị màn hình Đăng nhập kèm nút chuyển sang Đăng ký
  return (
    <Login 
      onLoginSuccess={handleLoginSuccess} 
      onSwitchToRegister={() => setCurrentView('register')} 
    />
  );
}
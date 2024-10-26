import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ToastProvider } from '../context/Toast';;

const Layout: React.FC = () => {
  return (
    <ToastProvider>
      <Header />
      <main className="w-[1280px]">
        <Outlet />
      </main>
    </ToastProvider>
  )
}

export default Layout;

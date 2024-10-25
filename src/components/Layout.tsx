import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="w-[1280px] h-screen">
        <Outlet />
      </main>
    </>
  )
}

export default Layout;

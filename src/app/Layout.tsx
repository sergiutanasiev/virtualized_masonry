import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <div className="wrapper">
        <main className="main">
            {children}
            <Outlet />
        </main>
    </div>
);

export default Layout;
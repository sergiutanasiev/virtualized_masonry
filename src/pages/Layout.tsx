import React from 'react';
import { Outlet } from 'react-router-dom';
import { Wrapper } from '../styled-components/StyledMasonryGrid';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <Wrapper>
        <main className="main">
            {children}
            <Outlet />
        </main>
    </Wrapper>
);

export default Layout;
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => (
    <div className='wrapper'>
        <main className='main'>
            {children}
        </main>
    </div>
)
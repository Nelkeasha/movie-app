import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Layout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-darkBlue">
            <Sidebar />
            <main className="flex-1 md:ml-24 lg:ml-32 p-4 md:p-6 lg:py-8 lg:px-9 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';

const Layout = () => {
    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <main className='pt-5 flex-grow-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
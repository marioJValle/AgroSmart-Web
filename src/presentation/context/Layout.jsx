import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';

const Layout = () => {
    return (
        <div>
            <Header />
            <main className='pt-5'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
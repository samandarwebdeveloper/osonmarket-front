import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from './Home';


const Layout = ({title='Osonmarket.com', description='Osonmarket', className, children}) => {
    const basket = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card')) : []

    return (
        <>
            <Header basket={basket} />
            <div className={`${className} main-content`}> 
               {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout;
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// import Carousel from './Carousel';

const Layout = ({title='Osonmarket.com', description='Osonmarket', className, children}) => (
    <>
        <Header />
        <div className={`${className} main-content`}> {children} </div>
        <Footer />
    </>
);

export default Layout;
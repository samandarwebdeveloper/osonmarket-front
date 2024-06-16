import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// import Carousel from './Carousel';

const Layout = ({title='Osonmarket.com', description='Osonmarket', className, children}) => (
    <div>
        <Header />
        {/* <div className="jumbotron mb-0"> 
            <h2> {title} </h2>
            <p className="lead"> {description} </p>
        </div>
        <Carousel /> */}
        <div className={className}> {children} </div>
        <Footer />
    </div>
);

export default Layout;
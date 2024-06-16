import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getAllProducts} from './apiCore';
import Card from '../components/Card/Card';
import Carousel from './Carousel';

const Home = () =>  {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getAllProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getAllProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        // loadProductsBySell();
    }, []);

    return (
        <Layout title="Home Page" description="Osonmarket" className="container">
            <Carousel />
            <div className="row"> 
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-md-3 mb-3 col-6"> 
                        <Card key={i} product={product}/> 
                    </div>
                ))}
            </div>
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </Layout>
    );
};

export default Home;
import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from '../components/Card/Card';
import Carousel from './Carousel';
import Loading from '../components/Loading/Loading';

const Home = () =>  {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
                setLoading(false)
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
            <div className="productList p-0"> 
                {loading && <Loading />}
                {productsByArrival.map((product, i) => (
                    <Card key={i} product={product}/> 
                ))}
            </div>
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </Layout>
    );
};

export default Home;
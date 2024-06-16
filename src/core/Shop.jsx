import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from '../components/Card/Card';
import {getCategories, getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import {prices} from './fixedPrices';
// import RadioBox from './RadioBox';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(12);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    
    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };
    

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-secondary btn-block ml-auto mr-auto mb-5">
                    Ko'proq ko'rish
                </button>
            )
        );
    };

    useEffect(() => {
        const init = () => {
            getCategories().then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCategories(data);
                }
            });
        };
        init();
    }, []);
    
    useEffect(() => {
        loadFilteredResults(skip, limit, myFilters.filters);
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout title="Shop Page" description="Search and Find your product" className="container-fluid mt-5">

                    {/* <h4> Filter by price range </h4>
                    <div>
                    <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                </div> */}
                <div>
                    <h2 className="text-center">Mahsulotlar</h2>
                        <div className="d-flex mb-3">
                                <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                        </div>
                        <div className="row">
                            {filteredResults.map((product, i) => (
                                <div key={i} className="col-md-3 mb-2 col-6"> 
                                    <Card key={i} product={product} /> 
                                </div>
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                </div>
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </Layout>
    );
};

export default Shop;
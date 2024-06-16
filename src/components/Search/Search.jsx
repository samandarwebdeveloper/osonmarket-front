import React, { useState, useEffect } from "react";
import { list } from "../../core/apiCore";
import Card from "../../components/Card/Card";
import './Search.scss'

const Search = () => {
    const [data, setData] = useState({
        search: "",
        results: [],
        searched: false
    });

    const {search, results, searched } = data;


    const searchData = () => {
        if (search) {
            list({ search: search || undefined }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results && results.length > 0) {
            return `${results.length} natija`;
        }
        if (searched && results && results.length < 1) {
            return `Mahsulot topilmadi`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div className="position-absolute products-searched mt-2">
                <div className="mt-4 mb-4 d-flex align-items-center justify-content-spacebetwen border-bottom pl-3 pr-3">
                    <h2>
                        {searchMessage(searched, results)}
                    </h2>
                    <button className="close-btn" onClick={() => setData({...data, results: null})}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="row w-100 scroll mb-4">
                    {results && results.map((product, i) => (
                        <div key={i} className="caRD" >
                            <Card product={product}  />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form className="form" onSubmit={searchSubmit}>
                <div className="d-flex">
                    <input
                        type="search"
                        className="search-input"
                        onChange={handleChange("search")}
                        placeholder="Mahsulotlar orasidan qidirish"
                    />
                    <button className="input search-btn">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span className="ml-1">Qidirish</span>
                    </button>
                </div>
        </form>
    );

    return (
        <div>
            {searchForm()}
            {searched && results &&
                <div className="bg-white scroll">
                    {searchedProducts(results)}
                </div>
            }
        </div>
    );
};

export default Search;


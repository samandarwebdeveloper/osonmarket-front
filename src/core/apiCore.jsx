import { API } from "../config";
import queryString from "query-string";

export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=10`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllProducts = () => {
    return fetch(`${API}/all-products`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getProductById = id => {
    return fetch(`${API}/product/${id}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategoryById = async id => {
    return fetch(`${API}/category/${id}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const list = params => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const read = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const order = (id, emaunt, price, name, tel) => {
    const data = {
        emaunt, price, name, tel
    }
    return fetch(`${API}/order/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getUsers = () => {
    return fetch(`${API}/users`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
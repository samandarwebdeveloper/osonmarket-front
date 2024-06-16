import { API } from '../config';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const deleteProduct = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
export const deleteCategory = (userId, token, categoryId) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const editCategory = (userId, token, categoryId, name) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name})
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}
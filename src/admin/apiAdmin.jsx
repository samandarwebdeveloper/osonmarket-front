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

export const getSellers = () => {
    return fetch(`${API}/sellers`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const createSeller = (userId, token, seller) => {
    return fetch(`${API}/seller/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(seller)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const deleteSeller = (userId, token, sellerId) => {
    return fetch(`${API}/seller/${sellerId}/${userId}`, {
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

export const getSellerById = (sellerId) => {
    return fetch(`${API}/seller/${sellerId}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getMarkets = () => {
    return fetch(`${API}/markets`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const createMarket = (userId, token, market) => {
    return fetch(`${API}/market/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(market)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const deleteMarket = (userId, token, marketId) => {
    return fetch(`${API}/market/${marketId}/${userId}`, {
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

export const getMarketById = (marketId) => {
    return fetch(`${API}/market/${marketId}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const createReferral = (userId, token, name, product) => {
    const ref = {}
    ref.name = name
    ref.productId = product._id
    ref.productName = product.name
    ref.productPrice = product.price
    ref.seller = userId
    ref.price = product.sellPrice
    return fetch(`${API}/referral/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(ref)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const getReferrals = (userId, token) => {
    return fetch(`${API}/referral-by-user/${userId}`, {
        method: 'GET',
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

export const removeReferral = (userId, token, referralId) => {
    return fetch(`${API}/referral/${referralId}/${userId}`, {
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

export const createProfit = (userId, token, phone, name, cardNumber, summa) => {
    const profit = {}
    profit.sellerId = userId
    profit.sellerPhone = phone
    profit.sellerName = name
    profit.cardNumber = cardNumber
    profit.price = summa

    return fetch(`${API}/profit/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profit)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getProfitsById = (userId, token) => {
    return fetch(`${API}/profit-by-user/${userId}`, {
        method: 'GET',
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
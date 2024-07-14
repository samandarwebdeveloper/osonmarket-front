import Layout from '../../core/Layout'
import { useState, useEffect } from 'react'
import { API, URL } from '../../config'
import { createMultipleOrder } from '../../core/apiCore'
import './Basket.scss'

function Basket () {
    const [basket, setBasket] = useState([])
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('card')) {
                setBasket(JSON.parse(localStorage.getItem('card')))
            }
        }
    }, [])

    useEffect(() => {
        let sum = 0
        basket.forEach(item => {
            sum += item.price * item.count
        })
        setTotal(sum)
    }, [basket])

    const handleRemove = (id) => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('card')) {
                cart = JSON.parse(localStorage.getItem('card'))
            }
            cart = cart.filter(item => item._id !== id)
            localStorage.setItem('card', JSON.stringify(cart))
            if(cart.length === 0) {
                localStorage.removeItem('card')
            }
            setBasket(cart)
        }
    }

    const handleChangeProductCount = (id, count) => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('card')) {
                cart = JSON.parse(localStorage.getItem('card'))
            }
            cart = cart.map(item => {
                if(item._id === id) {
                    if(count > 0) {
                        item.count = count
                    }
                }
                return item
            })
            localStorage.setItem('card', JSON.stringify(cart))
            setBasket(cart)
        }
    }

    return (
        <Layout>
            <div className='container py-2'>
                <h2>Savatcha</h2>
                <div className="d-flex basket">
                    <div className='basket-list'>
                        {basket.map((item, i) => (
                            <div key={i} className='basket-item'>
                                <a href={`${URL}/product/${item._id}`} className='basket-item-img'>
                                    <img src={`${API}/product/photo/${item._id}`} alt={item.name} />
                                </a>
                                <div className='basket-item-info'>
                                    <a href={`${URL}/product/${item._id}`} className='name'>{item.name}</a>
                                    <p className='price'>{item.price.toString()
                                        .split("")
                                        .reverse()
                                        .map(
                                            (v, i, a) => (i < a.length - 1 && i % 3 == 0 || i % 6 == 0)
                                                ? v + " "
                                                : v
                                        )
                                        .reverse()
                                        .join("")} so'm</p>
                                </div>
                                <div className='basket-item-actions'>
                                    <button className='basket-item-remove' onClick={() => handleRemove(item._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <div className='buttons'>
                                        <button className='basket-item-minus' onClick={() => handleChangeProductCount(item._id, item.count - 1)}>-</button>
                                        <p className='basket-item-quantity'>{item.count}</p>
                                        <button className='basket-item-plus' onClick={() => handleChangeProductCount(item._id, item.count + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='order-info'>
                        <div className='order-info-actions'>
                            <h3 className='order-info-total'>Jami summa</h3>
                            <p>{total.toString()
                                        .split("")
                                        .reverse()
                                        .map(
                                            (v, i, a) => (i < a.length - 1 && i % 3 == 0 || i % 6 == 0)
                                                ? v + " "
                                                : v
                                        )
                                        .reverse()
                                        .join("")} so'm</p>
                            {basket.length > 0 && <button className='order-info-btn'>Buyurtma berish</button>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Basket
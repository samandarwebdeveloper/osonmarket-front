import Layout from './Layout'
import { useState, useEffect } from 'react'
import { API } from '../config'

function Basket () {
    const [basket, setBasket] = useState([])
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                setBasket(JSON.parse(localStorage.getItem('cart')))
            }
        }
    }, [])

    useEffect(() => {
        let sum = 0
        basket.map(item => {
            sum += item.price
        })
        setTotal(sum)
    }, [basket])

    const handleRemove = (id) => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart = cart.filter(item => item._id !== id)
            localStorage.setItem('cart', JSON.stringify(cart))
            setBasket(cart)
        }
    }
    return (
        <Layout>
            <div className='container pt-4 pb-4'>
                <h2>Savatcha</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Rasm</th>
                            <th>Nomi</th>
                            <th>Narxi</th>
                            <th>O'chirish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket && basket.map((item, i) => (
                            <tr key={i}>
                                <td><img src={`${API}/product/photo/${item._id}`} alt={item.name} style={{width: '50px'}} /></td>
                                <td>{item.name}</td>
                                <td>{item.price} so'm</td>
                                <td><button className='btn btn-danger' onClick={() => handleRemove(item._id)}>O'chirish</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Umumiy: {total} so'm</h3>
            </div>
        </Layout>
    )
}

export default Basket
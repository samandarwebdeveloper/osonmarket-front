import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ShowImage from '../../core/ShowImage';
import BuyModal from '../../core/buyModal';
import SoldModal from '../../core/soldModal';
import './Card.scss'


const Card = ({product}) => {
    const [modal, setModal] = useState(false)
    const [soldModal, setSoldModal] = useState(false)
    const [buyProduct, setBuyProduct] = useState('')

    const handleBuy = (e) => { 
        setModal(true)
        setBuyProduct(e.target.id)
    }

    // create handle add to cart
    const handleAddCard = (e) => {
        if (typeof window !== 'undefined') {
            let cart = []
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...product,
                count: 1
            })
            let unique = [...new Set(cart.map(item => item._id))]
            localStorage.setItem('cart', JSON.stringify(unique))
        }
    }

    return (
        <div className="product-card mediaCard"> 
            <Link className="product-link" to={`/product/${product._id}`} >
                <ShowImage item={product} url="product" />
            </Link>
            <div className="mt-auto">
                <div className='d-flex align-items-end justify-content-between mb-1 position-relative'>
                    <div>
                    <Link className="product-link" to={`/product/${product._id}`}>
                        <h6 className='mb-3'>{product.name}</h6>
                        <p>{product.price.toString().split("").reverse().map((v,i,a) => (i<a.length-1 && i%3==0) ? v + " ":v).reverse().join("")} so'm</p>
                    </Link>
                    </div>
                    <button className='card-basket-btn ml-2' onClick={handleAddCard} id={product._id}>
                        <i className="fa-solid fa-cart-shopping card-icon"></i>
                    </button>
                </div>
                    <button className="buyBtn mt-2 mb-2 mobileBtn" onClick={handleBuy} id={product._id}>
                        Xarid qilish
                    </button>
            </div>
            {soldModal && <SoldModal setSoldModal={setSoldModal} />}
            {modal && <BuyModal setModal={setModal} id={buyProduct} product={product} setSoldModal={setSoldModal} />}
        </div>
    );
};

export default Card;


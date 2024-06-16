import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ShowImage from '../../core/ShowImage';
import BuyModal from '../../core/buyModal';
import SoldModal from '../../core/soldModal';
import './Card.scss'


const Card = ({product, showViewProductButton=true}) => {
    const [modal, setModal] = useState(false)
    const [soldModal, setSoldModal] = useState(false)
    const [buyProduct, setBuyProduct] = useState('')

    const handleBuy = (e) => { 
        setModal(true)
        setBuyProduct(e.target.id)
    }

    const handleAddCard = (e) => {
        const items = JSON.parse(localStorage.getItem("card"));
        const newItems = () => {
            if(items) {
                return JSON.stringify([...items,{id: e.target.id}])
            } else {
                return JSON.stringify({id: e.target.id})
            }
        }
        localStorage.setItem("card", newItems());
    }
    function createMarkup(string) {
        return {__html: string};
    }
    return (
        <div className='h-100 pb-3 product-card'>
            {soldModal && <SoldModal setSoldModal={setSoldModal} />}
            {modal && <BuyModal setModal={setModal} id={buyProduct} product={product} setSoldModal={setSoldModal} />}
                <div className={`d-flex ${showViewProductButton ? 'flex-column align-items-top justify-content-top' : 'align-self-top justify-content-top mediaCard'} h-100`}> 
                    <Link className="product-link" to={`/product/${product._id}`} >
                        <ShowImage item={product} url="product" />
                    </Link>
                    <div className="mt-auto">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div>
                            <Link className="product-link" to={`/product/${product._id}`}>
                                <h6>{product.name}</h6>
                                <p>{product.price} so'm </p>
                                {!showViewProductButton && 
                                    <div dangerouslySetInnerHTML={createMarkup(product.description)} />
                                }
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
                </div>
        </div>
    );
};

export default Card;


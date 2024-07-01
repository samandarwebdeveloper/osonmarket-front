import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read} from './apiCore';
import {API} from '../config';
import Loading from '../components/Loading/Loading';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Image,
    Dot,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import BuyModal from './buyModal';
import SoldModal from './soldModal';

const Product = props => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false)
    const [soldModal, setSoldModal] = useState(false)
    const [buyProduct, setBuyProduct] = useState('')
    const [loading, setLoading] = useState(true)

    const handleBuy = (e) => {
        setModal(true)
        setBuyProduct(e.target.id)
    }

    const handleAddCard = (e) => {
        if (typeof window !== 'undefined') {
            // let cart = [] if (localStorage.getItem('cart')) {     cart =
            // JSON.parse(localStorage.getItem('cart')) } cart.push({     ...product,
            // count: 1 }) let unique = [...new Set(cart.map(item => item._id))]
            // localStorage.setItem('cart', JSON.stringify(unique))
        }
    }

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                setLoading(false)
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    function createMarkup(string) {
        return {__html: string};
    }
    return (
        <div>
            <Layout
                title={product && product.name}
                description={product && product.description && product
                    .description
                    .substring(0, 100)}
                className="container">
                {
                    props && props.match.params.productId === product._id && <div className="product-page">
                        <div className='product-carousel'>
                            <CarouselProvider
                                naturalSlideWidth={100}
                                naturalSlideHeight={100}
                                totalSlides={3}
                                visibleSlides={1}
                                infinite={true}>

                                <Slider>
                                    <Slide index={0}>
                                        <Image
                                            hasMasterSpinner="hasMasterSpinner"
                                            src={`${API}/product/photo/${product._id}`}
                                            alt={product.name}/>
                                    </Slide>
                                    <Slide index={1}>
                                        <Image
                                            hasMasterSpinner="hasMasterSpinner"
                                            src={`${API}/product/photo1/${product._id}`}
                                            alt={product.name}/>
                                    </Slide>
                                    <Slide index={2}>
                                        <Image
                                            hasMasterSpinner="hasMasterSpinner"
                                            src={`${API}/product/photo2/${product._id}`}
                                            alt={product.name}/>
                                    </Slide>
                                </Slider>
                                <div className="dot-group">
                                    <Dot className='carousel__dot--selected' key={0} slide={0}>
                                        <img key={0} src={`${API}/product/photo/${product._id}`} alt={product.name}/>
                                    </Dot>
                                    <Dot className='carousel__dot--selected' key={1} slide={1}>
                                        <img key={1} src={`${API}/product/photo1/${product._id}`} alt={product.name}/>
                                    </Dot>
                                    <Dot className='carousel__dot--selected' key={2} slide={2}>
                                        <img key={2} src={`${API}/product/photo2/${product._id}`} alt={product.name}/>
                                    </Dot>
                                </div>
                                <ButtonBack className='carousel__back-button'>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </ButtonBack>
                                <ButtonNext className='carousel__next-button'>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </ButtonNext>
                            </CarouselProvider>
                        </div>
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p>{
                                    product.price
                                        .toString()
                                        .split("")
                                        .reverse()
                                        .map(
                                            (v, i, a) => (i < a.length - 1 && i % 3 == 0)
                                                ? v + " "
                                                : v
                                        )
                                        .reverse()
                                        .join("")
                                }
                                so'm</p>
                            <p>{product.quantity}
                                dona qoldi</p>
                            <button
                                className='card-basket-btn ml-2'
                                onClick={handleAddCard}
                                id={product._id}>
                                <i className="fa-solid fa-cart-shopping card-icon"></i>
                            </button>
                            <button
                                className="buyBtn mt-2 mb-2 mobileBtn"
                                onClick={handleBuy}
                                id={product._id}>
                                Xarid qilish
                            </button>
                            <div dangerouslySetInnerHTML={createMarkup(product.description)}/>
                        </div>
                    </div>
                }
                <div
                        className="alert alert-danger"
                        style={{
                            display: error
                                ? ''
                                : 'none'
                        }}>
                        {error}
                    </div>
                </Layout>
                    {
                    soldModal && <SoldModal setSoldModal={setSoldModal}/>
                } {
                    modal && <BuyModal
                            setModal={setModal}
                            id={buyProduct}
                            product={product}
                            setSoldModal={setSoldModal}/>
                }
                { loading && <Loading />}
                </div>
    );
};

export default Product;
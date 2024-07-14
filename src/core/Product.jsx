import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read} from './apiCore';
import {API} from '../config';
import Loading from '../components/Loading/Loading';
import Alert from '../components/Alert/Alert';
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
    const [referral, setReferral] = useState('')
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")

    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }  


    const handleBuy = (e) => {
        setModal(true)
        setBuyProduct(e.target.id)
        const referralId = props.location.search.split('=')[1]
        if(referralId) {
            setReferral(referralId)
        }
    }

    const handleAddCard = (e) => {
        if (typeof window !== 'undefined') {
            let card = []
            if (localStorage.getItem('card')) {
                let unique = []
                card = JSON.parse(localStorage.getItem('card'))
                unique = card.filter(item => item._id == product._id)
                if (unique.length) {
                    alertStatus("error", "Mahsulot savatchada mavjud")
                } else {
                    card.push({...product, count: 1})
                    localStorage.setItem('card', JSON.stringify(card))
                    alertStatus("success", "Mahsulot savatchaga qo'shildi")
                }
            } else {
                card.push({...product, count: 1})
                localStorage.setItem('card', JSON.stringify(card))
                alertStatus("success", "Mahsulot savatchaga qo'shildi")
            }
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
            <Layout
                title={product && product.name}
                description={product && product.description && product
                    .description
                    .substring(0, 100)}
                className="container">
                {
                    props && props.match.params.productId === product._id && 
                    <div className='mb-5'>
                    <div className="product-page">
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
                            <h2 className='product-name'>{product.name}</h2>
                            <p className='product-price'>{
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
                            <p className='product-quantity'>{product.quantity} dona qoldi</p>
                            <div className="product-info-actions">
                            <button
                                className="product-buy-btn"
                                onClick={handleBuy}
                                id={product._id}>
                                Xarid qilish
                            </button>
                            <button
                                className='product-add-card-btn'
                                onClick={handleAddCard}
                                id={product._id}>
                                <span>Savatga qo'shish </span>
                                <i className="fa-solid fa-cart-shopping card-icon"></i>
                            </button>
                            </div>
                        </div>
                    </div>
                    <p className='product-description-title'>Mahsulot haqida</p>
                    <div dangerouslySetInnerHTML={createMarkup(product.description)}/>
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
                    {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
                    {
                        soldModal && <SoldModal setSoldModal={setSoldModal}/>
                    } {
                        modal && <BuyModal
                        setModal={setModal}
                        id={buyProduct}
                        product={product}
                        referral={referral}
                        setSoldModal={setSoldModal}/>
                    }
                { loading && <Loading />}
                    </Layout>
    );
};

export default Product;
import React, {useState} from "react";
import {order} from "./apiCore"
import {API} from "../config"
import Loading from "../components/Loading/Loading";


function BuyModal({setModal, id, product, referral, setSoldModal}) {
    const [values, setValues] = useState({
        emaunt: 1, price: product.price, name: '', tel: "", loading: false, error: ''
    });
    const handleClose = () => {
        setModal(false)
    }
    const {
        emaunt, price, name, tel, loading, error
    } = values;

    const handleChange = name => e => {
        const value = name === "tel" ? e.target.value.slice(0, 13) : e.target.value;
        setValues({ ...values, [name]: value });
    };
    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        const number = tel.split('').length
        if(number !== 13) {
            return setValues({...values, error: 'Telefon raqamni tekshirib qaytadan kiriting!'})
        }
        if(tel.slice(0, 4) !== '+998') {
            return setValues({...values, error: `Faqat O'zbekiston raqamini kiriting!`})
        }

        order(id, emaunt, price, name, tel, product.market._id ? product.market._id : product.market, referral ? referral : null).then(data => {
            if (data) {
                setValues({
                    ...values, name: '', tel: 0, loading: false, error: '' 
                });
                setModal(false)
                setSoldModal(true)
            } else {
                setValues({ ...values, error: data.error });
            }
        });
    };

    const handleMinus = () => {
        setValues({...values, 'emaunt': emaunt !== 1 ? emaunt - 1 : 1, 'price': price !== product.price ? price - product.price : product.price})
    }

    const handleAdd = () => {
        setValues({...values, 'emaunt': emaunt + 1, 'price': price + product.price})
    }
    return (
        <div className="modalWrapper">
            {loading && <Loading />}
            <div className="modalBody">
                <header className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0 mb-2">Ma'lumotlarni kiriting</h5>
                    <button className="btn close p-1" onClick={handleClose}><i className="fa-solid fa-times"></i></button>
                </header>
                <div>
                    <div className="mb-2 d-flex align-items-center">
                        <img className="border mr-3 buyModal-img" width={'150px'} src={`${API}/product/photo/${product._id}`} alt="img" />
                        <div className="mt-3">
                            <p className="buymodal-product-name">{product.name}</p>
                            <p>{price.toString()
                                        .split("")
                                        .reverse()
                                        .map(
                                            (v, i, a) => (i < a.length - 1 && i % 3 == 0 || i % 6 == 0)
                                                ? v + " "
                                                : v
                                        )
                                        .reverse()
                                        .join("")} so'm</p>
                            <div className="buyModal-emaunt">
                                <button onClick={handleMinus} className="btn border rounded">-</button>
                                <p className="p-3 mb-0">{emaunt}</p>
                                <button onClick={handleAdd} className="btn border rounded">+</button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Ismingizni kiriting</label>
                            <input className="form-control" name="name" type="text" placeholder="Ism" onChange={handleChange('name')} required />
                        </div>
                        <div className="form-group">
                            <label>Telefon raqamingizni kiriting</label>
                            <input className="form-control" value={tel} name="tel" type="text" placeholder="+998901234567" onChange={handleChange('tel')} maxLength={13} minLength={13} required />
                        </div>
                        {error && <p className="mt-1 mb-1 text-danger">{error}</p>}
                        <button className="btn btn-warning btn-block" type="submit">Buyurtma qilish</button>
                    </form>
                </div>
            </div>
        </div>  
    )
};

export default BuyModal;
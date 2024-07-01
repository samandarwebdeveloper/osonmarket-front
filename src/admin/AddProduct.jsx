import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
// import { Link } from 'react-router-dom';
import { createProduct, getCategories, getMarkets } from './apiAdmin';
import Loading from '../components/Loading/Loading';
import { Link } from 'react-router-dom';
import Alert from "../components/Alert/Alert"

const AddProduct = () => {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);

    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
      }, [images]);



  
    const [values, setValues] = useState({
        name: '', description: '', price: '', sellPrice: '', categories: [], category: '',
        quantity: '', video_link: '', market: '',
        photo: '', photo1: '', photo2: '', loading: false, error: '',
        createdProduct: '', redirectToProfile: false, formData: ''
    });
    const [markets, setMarkets] = useState([])

    const { user, token } = isAuthenticated();

    const {
        name, description, price, categories, quantity, video_link, sellPrice,
        loading, formData
    } = values;

    function init(){
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
        getMarkets().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setMarkets(data);
            }
        });
    };

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => e => {
        const value = e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });

    };

    function onImageChange(e) {
        setImages([...e.target.files]);
        const files = Array.from(e.target.files);
        files.forEach((file, i) => {
          if(i === 0) formData.set('photo', file);
            if(i === 1) formData.set('photo1', file);
            if(i === 2) formData.set('photo2', file);
        });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                alertStatus("error", "Mahsulot qo'shilmadi")
                setValues({ ...values, error: data.error });
            } else {
                alertStatus("success", "Mahsulot qo'shildi")
                setValues({
                    ...values, name: '', description: '', video_link: '', seller_id: '', photo: '', photo1: '', photo2: '', sellPrice: '', market: '',
                    price: '', quantity: '', loading: false, createdProduct: data.name
                });
                setImages([]);
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="add-product-div">
            <div className="form-group image-input">
                <label className="btn border rounded btn-block">
                    <input onChange={onImageChange} type="file" name="photo" accept="image/*" multiple />
                    {imageURLS.map((imageSrc, i) => (
                        <img key={i} src={imageSrc} alt="not fount" width={"200px"} />
                    ))}
                </label>
            </div>
            <div className='product-inputs'>

            <div className="form-group">
                <label className="text-muted">Nomi</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} placeholder='Mahsulot nomi' />
            </div>

            <div className="form-group">
                <label className="text-muted">Ma'lumot</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} placeholder='Mahsulot haqida ma`lumot' />
            </div>

            <div className="form-group">
                <label className="text-muted">Narxi</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} placeholder='Mahsulot narxi' />
            </div>
            <div className="form-group">
                <label className="text-muted">Oqim narxi</label>
                <input onChange={handleChange('sellPrice')} type="number" className="form-control" value={sellPrice} placeholder='Oqimdan ulush' />
            </div>
            <div className="form-group">
                <label className="text-muted">Miqdori</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} placeholder='Mahsulot miqdori' />
            </div>

            <div className="form-group">
                <label className="text-muted">Kategoriya</label>
                <select defaultValue="default" onChange={handleChange('category')} className="form-control" >
                    <option value="default" disabled>Tanlang</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Market</label>
                <select defaultValue="default" onChange={handleChange('market')} className="form-control" >
                    <option value="default" disabled>Tanlang</option>
                    {markets &&
                        markets.map((m, i) => (
                            <option key={i} value={m._id}>
                                {m.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Video link</label>
                <input onChange={handleChange('video_link')} type="text" className="form-control" value={video_link} placeholder='Video link' />
            </div>
            <button className="btn btn-primary btn-block">Qo'shish</button>
            </div>
            </div>
        </form>
    );
    

    const showLoading = () => (
        <Loading />
    );

    return (
        <Layout title="Add a new product" description={`Good Day ${user.name}, ready to add a new product?`}>
            <div className="container">
            <Link className='btn bg-primary mt-2 text-white mb-3' to='/admin'><i className="fa-solid fa-arrow-left mr-2"></i>Ortga qaytish</Link>
                    {loading && showLoading()}
                    {newPostForm()}
            </div>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </Layout>
    );
};

export default AddProduct;
import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
// import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';
import Loading from '../components/Loading/Loading';
import { Link } from 'react-router-dom';
import Alert from "../components/Alert/Alert"

const AddProduct = () => {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

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
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

  
    const [values, setValues] = useState({
        name: '', description: '', price: '', categories: [], category: '',
        quantity: '', video_link: '', seller_id: '',
        photo: '', loading: false, error: '',
        createdProduct: '', redirectToProfile: false, formData: ''
    });

    const { user, token } = isAuthenticated();

    const {
        name, description, price, categories, quantity, video_link, seller_id,
        loading, error, createdProduct, formData
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
    };

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => e => {
        if (name === 'photo') {
            if (!e.target.files || e.target.files.length === 0) {
                setSelectedFile(undefined)
                return
            }
    
            // I've kept this example simple by using the first image instead of multiple
            setSelectedFile(e.target.files[0])
        }
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

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
                    ...values, name: '', description: '', video_link: '', seller_id: '', photo: '',
                    price: '', quantity: '', loading: false, createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h5>Rasm qo'shish</h5>
            <div className="form-group">
                <label className="btn border rounded btn-block">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                    {selectedFile &&  <img src={preview} alt="product" width={"250px"} /> }
                </label>
            </div>

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
                <label className="text-muted">Miqdori</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} placeholder='Mahsulot miqdori' />
            </div>

            <div className="form-group">
                <label className="text-muted">Kategoriya</label>
                <select onChange={handleChange('category')} className="form-control" >
                <option value="DEFAULT" disabled selected>Tanlang</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Video link</label>
                <input onChange={handleChange('video_link')} type="text" className="form-control" value={video_link} placeholder='Video link' />
            </div>
            <button className="btn btn-primary btn-block">Qo'shish</button>
        </form>
    );
    

    const showLoading = () => (
        <Loading />
    );

    return (
        <Layout title="Add a new product" description={`Good Day ${user.name}, ready to add a new product?`}>
            <div className="container">
            <Link className='btn bg-primary mt-2 text-white mb-3' to='/admin'><i className="fa-solid fa-arrow-left mr-2"></i>O'rtga qaytish</Link>
                    {loading && showLoading()}
                    {newPostForm()}
            </div>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </Layout>
    );
};

export default AddProduct;
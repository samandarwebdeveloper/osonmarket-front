import { memo, useEffect, useState } from "react"
import { isAuthenticated } from "../../auth";
import { getAllProducts } from "../../core/apiCore";
import { createReferral, getSellerById } from "../../admin/apiAdmin";
import ShowImage from "../../core/ShowImage";
import Carousel from "../../core/Carousel";
import AddWrapper from "../../components/AddWrapper/AddWrapper";
import AddRefForm from "./AddRefForm";
import Alert from "../../components/Alert/Alert";

function SellerMain() {
    const {user, token} = isAuthenticated()
    const [addOpen, setAddOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [product, setProduct] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [seller, setSeller] = useState({})

    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    useEffect(() => {
        getAllProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }, [])

    
    const handleAddORefOpen = (product) => {
        setProduct(product)
        setAddOpen(true)
    }

    const clickSubmit = e => {
        e.preventDefault()
        createReferral(user._id, token, name, product).then(data => {
            if (data.error) {
                console.log(data.error)
                alertStatus("error", data.error)
            } else {
                setAddOpen(false)
                alertStatus("success", "Oqim qo'shildi")
            }
        })
    }

    useEffect(() => {
        getSellerById(user._id, token).then(data => {
            if (data.error) {
                alertStatus("error", data.error)
            } else {
                setSeller(data)
            }
        })
    }
    , [])
    return (
        <div className="Category">
            <div className="Category-header">
                <h2>{seller.balance} so'm</h2>
            </div>
            <div className="Category-body">
                <Carousel />
            </div>
            <div className="productList">
            {products && products.map((product, i) => (
                <div key={i} className="product-card">
                    <ShowImage className="showImg" item={product} url="product" />
                    <h3>Nomi: <span>{product.name}</span></h3>
                    <p>Narxi: <span>{product.price}</span> so'm</p>
                    <p>Soni: <span>{product.quantity}</span> dona</p>
                    <p>Daromad: <span>{product.sellPrice}</span> so'm</p>
                    <span>ID: {product._id}</span>
                    <div className="product-card-actions">
                        <a href={`/${product._id}`} >Material</a>
                        <button onClick={() => handleAddORefOpen(product)}>Oqim olish</button>
                    </div>
                </div>
            ))}
            </div>
            <AddWrapper 
                children={
                    <AddRefForm 
                        onSubmit={clickSubmit} 
                        setName={setName}
                    />
                } 
                addOpen={addOpen} 
                setAddOpen={setAddOpen} 
            />        
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default memo(SellerMain)
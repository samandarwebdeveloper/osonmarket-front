import { memo, useState, useEffect } from "react"
import { isAuthenticated } from "../../auth";
import { getReferrals, removeReferral, getSellerById } from "../../admin/apiAdmin";
import { API, URL } from "../../config";
import Alert from "../../components/Alert/Alert";

function Ref() {
    const {user, token} = isAuthenticated()
    const [referrals, setReferrals] = useState([])
    const [alert, setAlert] = useState(true)
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
        const init = () => {
            getReferrals(user._id).then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setReferrals(data)
                }
            })
        }
        init()
    }, [])

    const handleRemove = async (id) => {
        await removeReferral(user._id, token, id).then(data => {
            if(data) {
                setReferrals(referrals.filter(referrals => referrals._id !== id))
                alertStatus("success", "Oqim o'chirildi")
            }
        })
        .catch(err => {
            alertStatus("error", err)
            console.log(err)
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

    const copyRefUrl = (url) => {
        navigator.clipboard.writeText(url)
        alertStatus("success", "Link nusxalandi")
    }
    return (
        <div className="Category">
            <div className="Category-header">
            <h2>{seller.balance ? seller.balance : 0} so'm</h2>
            </div>
            <div className="productList">
                {referrals && referrals.map((referral, i) => (
                    referral.productId ?
                        <div key={i} className="product-card">
                            <img className="showImg" src={`${API}/product/photo/${referral.productId._id}`} alt={referral.productId.name} />
                            <h3>Nomi: <span>{referral.name}</span></h3>
                            <p>Mahsulot nomi: <span>{referral.productName}</span></p>
                            <p>Oqim narxi: <span>{referral.price}</span></p>
                            <p>Mahsulot narxi: <span>{referral.productPrice}</span></p>
                            <p>Qo'shilgan vaqti: <span>{new Date(referral.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.')}</span></p>
                            <div className="ref-card-actions">
                                <button className="delete-btn" onClick={() => handleRemove(referral._id)}><i className="fa-solid fa-trash"></i></button>
                                <a href={`${URL}product/${referral.productId._id}?ref=${referral._id}`} target="_blank" rel="noreferrer">
                                    <i className="fa-solid fa-link"></i>
                                </a>
                                <button className="copy-btn" onClick={() => copyRefUrl(`http://localhost:5173/product/${referral.productId._id}?ref=${referral._id}`)}>
                                    <i className="fa-solid fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        : <div key={i} className="product-card">
                            <p>Mahsulot topilmadi</p>
                            <h3>Nomi: <span>{referral.name}</span></h3>
                            <button className="delete-btn" onClick={() => handleRemove(referral._id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                ))}
            </div>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default memo(Ref)
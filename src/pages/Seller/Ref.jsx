import { memo, useState, useEffect } from "react"
import { isAuthenticated } from "../../auth";
import { getReferrals, removeReferral, getSellerById } from "../../admin/apiAdmin";
import { API } from "../../config";
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
    return (
        <div className="Category">
            <div className="Category-header">
                <h2>{seller.balance} so'm</h2>
            </div>
            <div className="productList">
                {referrals && referrals.map((referral, i) => (
                    <div key={i} className="product-card showImg">
                        <img src={`${API}/product/photo/${referral.productId}`} alt={referral.productName} />
                        <h3>Nomi: <span>{referral.name}</span></h3>
                        <p>Mahsulot nomi: <span>{referral.productName}</span></p>
                        <p>Oqim narxi: <span>{referral.price}</span></p>
                        <p>Mahsulot narxi: <span>{referral.productPrice}</span></p>
                        <p>Qo'shilgan vaqti: <span>{new Date(referral.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.')}</span></p>
                        <div className="ref-card-actions">
                            <button className="delete-btn" onClick={() => handleRemove(referral._id)}><i className="fa-solid fa-trash"></i></button>
                            <a href={`/product/${referral.product}`} className="edit-btn"><i className="fa-solid fa-eye"></i></a>
                            <button className="copy-btn"><i className="fa-solid fa-copy"></i></button>
                        </div>
                    </div>
                ))}
            </div>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default memo(Ref)
import { memo, useEffect, useState } from "react"
import { getAllProducts } from "../../core/apiCore";
import { isAuthenticated } from "../../auth";
import { deleteProduct } from '../../admin/apiAdmin';
import { API } from "../../config";

import Alert from "../../components/Alert/Alert"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Products() {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [products, setProducts] = useState([])

    const {user, token} = isAuthenticated()

    
    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const handleDelete = async (id) => {
        await deleteProduct(user._id, token, id).then(data => {
            if(data) {
                alertStatus("success", "Mahsulot o'chirildi")
                setProducts(products.filter(products => products._id !== id))
            }
        })
        .catch(err => {
            alertStatus("error", err)
        })
    }


    useEffect(() => {
        const init = () => {
            getAllProducts().then(data => {
                if (data.error) {
                    alertStatus("error", data.error)
                } else {
                    setProducts(data);
                }
            });
        };
        init();
    }, []);

    return (
        <div className="Category">
            <div className="Category-header">
                <h2>Mahsulotlar</h2>
                <Link className="add-btn" to="/create/product"><i className="fa-solid fa-plus"></i></Link>
            </div>
            <table className="table-scroll">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Rasm</th>
                        <th>Nomi</th>
                        <th>Kategoriya</th>
                        <th>Narxi</th>
                        <th>Oqim narxi</th>
                        <th>Miqdori</th>
                        <th>Video</th>
                        <th>Do'kon</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td><img
                                    src={`${API}/product/photo/${item._id}`}
                                    alt={item.name}
                                    className="mb-3"
                                    style={{ maxHeight: "100%", maxWidth: "120px", width: "100%" }}
                                /></td>
                                <td>{item.name}</td>
                                <td className="product-list-name">{item.category.name}</td>
                                <td>{item.price} so'm</td>
                                <td>{item.sellPrice} so'm</td>
                                <td>{item.quantity} dona</td>
                                <td><a href={item.video_link}>Video</a></td>
                                <td>{item.market.name}</td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className="delete-btn"><i className="fa-solid fa-trash-can"></i></button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default memo(Products)
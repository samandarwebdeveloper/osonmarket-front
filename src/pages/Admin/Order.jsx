import { memo, useEffect, useState } from "react"
import { isAuthenticated } from "../../auth";
import Alert from "../../components/Alert/Alert";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../../admin/apiAdmin";
import { API } from "../../config";
import EditWrapper from "../../components/EditWrapper/EditWrapper";
import EditOrderForm from "./EditOrderStatus";


function Order() {
    const {user, token} = isAuthenticated()
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [editOpen, setEditOpen] = useState(false)
    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState({})
    const [updateStatus, setUpdateStatus] = useState("")
    
    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }  

    useEffect(() => {
        getAllOrders(token).then(data => {
            if (data.error) {
                alertStatus("error", data.error)
            } else {
                setOrders(data)
            }
        })
    }
    , [])

    const handleEditOpen = (id) => {
        setEditOpen(true)
        setOrder(orders.find(order => order._id === id))
        setUpdateStatus(order.status)
    }

    function formatDate(date) {
        const currentMonth = date.getMonth();
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        const currentHour = date.getHours();
        const hourString = currentHour >= 10 ? currentHour : `0${currentHour}`;
        const currentMinute = date.getMinutes();
        const minuteString = currentMinute >= 10 ? currentMinute : `0${currentMinute}`;
        return `${dateString}.${monthString}.${date.getFullYear()} ${hourString}:${minuteString}`;
    }
    
    const onUpdate = (e) => {
        e.preventDefault()
        updateOrderStatus(user._id, token, order._id, updateStatus).then(data => {
            if (data.error) {
                alertStatus("error", data.error)
            } else {
                setEditOpen(false)
                alertStatus("success", "Buyurtma yangilandi")
                getAllOrders(token).then(data => {
                    if (data.error) {
                        alertStatus("error", data.error)
                    } else {
                        setOrders(data)
                    }
                })
            }
        })
    }

    const handleDelete = async (id) => {
        await deleteOrder(user._id, token, id).then(data => {
            if(data) {
                setOrders(orders.filter(order => order._id !== id))
                alertStatus("success", "Buyurtma o'chirildi")
            }
        })
        .catch(err => {
            alertStatus("error", err)
        })
    }

    return (
        <div className="Category">
            <div className="Category-header">
                <h3>Buyurtmalar</h3>
            </div>
            <div className="Profit-body">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Oqim ID</th>
                                <th>Telefon raqami</th>
                                <th>Summa</th>
                                <th>Mahsulot</th>
                                <th>Do'kon</th>
                                <th>Buyurtma vaqti</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.referralId ? order.referralId : "Yo'q"}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.price.toString()
                                        .split("")
                                        .reverse()
                                        .map(
                                            (v, i, a) => (i < a.length - 1 && i % 3 == 0 || i % 6 == 0)
                                                ? v + " "
                                                : v
                                        )
                                        .reverse()
                                        .join("")} so'm
                                    </td>
                                    <th className="p-0">
                                            {
                                                !order.productId ? "Mahsulot topilmadi" : <a href={`/product/${order.productId ? order.productId._id : ""}`}>
                                                    <img width={"80"} src={`${API}/product/photo/${order.productId ? order.productId._id : ""}`} alt={order.productId ? order.productId.name : ""} />
                                                </a>
                                            }
                                    </th>
                                    <td>{order.marketId.name}</td>
                                    <td>{formatDate(new Date(order.createdAt))}</td>
                                    <td>
                                        {order.status}
                                        {order.productId ?
                                            <button onClick={() => handleEditOpen(order._id)} className="edit-btn"><i className="fa-solid fa-pencil"></i></button>
                                            : 
                                            <button onClick={() => handleDelete(order._id)} className="edit-btn"><i className="fa-solid fa-trash"></i></button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
            <EditWrapper 
                children={
                    <EditOrderForm 
                        updateStatus={updateStatus} 
                        setUpdateStatus={setUpdateStatus} 
                        onUpdate={onUpdate}
                    />
                } 
                editOpen={editOpen} 
                setEditOpen={setEditOpen} 
            />
        </div>
    )
}

export default memo(Order)
import { memo, useEffect, useState } from "react"
import { isAuthenticated } from "../../auth";
import Alert from "../../components/Alert/Alert";
import { getAllProfits } from "../../admin/apiAdmin";

function AdminProfit() {
    const {user, token} = isAuthenticated()
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    // const [addOpen, setAddOpen] = useState(false)
    const [profits, setProfits] = useState([])
    
    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }  

    useEffect(() => {
        getAllProfits(token).then(data => {
            if (data.error) {
                alertStatus("error", data.error)
            } else {
                setProfits(data)
            }
        })
    }
    , [])

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

    return (
        <div className="Category">
            <div className="Category-header">
                <h3>To'langan summa <span>{profits.reduce((acc, item) => acc + item.status === "To'landi" ? item.price : 0, 0)} so'm</span></h3>
            </div>
            <div className="Profit-body">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Karta raqami</th>
                                <th>Summa</th>
                                <th>Vaqt</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profits.map((profit, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{profit.cardNumber}</td>
                                    <td>{profit.price} so'm</td>
                                    <td>{formatDate(new Date(profit.createdAt))}</td>
                                    <td>{profit.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default memo(AdminProfit)
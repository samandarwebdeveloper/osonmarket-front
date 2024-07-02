import { memo, useEffect, useState } from "react"
import { isAuthenticated } from "../../auth";
import Input from "../../components/Input/Input";
import AddWrapper from "../../components/AddWrapper/AddWrapper";
import Alert from "../../components/Alert/Alert";
import { getSellerById, createProfit, getProfitsById } from "../../admin/apiAdmin";

function Profit() {
    const {user, token} = isAuthenticated()
    const [cardNumber, setCardNumber] = useState("")
    const [summa, setSumma] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [addOpen, setAddOpen] = useState(false)
    const [seller, setSeller] = useState({})
    const [profits, setProfits] = useState([])
    
    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const clickSubmit = e => {
        e.preventDefault()
        createProfit(user._id, token, user.phone, user.name, cardNumber, summa).then(data => {
            if (data.error) {
                alertStatus("error", data.error)
            } else {
                setAddOpen(false)
                alertStatus("success", "Hisobdan pul yechildi")
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
        getProfitsById(user._id, token).then(data => {
            if (data.error) {
                alertStatus("error", data.error)
            } else {
                setProfits(data)
            }
        })
    }
    , [addOpen])

    return (
        <div className="Category">
            <div className="Category-header">
            <h2>{seller.balance ? seller.balance : 0} so'm</h2>
                <button onClick={() => setAddOpen(true)} className="btn btn-primary">Hisobdan pul yechish</button>
            </div>
            <div className="Profit-body">
                    <h3>Hisobdan pul yechishlar <span>{profits.reduce((acc, item) => acc + item.price, 0)} so'm</span></h3>
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
                                    <td>{new Date(profit.createdAt).toLocaleString()}</td>
                                    <td>{profit.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
            <AddWrapper addOpen={addOpen} setAddOpen={setAddOpen}>
                <Input type="number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Karta raqami" minLength="16" />
                <Input type="number" value={summa} onChange={e => setSumma(e.target.value)} placeholder="Summa" />
                <button className="submit-btn" onClick={clickSubmit}>Yechish</button>
            </AddWrapper>
        </div>
    )
}

export default memo(Profit)
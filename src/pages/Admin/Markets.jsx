import { memo, useEffect, useState } from "react"
import { isAuthenticated } from "../../auth";
import { getMarkets, createMarket, deleteMarket } from '../../admin/apiAdmin';


import AddWrapper from "../../components/AddWrapper/AddWrapper"
import Alert from "../../components/Alert/Alert"
import AddMarket from "../../components/AddMarket/AddMarket"

function Markets() {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [markets, setMarkets] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
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
        await deleteMarket(user._id, token, id).then(data => {
            if(data) {
                setMarkets(markets.filter(markets => markets._id !== id))
                alertStatus("success", "Do'kon o'chirildi")
            }
        })
        .catch(err => {
            alertStatus("error", err)
        })
    }

    
    const clickSubmit = e => {
        if (phone === "" || name === "" || password === "") {
            alertStatus("error", "Malumotlar to'ldirilmagan")
            return
        }
        if (phone.length !== 13) {
            alertStatus("error", "Telefon raqam noto'g'ri")
            return
        }
        createMarket(user._id, token, { name, phone, password }).then(data => {
            if (data.error) {
                alertStatus("error", "Do'kon mavjud")
            } else {
                setAddOpen(false)
                alertStatus("success", "Do'kon qo'shildi")
                getMarkets().then(data => {
                    if (data.error) {
                        alertStatus("error", data.error)
                    } else {
                        setMarkets(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const init = () => {
            getMarkets().then(data => {
                if (data.error) {
                    alertStatus("error", data.error)
                } else {
                    setMarkets(data);
                }
            });
        };
        init();
    }, []);


    return (
        <div className="Category">
            <div className="Category-header">
                <h2>Do'konlar</h2>
                <button onClick={() => setAddOpen(true)} className="add-btn"><i className="fa-solid fa-plus"></i></button>
            </div>
            <table className="table-scroll">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Phone</th>
                        <th>Balance</th>
                        <th>Products</th>
                        <th>Sold products</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {markets && markets.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.balance}</td>
                                <td>{item.products}</td>
                                <td>{item.soldProduct}</td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className="delete-btn"><i className="fa-solid fa-trash-can"></i></button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            <AddWrapper 
                children={
                    <AddMarket 
                        onSubmit={clickSubmit} 
                        setName={setName}
                        setPhone={setPhone}
                        setPassword={setPassword}
                    />
                } 
                addOpen={addOpen} 
                setAddOpen={setAddOpen} 
            />
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default memo(Markets)
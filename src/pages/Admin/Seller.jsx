import { memo, useEffect, useState } from "react"
import { isAuthenticated } from "../../auth";
import { getSellers, createSeller, deleteSeller } from '../../admin/apiAdmin';


import AddWrapper from "../../components/AddWrapper/AddWrapper"
import Alert from "../../components/Alert/Alert"
import AddSeller from "../../components/AddSeller/AddSeller"

function Seller() {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [sellers, setSellers] = useState([])
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
        await deleteSeller(user._id, token, id).then(data => {
            if(data) {
                setSellers(sellers.filter(sellers => sellers._id !== id))
                alertStatus("success", "Targitolog o'chirildi")
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
        createSeller(user._id, token, { name, phone, password }).then(data => {
            if (data.error) {
                alertStatus("error", "Targitolog mavjud")
            } else {
                setAddOpen(false)
                alertStatus("success", "Targitolog qo'shildi")
                getSellers().then(data => {
                    if (data.error) {
                        alertStatus("error", data.error)
                    } else {
                        setSellers(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const init = () => {
            getSellers().then(data => {
                if (data.error) {
                    alertStatus("error", data.error)
                } else {
                    setSellers(data);
                }
            });
        };
        init();
    }, []);


    return (
        <div className="Category">
            <div className="Category-header">
                <h2>Sotuvchilar</h2>
                <button onClick={() => setAddOpen(true)} className="add-btn"><i className="fa-solid fa-plus"></i></button>
            </div>
            <table className="table-scroll">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Phone</th>
                        <th>Balance</th>
                        <th>Sold product</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers && sellers.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.balance}</td>
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
                    <AddSeller 
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

export default memo(Seller)
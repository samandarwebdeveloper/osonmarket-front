import { memo, useEffect, useState } from "react"
import { getUsers, getCategoryById } from "../../core/apiCore";
import { isAuthenticated } from "../../auth";
import { deleteCategory, createCategory, editCategory } from '../../admin/apiAdmin';


import AddWrapper from "../../components/AddWrapper/AddWrapper"
import EditWrapper from "../../components/EditWrapper/EditWrapper"
import Alert from "../../components/Alert/Alert"
import CatalogAddForm from "../../components/CatalogAddForm/CatalogAddForm"
import CategoryEditForm from "../../components/CategoryEditForm/CategoryEditForm"

function Seller() {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [categories, setCategories] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [name, setName] = useState("")
    const [catId, setCatId] = useState("")
    const [updateName, setUpdateName] = useState("")

    const {user, token} = isAuthenticated()

    
    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }
    

    const fetchCategoryById = async (id) => {
        const response = await getCategoryById(id)
        setUpdateName(await response.name)
        setCatId(await response._id)
    }

    const onUpdate = async () => {
        if(updateName === "") {
            alertStatus("error", "Category name cannot be empty")
            return
        }
        editCategory(user._id, token, catId, updateName).then(data => {
            if (data.error) {
                alertStatus("error", "Kategoriya mavjud")
            } else {
                setEditOpen(false)
                alertStatus("success", "Kategoriya yaratildi")
                getCategories().then(data => {
                    if (data.error) {
                        alertStatus("error", data.error)
                    } else {
                        setCategories(data);
                    }
                });
            }
        });
    }

    const handleDelete = async (id) => {
        await deleteCategory(user._id, token, id).then(data => {
            if(data) {
                setCategories(categories.filter(categories => categories._id !== id))
                alertStatus("success", "Kategoriya o'chirildi")
            }
        })
        .catch(err => {
            alertStatus("error", err)
        })
    }

    
    const clickSubmit = e => {
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                alertStatus("error", "Kategoriya mavjud")
            } else {
                setAddOpen(false)
                alertStatus("success", "Kategoriya yaratildi")
                getUsers().then(data => {
                    if (data.error) {
                        alertStatus("error", data.error)
                    } else {
                        setCategories(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const init = () => {
            getUsers().then(data => {
                if (data.error) {
                    alertStatus("error", data.error)
                } else {
                    setCategories(data);
                }
            });
        };
        init();
    }, []);

    const handleEditOpen = (e) => {
        fetchCategoryById(e)
        setEditOpen(true)
    }

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
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button onClick={() => handleEditOpen(item._id)} className="update-btn"><i className="fa-solid fa-pen"></i></button>
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
                    <CatalogAddForm 
                        onSubmit={clickSubmit} 
                        setName={setName}
                    />
                } 
                addOpen={addOpen} 
                setAddOpen={setAddOpen} 
            />
            <EditWrapper 
                children={
                    <CategoryEditForm 
                        updateName={updateName} 
                        setUpdateName={setUpdateName} 
                        onUpdate={onUpdate}
                    />
                } 
                editOpen={editOpen} 
                setEditOpen={setEditOpen} 
            />
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default memo(Seller)
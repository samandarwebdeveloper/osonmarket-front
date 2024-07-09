
function EditOrderForm ({
    updateStatus,
    onUpdate,
    setUpdateStatus
}) {


    return (
        <div className="CategoryEditForm">
            <div className="CategoryEditForm__content">
                <select 
                    className="form-control mb-3"
                    defaultValue="default"
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                >
                    <option value="Buyurtma qabul qilindi">Buyurtma qabul qilindi</option>
                    <option value="Bekor qilindi">Bekor qilindi</option>
                    <option value="Jo'natilmoqda">Jo'natilmoqda</option>
                    <option value="Jo'natildi">Jo'natildi</option>
                    <option value="To'landi">To'landi</option>
                </select>
                </div>
            <div className="CategoryEditForm__buttons">
                <button onClick={onUpdate} className="submit-btn">Saqlash</button>
            </div>
        </div>
    )
}


export default EditOrderForm
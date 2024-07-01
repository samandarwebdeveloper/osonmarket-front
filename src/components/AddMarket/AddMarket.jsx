import Input from "../Input/Input"


function AddMarket ({
    onSubmit,
    setName,
    setPhone,
    setPassword
}) {
    return (
        <div className="CatalogAddForm">
            <div className="CatalogAddForm-input">
                <Input
                    type="text"
                    name="name"
                    placeholder="Do'kon nomi"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />
                <Input
                    type="text"
                    name="phone"
                    placeholder="Do'kon raqami"
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />
                <Input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />
            </div>
            <button className="submit-btn" onClick={onSubmit}>Qo'shish</button>
        </div>
    )
}


export default AddMarket
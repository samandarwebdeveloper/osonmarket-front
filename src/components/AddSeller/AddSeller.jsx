import Input from "../Input/Input"


function AddSeller ({
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
                    placeholder="Targitolog ismi"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />
                <Input
                    type="text"
                    name="phone"
                    placeholder="Targitolog raqami"
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


export default AddSeller
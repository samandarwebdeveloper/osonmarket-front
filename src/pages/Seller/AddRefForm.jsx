import Input from "../../components/Input/Input"


function AddRefForm ({
    onSubmit,
    setName
}) {
    return (
        <div className="CatalogAddForm">
            <div className="CatalogAddForm-input">
                <Input
                    type="text"
                    name="name"
                    placeholder="Oqim nomi"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />
            </div>
            <button className="submit-btn" onClick={onSubmit}>Qo'shish</button>
        </div>
    )
}


export default AddRefForm
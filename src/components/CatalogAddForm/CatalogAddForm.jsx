import "./CatalogAddForm.scss"

import Input from "../Input/Input"


function CatalogAddForm ({
    onSubmit,
    setName
}) {
    return (
        <div className="CatalogAddForm">
            <div className="CatalogAddForm-input">
                <Input
                    type="text"
                    name="name"
                    placeholder="Katalog nomi"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />
            </div>
            <button className="submit-btn" onClick={onSubmit}>Qo'shish</button>
        </div>
    )
}


export default CatalogAddForm
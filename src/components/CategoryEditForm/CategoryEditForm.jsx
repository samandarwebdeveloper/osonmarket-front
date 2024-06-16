import "./CategoryEditForm.scss"

import Input from "../Input/Input"

function CategoryEditForm ({
    updateName,
    onUpdate,
    setUpdateName
}) {


    return (
        <div className="CategoryEditForm">
            <div className="CategoryEditForm__content">
                <Input
                    type="text"
                    name="name"
                    label="Nomi"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onUpdate()}
                />
                </div>
            <div className="CategoryEditForm__buttons">
                <button onClick={onUpdate} className="submit-btn">Saqlash</button>
            </div>
        </div>
    )
}


export default CategoryEditForm
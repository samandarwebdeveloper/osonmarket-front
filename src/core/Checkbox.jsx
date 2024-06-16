import React, { useState } from "react";
import './chekbox.scss'

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                id={c.name}
                name={c.name}
                className="form-check-input chek-input"
            />
            <label className="form-check-label chek" htmlFor={c.name}>{c.name}</label>
        </li>
    ));
};

export default Checkbox;
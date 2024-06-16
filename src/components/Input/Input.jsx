import "./Input.scss"

function Input ({
    type,
    name,
    label,
    placeholder,
    value,
    onChange,
    onKeyDown,
    error
}) {
    return (
        <div className="Input">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                className={error ? "error" : ""}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                spellCheck="false"
                autoComplete="off"
            />
        </div>
    )
}


export default Input
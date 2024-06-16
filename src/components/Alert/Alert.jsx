import "./Alert.scss"

function Alert ({
    alertType,
    alertMessage
}) {
    return (
        <div className={`Alert Alert--${alertType}`}>
            <div className="Alert__content">
                <div className="Alert__message">{alertMessage}</div>
            </div>
        </div>
    )
}


export default Alert
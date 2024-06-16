import "./AddWrapper.scss"

import { useRef } from "react"

function AddWrapper ({ children, addOpen, setAddOpen}) {

    const wrapperRef = useRef(null)

    const handleClickOutside = (e) => {
        if (e.target === wrapperRef.current) {
            setAddOpen(false)
        }
    }

    const handleClose = () => {
        setAddOpen(false)
    }

    return (
        <>
            {addOpen && (
                <div className="AddWrapper" onClick={handleClickOutside} ref={wrapperRef}>
                    <div className="AddWrapper-form">
                        <div className="AddWrapper-form-header">
                            <h4>Qo'shish</h4>
                            <button className="close-btn" onClick={handleClose}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <div className="AddWrapper-form-body">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default AddWrapper
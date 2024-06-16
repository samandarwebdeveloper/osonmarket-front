import "./EditWrapper.scss"

import { useRef } from "react"

function EditWrapper ({ children, editOpen, setEditOpen }) {
    
        const wrapperRef = useRef(null)
    
        const handleClickOutside = (e) => {
            if (e.target === wrapperRef.current) {
                setEditOpen(false)
            }
        }
    
        const handleClose = () => {
            setEditOpen(false)
        }
    
        return (
            <>
                {editOpen && (
                        <div className="EditWrapper" onClick={handleClickOutside} ref={wrapperRef}>
                        <div className="EditWrapper-form">
                            <div className="EditWrapper-form-header">
                                <h4>O'zgartirish</h4>
                                <button className="close-btn" onClick={handleClose}>
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>
                            <div className="EditWrapper-form-body">
                                {children}
                            </div>
                        </div>
                        </div>
                )}
            </>
        )
}


export default EditWrapper
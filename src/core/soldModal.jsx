import React from "react";
import './chekbox.scss'

function SoldModal({setSoldModal}) {

    const handleClose = () => {
        setSoldModal(false)
    }
    return (
        <div className="modalWrapper">
            <div className="p-3 bg-white modalBody">
                <header className="d-flex align-items-center justify-content-between mb-5">
                    <h5 className="m-0">Buyurtmangiz qabul qilindi!</h5>
                    <button className="btn close p-1" onClick={handleClose}><i className="fa-solid fa-times"></i></button>
                </header>
                <div className="text-center">
                    <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                    </div>
                    <p className="mb-2">Xaridingiz uchun raxmat!</p>
                    <span>Tez orada siz bilan bog'lanamiz</span>
                </div>
            </div>
        </div>
    )
}

export default SoldModal;
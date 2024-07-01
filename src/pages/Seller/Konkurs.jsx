import { memo, useState, useEffect } from "react"
import { isAuthenticated } from "../../auth";
import Gentra from '../../assets/image/gentra.jpg'
import { getSellerById } from "../../admin/apiAdmin";


function Konkurs() {
    const {user, token} = isAuthenticated()
    const [seller, setSeller] = useState({})

    useEffect(() => {
        getSellerById(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setSeller(data)
            }
        })
    }
    , [])

    return (
        <div className="Category">
            <div className="Category-header">
                <h2>{seller.balance} so'm</h2>
            </div>
            <div className="Category-body">
                <img src={Gentra} alt="Gentra" />
            </div>
            <h2 className="text-center">Shartlar tez orada e'lon qilinadi</h2>
        </div>
    )
}

export default memo(Konkurs)
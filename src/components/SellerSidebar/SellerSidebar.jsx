import { Link, NavLink } from "react-router-dom"
import { signout, isAuthenticated } from "../../auth"
import Logo from "../../assets/image/logo-white.png"

function SellerSidebar({history}) {

    const {user} = isAuthenticated()

  return (
    <div className="Sidebar">
        <div className="Sidebar-header">
            <Link to="/" className="Sidebar-header-logo-link">
                <img src={Logo} alt="Site logo" />
            </Link>
        </div>
        <div className="Sidebar-body">
            <ul className="Sidebar-list">
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/seller" exact>Asosiy</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/seller/ref" exact>Oqim</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/seller/stats">Statistika</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/seller/konkurs">Konkurs</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/seller/profit">Daromad</NavLink>
                </li>
            </ul>
        </div>
        <div className="Sidebar-footer">
            {isAuthenticated() && (
                <div>
                    <p className="text-light mb-1">{user.name}</p>
                    <p className="user-id mb-1">ID: {user._id}</p>
                    <p className="text-light mb-3">Tel: {user.phone}</p>
                    <button className='btn bg-primary text-light' onClick={() => signout(() => { history.push("/")}) }>
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Chiqish
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}


export default SellerSidebar
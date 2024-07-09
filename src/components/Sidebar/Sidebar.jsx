import "./Sidebar.scss"
import { Link, NavLink } from "react-router-dom"
import { signout, isAuthenticated } from "../../auth"
import Logo from "../../assets/image/logo-white.png"

function Sidebar({history}) {

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
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/admin" exact>Buyurtmalar</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/admin/products">Mahsulotlar</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/admin/category">Kategoriya</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/admin/sellers">Sotuvchilar</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/admin/markets">Do'konlar</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/admin/stats">Statistika</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/admin/profit">Sotuvchi daromadi</NavLink>
                </li>
            </ul>
        </div>
        <div className="Sidebar-footer">
            {isAuthenticated() && (
                <div>
                    <p className="text-light mb-0">{user.name}</p>
                    <p className="user-id">ID: {user._id}</p>
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


export default Sidebar
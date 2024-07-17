import React, {Fragment, useEffect, useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated} from '../../auth';
import Search from '../Search/Search';
import logo from '../../assets/image/logo.png'
import './Header.scss'


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#000', borderBottom: '2px solid #000'};
    } else {
        return {color: '#15509E', borderBottom: '2px solid transparent'};
    }
    
};



const Header = ({ history, basket }) => {
    const [basketProductsCount, setBasketProductsCount] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('card')) {
                setBasketProductsCount(basket.length)
            }
        }
    }, [basket])

    return (
        <div className='bg-white mb-2'> 
        <div className="main-color">
            <ul className="container nav mt-auto d-flex align-items-center p-2 pr-3 pl-3">
                    <li className='nav-item mr-auto'>
                        <a className='mr-2 phone-link' href='tel:+998970750757'>
                            <i className="fa-solid fa-phone pr-1"></i>
                            <span className='ml-1'>+998 (91) 511-80-89</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className='mr-3 icon-link' href='https://t.me/osonmarket_com'>
                            <i className="fa-brands fa-telegram"></i>
                        </a>
                        <a className='mr-3 icon-link' href='https://www.instagram.com/osonmarket_com'>
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a className='icon-link' href='https://www.youtube.com/@Osonmarket_com'>
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </li>
            </ul>
        </div>
        <ul className="nav container mt-auto d-flex align-items-center header-nav p-3">
            <li className="nav-item d-flex align-items-center mr-5 logo">
                <Link to="/"><img src={logo} alt='logo' width={'140'} className='logo-img' /></Link>
            </li>
            <li className='nav-item'>
                <button className='btn category-btn'>
                    <i className="fa-solid fa-bars"></i>
                    <span>Kategoriya</span>
                </button>
            </li>
            <li className="nav-item ml-3 mr-auto search-list">
                <Search />
            </li>
            <li className='nav-item d-flex align-items-center shop-icon-list'>
                <Link className="link-unstyled shop-link" to="/basket">
                    <i className="fa-solid fa-cart-shopping header-icon shop-icon">
                        <span className='basket-count'>{basketProductsCount}</span>
                    </i>
                    <span className='header-icon-text'>Savat</span>
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === undefined && (
                <li className="nav-item d-flex align-items-center">
                    <Link className="m-2 link-unstyled" style={isActive(history, '/seller')} to="/seller">
                    <i className="fa-solid fa-user"></i>
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item d-flex align-items-center">
                    <Link className="m-2 link-unstyled" style={isActive(history, '/admin')} to="/admin">
                    <i className="fa-solid fa-user"></i>
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item d-flex align-items-center">
                        <Link className="link-unstyled header-login-link" style={isActive(history, '/signin')} to="/signin"> 
                        <i className="fa-solid fa-user header-icon"></i>
                        <span className='header-icon-text'>Kirish</span>
                        </Link>
                    </li>
                </Fragment>
            )}

        </ul>
    </div>
)};

export default withRouter(Header)

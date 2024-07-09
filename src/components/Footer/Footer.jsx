import React from "react";
import './Footer.scss'
import logo from '../../assets/image/logo-white.png'
import { Link } from "react-router-dom";

function getYear() {
    return new Date().getFullYear();
}


const Footer = () => {
    return (
        <div className="main-color footer">
            <div className="container pt-5 pb-4"> 
            <div className="footer">
                <ul className="nav mt-auto d-flex align-items-start footer-nav justify-content-between">
                    <li className="nav-item d-flex align-items-center">
                        <Link to="/"><img src={logo} alt='logo' width={'140'} /></Link>
                    </li>
                    <li className="nav-item">
                        <h6 className="text-white footer-li-h">Ma'lumot</h6>
                        <Link className="footer-text-links" to="/ourus">Biz haqimizda</Link>
                        <Link className="footer-text-links" to="/delivery">To'lov va yetkazib berish</Link>
                    </li>
                    <li className="nav-item">
                        <h6 className="text-white footer-li-h">Tadbirkorlar uchun</h6>
                        <a className="footer-text-links" href="https://t.me/Islombek_Buriyev">Mahsulot sotish</a>
                    </li>
                    <li className="nav-item">
                        <h6 className="text-white footer-li-h">Osonmarketda pul ishlash</h6>
                        <Link to="/signup" className="sign-btn">
                            Ro'yxatdan o'tish
                        </Link>
                    </li>
                </ul>
                <ul className="right-nav">
                            <li className="phone-link-footer">
                                <a className='mr-2 phone-link' href='tel:+998970750757'>
                                    <i className="fa-solid fa-phone pr-1"></i>
                                    <span className='ml-1'>+998 (91) 511-80-89</span>
                                </a>
                            </li>
                            <li>
                                <a className='mr-3 icon-bottom' href='https://t.me/osonmarket_com'>
                                    <i className="fa-brands fa-telegram"></i>
                                </a>
                                <a className='mr-3 icon-bottom' href='https://www.instagram.com/osonmarket_com'>
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a className='icon-bottom' href='https://www.youtube.com/@Osonmarket_com'>
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            </li>
                </ul>
            </div>
                <div className="pt-4">
                    <p className="copyright-text">Osonmarket.com</p>
                    <p className="copyright-text">© {getYear()} barcha huquqlar himoyalangan</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;


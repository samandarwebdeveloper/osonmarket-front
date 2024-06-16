import "./Login.scss"

import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../../auth';
import Loading from '../../components/Loading/Loading';
import Logo from "../../assets/image/logo.png"
import Input from "../../components/Input/Input";


function Login() {
    const [values, setValues] = useState({
        phone: '', password: '', error: '', loading: false, redirectToReferrer: false
    });

    const { phone, password, error, loading, redirectToReferrer } = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        setValues({...values, error: false, loading: true});
        signin({ phone, password }).then(data => {
            // console.log({data});
            if (data.error) {
                // console.log('in error');
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                // console.log('in success');
                authenticate(data, () => {
                    setValues({
                        ...values, redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signInForm = () => (
        <div>
            <div className="Auth__header">
                <Link to="/" >
                    <img className="Auth__header-logo" src={Logo} alt="Site logo" />
                </Link>
            </div>
            <div className="Auth__body">
                    <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                        <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
                        </g>
                    </svg>
                    </div>
            </div>
            <div className="Auth__body-form">
                <div className="Auth__body-form-box">
                    <h2>Kirish</h2>
                    <Input type="text" error={error} onChange={handleChange('phone')}  placeholder="Phone" value={phone} />
                    <div className="password-wrap">
                        <input 
                            className={error ? "input input-error" : "input"} 
                            id="password-input" 
                            type="password" 
                            onChange={handleChange('password')} placeholder="Password" 
                            onKeyDown={(e) => e.key === "Enter" ? clickSubmit() : null}
                            value={password}
                        />
                        <button onClick={handlePasswordShow} className="hidePassword"><i id="password-icon" className="fa-solid fa-eye"></i></button>
                        {error && <p className="error">{error}</p>}
                    </div>
                    <button onClick={clickSubmit} className="Auth__body-form-box-btn">Kirish</button>
                    <p className='text-center text-dark mt-3'>
                        Hisob yo'qmi?
                        <Link to='/signup'> Ro'yxatdan o'ting </Link>
                    </p>
                </div>
            </div>
            <div>
            <svg className="waves2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(21,80,158,0.7" />
                <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(21,80,158,0.5)" />
                <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(21,80,158,0.3)" />
                <use xlinkHref="#gentle-wave" x={48} y={7} fill="#15509E" />
                </g>
            </svg>
            </div>
        </div>
    );
    

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    };
    const handlePasswordShow = () => {
        const icon = document.getElementById("password-icon");
        icon.className === "fa-solid fa-eye" ? icon.className = "fa-solid fa-eye-slash" : icon.className = "fa-solid fa-eye";
        const passwordInput = document.getElementById("password-input");
        passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    }

    return (
        <div className="Auth">
            {loading && <Loading />}
            { signInForm() }
            { redirectUser() }
        </div>
    );
}


export default Login;
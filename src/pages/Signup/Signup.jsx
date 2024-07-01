import React, { useState } from 'react';
import Logo from "../../assets/image/logo-white.png"
import { Link } from 'react-router-dom';
import { signup } from '../../auth';
import Loading from '../../components/Loading/Loading';
import Input from "../../components/Input/Input";
import './Signup.scss'

const Signup = () =>  {
    const [values, setValues] = useState({
        name: '', phone: '', password: '', error: '', success: false, loading: false
    });

    const { name, phone, password, success, error, loading } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handlePasswordShow = () => {
        const icon = document.getElementById("password-icon");
        icon.className === "fa-solid fa-eye" ? icon.className = "fa-solid fa-eye-slash" : icon.className = "fa-solid fa-eye";
        const passwordInput = document.getElementById("password-input");
        passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    }
    const clickSubmit = event => {
        let role = 'user'
        if (phone === '+998915118089') {
            role = 'admin'
        } else if (phone === '+998915175272') {
            role = 'user'
        }
        if (phone.split('').length !== 13) {
            return setValues({...values, error: 'Telefon raqamni tekshirib qaytadan kiriting!'})
        }
        if (phone.slice(0, 4) !== '+998') {
            return setValues({...values, error: `Faqat O'zbekiston raqamini kiriting!`})
        }
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signup({ name, phone, password, role }).then(data => {
            // console.log({data});
            if (data.error) {
                // console.log('in error');
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                // console.log('in success');
                setValues({
                    ...values, name: '', phone: '', password: '', error: '', success: true, loading: false
                });
            }
        });
    };

    const signUpForm = () => (
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
                    <h2>Ro'yxatdan o'tish</h2>
                    <Input type="text" error={error} onChange={handleChange('name')}  placeholder="Login" value={name} />
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
                    <button onClick={clickSubmit} className="Auth__body-form-box-btn">Ro'yxatdan o'tish</button>
                    <p className='text-center text-dark mt-3'>
                        Hisob bormi?
                        <Link to='/signin'> Kiring </Link>
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
    

    const showSuccess = () => (
        <div className="Alert Alert--success signup-alert" style={{ display: success ? '' : 'none' }}>
            Akkaunt yaratildi!<Link to="/signin"> Kirish </Link>
        </div>
    );
    
    return (
        <div className='Auth'>
            { success && showSuccess() }
            { error && <div className="Alert Alert--error" style={{ display: success ? '' : 'none' }}>{error}</div>}
            { loading && <Loading />}
            { signUpForm() }
        </div>
    );
};

export default Signup;
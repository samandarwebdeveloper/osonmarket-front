import React from 'react';
import Layout from '../core/Layout';
import { signout, isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';

const Dashboard = ({history}) => {

    const {user: {name, email}} = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card"> 
                <h4 className="card-header"> User Links </h4>
                <ul className="list-group">
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/cart"> My Shopping Cart </Link>
                    </li>
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/profile/update"> Update My Profile </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header"> User Information </h3>
                <ul className="list-group">
                    <li className="list-group-item"> {name} </li>
                    <li className="list-group-item"> {email} </li>
                    <li className="list-group-item">Registered User</li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header"> Purchase History </h3>
                <ul className="list-group">
                    <li className="list-group-item"> <button className='btn' onClick={() => signout(() => { history.push("/"); }) }>
                        <img className='mr-1' src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/000000/external-Log-Out-arrows-tanah-basah-basic-outline-tanah-basah-2.png" alt='img'/>
                        Chiqish
                    </button> </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout title="Dashboard" description={`Good day ${name}`} className="container-fluid">
            <div className="row"> 
                <div className="col-3"> 
                    {userLinks()}
                </div>
                <div className="col-3"> 
                    {userInfo()}
                </div>
                <div className="col-6"> 
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
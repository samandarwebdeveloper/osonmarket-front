import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Ourus from './pages/Ourus/Ourus';
import Delivery from './pages/Delivery/Delivery';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch> 
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/signin' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/ourus' exact component={Ourus} />
                <Route path='/delivery' exact component={Delivery} />
                <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                <AdminRoute path='/admin' component={AdminDashboard} />
                <AdminRoute path='/create/category' exact component={AddCategory} />
                <AdminRoute path='/create/product' exact component={AddProduct} />
                <Route path='/product/:productId' exact component={Product} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

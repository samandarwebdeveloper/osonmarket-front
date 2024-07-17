import React from 'react';
import { Route, Switch } from "react-router-dom"
import Sidebar from '../../components/Sidebar/Sidebar';
import Category from './Category';
import Products from './Products';
import Seller from './Seller';
import Markets from './Markets';
import Order from './Order';
import {withRouter} from 'react-router-dom';
import AdminProfit from './AdminProfit';
import Stats from './Stats';
import "./Admin.scss"


const AdminDashboard = ({history}) => {
    return (
        <div className='Admin'>
            <Sidebar history={history} />
            <div className='Content'>
            <Switch>
                <Route path="/admin" component={Order} exact/>
                <Route path="/admin/category" component={Category}/>
                <Route path="/admin/products" component={Products}/>
                <Route path="/admin/sellers" component={Seller}/>
                <Route path="/admin/markets" component={Markets}/>
                <Route path="/admin/profit" component={AdminProfit}/>
                <Route path="/admin/stats" component={Stats}/>
            </Switch>
            </div> 
        </div>
    );
};

export default withRouter(AdminDashboard);
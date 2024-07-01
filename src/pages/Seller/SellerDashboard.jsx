import './Seller.scss'
import React from 'react';
import { Route, Switch } from "react-router-dom"
import SellerSidebar from '../../components/SellerSidebar/SellerSidebar';
import Products from '../../pages/Admin/Products';
import {withRouter} from 'react-router-dom';
import SellerMain from './SellerMain';
import Konkurs from './Konkurs';
import Ref from './Ref';
import Profit from './Profit';


const SellerDashboard = ({history}) => {
    return (
        <div className='Admin'>
            <SellerSidebar history={history} />
            <div className='Content'>
            <Switch>
                <Route path="/seller" exact component={SellerMain}/>
                <Route path="/seller/products" component={Products}/>
                <Route path="/seller/konkurs" component={Konkurs}/>
                <Route path="/seller/ref" component={Ref}/>
                <Route path="/seller/profit" component={Profit}/>
            </Switch>
            </div> 
        </div>
    );
};

export default withRouter(SellerDashboard);
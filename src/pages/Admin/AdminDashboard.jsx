import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect } from "react-router-dom"
import Sidebar from '../../components/Sidebar/Sidebar';
import Category from './Category';
import Products from './Products';
import Seller from './Seller';
import {isAuthenticated} from '../../auth';
import {Link, withRouter} from 'react-router-dom';
import { deleteProduct } from '../../admin/apiAdmin';
import { getAllProducts } from '../../core/apiCore';
import "./Admin.scss"


const AdminDashboard = ({history}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts().then(data => {
            setProducts(data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const {user, token} = isAuthenticated()

    const handleDelete = async (id) => {
        await deleteProduct(user._id, token, id).then(data => {
            if(data) {
                setProducts(products.filter(product => product._id !== id))
            }
        })
        .catch(err => {
            console.log(err)
        })
    }


    const adminLinks = () => {
        return (
            <div className="card"> 
                <h4 className="card-header"> Admin Links </h4>
                <ul className="list-group">
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/create/category"> Yangi kategoriya yaratish </Link>
                    </li>
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/create/product"> Mahsulot qo'shish </Link>
                    </li>
                </ul>
            </div>
        );
    };

    function createMarkup(string) {
        return {__html: string};
    }

    return (
        <div className='Admin'>
            <Sidebar history={history} />
            <div className='Content'>
            <Switch>
                <Route path="/admin/category" component={Category}/>
                <Route path="/admin/products" component={Products}/>
                <Route path="/admin/sellers" component={Seller}/>
                {/* <Route path="/sub-category" component={SubCategory} /> */}
                {/* <Route path="/brand" component={Brand} /> */}
            </Switch>
            {/* {isAuthenticated() && (
            <li className="list-group-item">
                <button className='btn' onClick={() => signout(() => { history.push("/"); }) }>
                    <img className='mr-1' src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/000000/external-Log-Out-arrows-tanah-basah-basic-outline-tanah-basah-2.png" alt='img'/>
                    Chiqish
                </button>
            </li>
            )} */}
            {/* <div className="row"> 
                <div className="col-6"> 
                </div>
            </div>
            <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Rasmi</th>
                    <th>Nomi</th>
                    <th>Narxi</th>
                    <th>Ma'lumot</th>
                    <th>Kategoriya</th>
                    <th>Sana</th>
                    <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                {products && products.map((product, i) => (
                        <tr key={i}>
                            <td className='p-0'>
                                <img src={`${API}/product/photo/${product._id}`} alt="product" width={'150px'} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price} so'm</td>
                            <td><div dangerouslySetInnerHTML={createMarkup(product.description)} /></td>
                            <td>{product.category.name}</td>
                            <td>{product.createdAt.split('T')[0]}</td>
                            <td>
                                <button className='btn' onClick={() => handleDelete(product._id)}><img src="https://img.icons8.com/small/32/000000/trash--v1.png" alt='img'/></button>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </Table>
            </div>*/}

            </div> 
        </div>
    );
};

export default withRouter(AdminDashboard);
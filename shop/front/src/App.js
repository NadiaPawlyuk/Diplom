import React from "react";
import './index.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/home"
import {useEffect, useState} from "react";
import notification from "./grobalVariables/notificationArray";
import Settings from "./pages/settings";
import UserController from "./pages/userController";
import ProductController from "./pages/productController";
import WishList from "./pages/wishList";
import ShopRequestForm from "./pages/shopRequestForm";
import ShopRequestController from "./pages/shopRequestController";
import MyShop from "./pages/myShop";
import Basket from "./pages/basket";
import Order from "./pages/order";
import Comparison from "./pages/comparison";

function App() {

    const [notificationArray, setNotificationArray] = useState([])

    const [time, setTime] = useState(false)

    let interval = setInterval(() => {
        setTime(!time)
        clearInterval(interval)
    },250)

    useEffect(() => {
        setNotificationArray(notification.getNotification())
    }, [time])

    return (
        <div className="app">
            <Router>
                <div className={'notifications'}>
                    {notificationArray}
                </div>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/addUser' component={UserController}/>
                    <Route path='/productController' component={ProductController}/>
                    <Route path='/wishList' component={WishList}/>
                    <Route path='/shopRequestForm' component={ShopRequestForm}/>
                    <Route path='/shopRequestController' component={ShopRequestController}/>
                    <Route path='/myShop' component={MyShop}/>
                    <Route path='/basket' component={Basket}/>
                    <Route path='/orders' component={Order}/>
                    <Route path='/comparison' component={Comparison}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

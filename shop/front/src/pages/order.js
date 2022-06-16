import '../index.css'
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import * as BsIcons from "react-icons/bs";
import React from "react";
import axios from "axios";
import notification from "../grobalVariables/notificationArray";
import {useSelector} from "react-redux";
import OrderComponent from "../components/order";

function Order() {

    const [backToMain, setBackToMain] = useState(false)

    const [orders, setOrders] = useState([])

    const id = useSelector(state => state.login.stateUserId)

    const [update, setUpdate] = useState(false)

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    function changeUpdate() {
        setUpdate(!update)
    }

    async function getOrders() {
        await axios({
            method: "get",
            url: "http://localhost:3000/order/findAllUID/" + id,
        }).then(function (response) {
            const array = []
            if (response.data.length > 0) {
                response.data.forEach(data => {
                    array.push(<OrderComponent data={data} update={changeUpdate}/>)
                })
            }
            setOrders(array)
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        getOrders()
    }, [update])

    if (backToMain) {

        return <Redirect to={'/'}/>

    } else return (
        <div className={'wishList'}>

            <div className={'settingsHead'}>

                <div className={'settingsBack'} onClick={changeBackToMain}>
                    <BsIcons.BsCaretLeftFill/>Назад
                </div>

                <div className={'settingsText'}>
                    Замовлення
                </div>

            </div>

            <div className={'orderMainHandle'}>
                {orders}
            </div>

        </div>
    )
}

export default Order
import React from "react";
import '../index.css'
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import Product from "../components/product";
import notification from "../grobalVariables/notificationArray";
import ShopRequest from "../components/shopRequest";

function ShopRequestController() {

    const [backToMain, setBackToMain] = useState(false)

    const [requests, setRequests] = useState([])

    const [update, setUpdate] = useState(false)

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    async function getRequests() {
        await axios({
            method: "get",
            url: "http://localhost:3000/shopRequest/findAll",
        }).then(function (response) {
            let arr = []
            if (response.data.length > 0) {
                response.data.forEach(data => {
                    arr.push(<ShopRequest data={data} update={update} setUpdate={setUpdate}/>)
                })
                setRequests(arr)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        getRequests()
    }, [])

    useEffect(() => {
        getRequests()
    }, [update])

    if (backToMain) {

        return <Redirect to={'/'}/>

    } else return (
        <div className={'settings'}>

            <div className={'settingsHead'}>

                <div className={'settingsBack'} onClick={changeBackToMain}>
                    <BsIcons.BsCaretLeftFill/>Назад
                </div>

                <div className={'settingsText'} style={{marginRight: "41%"}}>
                    Керуваня запитами
                </div>

            </div>

            <div className={'shopRequestControllerBlock'}>
                {requests}
            </div>

        </div>
    )
}

export default ShopRequestController
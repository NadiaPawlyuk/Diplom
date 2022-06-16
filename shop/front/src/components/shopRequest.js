import React from "react";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import notification from "../grobalVariables/notificationArray";
import stringify from "qs-stringify";

function shopRequest({data, update, setUpdate}) {

    async function denyRequest() {
        await axios({
            method: "patch",
            url: "http://localhost:3000/shopRequest/disable/" + data.id
        }).then(function (response) {
            if (response.data !== '') {
                setUpdate(!update)
                notification.addNotification({type: 'success', name: 'Ви відхилили запит'})
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function acceptRequest() {
        await axios({
            method: "put",
            url: "http://localhost:3000/user/update/" + data.userId,
            data: stringify({
                shopName: data.shopName,
                isShop: true
            })
        }).then(function (response) {
            if (response.data !== '') {
                createCreditCart()
                denyRequest()
                setUpdate(!update)
                notification.addNotification({type: 'success', name: 'Ви прийняли запит'})
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function createCreditCart() {
        await axios({
            method: "post",
            url: "http://localhost:3000/creditCart/create",
            data: stringify({
                shopId: data.userId,
                publicKey: data.publicKey,
                privateKey: data.privateKey
            })
        }).then(function (response) {

        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    return (
        <div className='shopRequestItem'>
            <div className={'shopRequestItemUserName'}>
                {data.userName}
            </div>
            <div className={'shopRequestItemAboutShop'}>
                {data.aboutShop}
            </div>
            <div className={'shopRequestItemShopNameSubmit'}>
                {data.shopName}
                <div className={'shopRequestItemButton'}>
                    <div className={'shopRequestItemAccessButton'} onClick={acceptRequest}><BsIcons.BsCheckLg/></div>
                    <div className={'shopRequestItemDenyButton'} onClick={denyRequest}><BsIcons.BsXLg/></div>
                </div>
            </div>
        </div>
    )
}

export default shopRequest
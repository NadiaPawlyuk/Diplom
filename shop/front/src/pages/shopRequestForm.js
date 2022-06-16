import React from "react";
import '../index.css'
import {Redirect} from "react-router-dom";
import {useState} from "react";
import * as BsIcons from "react-icons/bs";
import {useSelector} from "react-redux";
import axios from "axios";
import stringify from "qs-stringify";
import notification from "../grobalVariables/notificationArray";

function ShopRequestForm() {

    const id = useSelector(state => state.login.stateUserId)

    const [backToMain, setBackToMain] = useState(false)

    const [shopName, setShopName] = useState('')

    const [aboutShop, setAboutShop] = useState('')

    const [publicKey, setPublicKey] = useState('')

    const [privateKey, setPrivateKey] = useState('')

    const firstNameState = useSelector(state => state.login.stateFirstName)

    const secondNameState = useSelector(state => state.login.stateSecondName)

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    function changeShopName(event){
        setShopName(event.target.value)
    }

    function changePublicKey(event){
        setPublicKey(event.target.value)
    }

    function changePrivateKey(event){
        setPrivateKey(event.target.value)
    }

    function changeAboutShop(event){
        setAboutShop(event.target.value)
    }

    async function createRequest() {
        if(aboutShop.length < 1){
            notification.addNotification({type: 'warning', name: 'Напишіть щось про себе'})
        } else if(shopName.length < 1){
            notification.addNotification({type: 'warning', name: 'Ви не вибрали імя магазину'})
        } else if(privateKey.length < 1){
            notification.addNotification({type: 'warning', name: 'Ви не написали ваш приватний ключ LiqPay'})
        } else if(publicKey.length < 1){
            notification.addNotification({type: 'warning', name: 'Ви не написали ваш публічний ключ LiqPay'})
        } else {
            let userName = firstNameState + " " + secondNameState
            await axios({
                method: "post",
                url: "http://localhost:3000/shopRequest/create",
                data: stringify({
                    aboutShop: aboutShop,
                    shopName: shopName,
                    userId: id,
                    userName: userName,
                    publicKey: publicKey,
                    privateKey: privateKey
                })
            }).then(function (response) {
                if (response.data !== '') {
                    setShopName('')
                    setAboutShop('')
                    setPrivateKey('')
                    setPublicKey('')
                    notification.addNotification({type: 'success', name: 'Ви відправили запит'})
                }
            }).catch(function (error) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    if (backToMain) {

        return <Redirect to={'/'}/>

    } else return (
        <div className={'settings'}>

            <div className={'settingsHead'}>

                <div className={'settingsBack'} onClick={changeBackToMain}>
                    <BsIcons.BsCaretLeftFill/>Назад
                </div>

                <div className={'settingsText'}>
                    Стати магазином
                </div>

            </div>

            <div className={'shopRequestFormBlock'}>

                <textarea value={aboutShop} onChange={changeAboutShop} placeholder={'Напишіть настільки багато інформація наскільки можете'} rows={25} cols={90} className={'shopRequestTextArea'}/>

                <div className='shopRequestCreditCart'>
                    <input type="text" value={publicKey} onChange={changePublicKey} placeholder='Публічний ключ LiqPay' className={publicKey.length > 2 ? 'green' : 'red'}/>
                </div>

                <div className='shopRequestCreditCart'>
                    <input type="text" value={privateKey} onChange={changePrivateKey} placeholder='Приватний ключ  LiqPay' className={privateKey.length > 2 ? 'green' : 'red'}/>
                </div>

                <div className={'shopRequestSubmit'}>
                    <div className='shopRequestShopName'>
                        <input type="text" value={shopName} onChange={changeShopName} placeholder='Shop Name' className={shopName.length > 2 ? 'green' : 'red'}/>
                    </div>
                    <div className={'shopRequestSubmitButton'} onClick={createRequest}>
                        Відправити запит
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ShopRequestForm
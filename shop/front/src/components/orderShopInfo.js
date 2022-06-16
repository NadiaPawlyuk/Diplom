import '../index.css'
import React, {useEffect, useState} from "react";
import OrderProduct from "./orderProduct";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import notification from "../grobalVariables/notificationArray";
import {LiqPayPay} from "react-liqpay";

function OrderComponent({data, update}) {

    const [products, setProducts] = useState([])

    const [status, setStatus] = useState('')

    const [payStatus, setPayStatus] = useState('Зачекайте хвилинку')

    const [deliveryStatus, setDeliveryStatus] = useState('')

    const [sendType, setSendType] = useState('')

    const [payType, setPayType] = useState('')

    const [post, setPost] = useState('')

    let pr = ''

    let pb = ''

    async function getCreditCart() {
        await axios({
            method: "get",
            url: "http://localhost:3000/creditCart/findAll/" + data.shopID,
        }).then(function (response) {
            if (response.data.length > 0) {
                pr = response.data[0].publicKey
                pb = response.data[0].privateKey
                console.log(pr, pb)
            } else {
                pr = 'notFound'
                pb = 'notFound'
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function checkPay() {
        await axios({
            method: "get",
            url: 'http://localhost:3000/order/checkPay/' + data.liqPayId + '/' + pr +'/' + pb
        }).then(function (response) {
            if (response.data.length > 0) {
                if(response.data === 'success'){
                    setPayStatus('Сплачено')
                    payStatusPayed()
                } else setPayStatus('Не сплачено')
            } else {
                pr = 'notFound'
                pb = 'notFound'
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function payStatusPayed() {
        let r = 'pay'
        await axios({
            method: "patch",
            url: "http://localhost:3000/order/changePS/" + data.id + '/' + String(r),
        }).then(function (response) {
            console.log(response)
            if (response.data) {
                setPayStatus('Payed')
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(async () => {
        const array = JSON.parse(data.products)
        const res = []
        array.forEach(data => {
            res.push(<OrderProduct data={data}/>)
        })
        setProducts(res)
        if(data.payStatus === 'check' && data.status !== 'deny'){
            await getCreditCart()
            checkPay()
        }
        if (data.payStatus === 'pay') {
            setPayStatus('Сплачено')
        }
        if (data.status === 'waiting') {
            setStatus('Очікує підтвердження')
        }
        if (data.status === 'deny') {
            setStatus('Відхилено')
        }
        if (data.status === 'accept') {
            setStatus('Підтверджено')
        }
        if (data.status === 'finished') {
            setStatus('Завершено')
        }
        if (data.status === 'deny') {
            setPayStatus('Уже немає значення')
        }
        if (data.deliveryStatus === 'waiting for the sender in the mail') {
            setDeliveryStatus('Очікує відправника на пошті')
        }
        if (data.deliveryStatus === 'onWay') {
            setDeliveryStatus('В дорозі')
        }
        if (data.deliveryStatus === 'taken') {
            setDeliveryStatus('Забрано')
        }
        if(data.payType === 'Postpaid'){
            setPayType('Післяплата')
        }
        if(data.payType === 'Pay now'){
            setPayType('Сплатити зараз')
        }
        if(data.post === 'Ukr poshta'){
            setPost('Укр пошта')
        }
        if(data.post === 'Nova poshta'){
            setPost('Нова пошта')
        }
        if(data.post === 'Meest express'){
            setPost('Міст експресс')
        }
        if(data.deliveryType === 'Self-pick'){
            setSendType('Самовивіз')
        }
        if(data.deliveryType === 'Delivery by courier'){
            setSendType('Доставка курєром')
        }
    }, [])

    return (
        <div className={'orderHandle'}>

            <div className={'orderInfoShop'}>

                <div className={'orderInfoText'}>
                    Імя Прізвище: {data.firstName} {data.secondName}
                </div>
                <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                    Номер телефону: {data.phoneNumber}
                </div>
                <div className={'shopRequestItemDenyButton'}></div>
            </div>

            <div className={'orderInfoShop3'}>
                <div className={'orderInfoText'}>
                    Адреса: {data.address}
                </div>
                <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                    Статус доставки: {deliveryStatus}
                </div>
                <div className={'shopRequestItemDenyButton'}></div>
            </div>

            <div className={'orderInfoShop2'}>
                <div className={'orderInfoText'}>
                    Тип доставки: {sendType}
                </div>
                <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                    Пошта: {post}
                </div>
                <div className={'shopRequestItemDenyButton'}></div>
            </div>

            <div className={'orderInfoShop2'}>
                <div className={'orderInfoText'}>
                    Статус: {status}
                </div>
                <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                    Тип оплати: {payType}
                </div>
                <div className={'shopRequestItemDenyButton'}></div>
            </div>

            <div className={'orderInfoShop2'}>
                <div className={'orderInfoText'}>
                    Ціна: {data.toPay}
                </div>
                <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                    Статус оплати: {payStatus}
                </div>
                <div className={'shopRequestItemDenyButton'}></div>
            </div>

            <div className={'orderProductsShop'}>
                {products}
            </div>

        </div>
    )
}

export default OrderComponent
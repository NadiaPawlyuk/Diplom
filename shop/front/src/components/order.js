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

    const [sendType, setSendType] = useState('')

    const [payType, setPayType] = useState('')

    const [post, setPost] = useState('')

    const [deliveryStatus, setDeliveryStatus] = useState('')

    const [showDetails, setShowDetails] = useState(false)

    let pr = ''

    let pb = ''

    function changeDetails() {
        setShowDetails(!showDetails)
    }

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
            url: 'http://localhost:3000/order/checkPay/' + data.liqPayId + '/' + pr + '/' + pb
        }).then(function (response) {
            if (response.data.length > 0) {
                if (response.data === 'success') {
                    setPayStatus('Payed')
                    payStatusPayed()
                } else if (data.status !== 'finished' && data.deliveryStatus !== 'onWay' && data.deliveryStatus !== 'taken') {
                    setPayStatus(
                        <LiqPayPay
                            publicKey={pr}
                            privateKey={pb}
                            amount={data.toPay}
                            description="Payment for product"
                            currency="UAH"
                            orderId={data.liqPayId}
                            result_url="http://localhost:3005/orders"
                            server_url="http://localhost:3005/orders"
                            product_description="Cosmetic"
                            style={{marginLeft: '1%', marginTop: '10px'}}
                        />
                    )
                } else {
                    payStatusPayed()
                    setPayStatus('Payed')
                }
            } else {
                pr = 'notFound'
                pb = 'notFound'
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    function beforeDeny(e) {
        e.stopPropagation()
        denyOrder()
    }

    async function denyOrder() {
        let r = 'deny'
        await axios({
            method: "patch",
            url: "http://localhost:3000/order/change/" + data.id + '/' + String(r),
        }).then(function (response) {
            console.log(response)
            if (response.data) {
                notification.addNotification({type: 'success', name: 'Ви відмінили замовлення'})
                setStatus('Denied')
                setPayStatus('Doesn\'t matter')
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function finishOrder() {
        let r = 'finished'
        await axios({
            method: "patch",
            url: "http://localhost:3000/order/change/" + data.id + '/' + String(r),
        }).then(function (response) {
            console.log(response)
            if (response.data) {
                setStatus('Finished')
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    function beforeDelivery(e) {
        e.stopPropagation()
        deliveryStatusTaken()
    }

    async function deliveryStatusTaken() {
        let r = 'taken'
        await axios({
            method: "patch",
            url: "http://localhost:3000/order/changeDS/" + data.id + '/' + String(r),
        }).then(function (response) {
            console.log(response)
            if (response.data) {
                setDeliveryStatus('Taken')
                finishOrder()
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
        if (data.payStatus === 'check' && data.status !== 'deny') {
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
        if (data.payType === 'Postpaid') {
            setPayType('Післяплата')
        }
        if (data.payType === 'Pay now') {
            setPayType('Сплатити зараз')
        }
        if (data.post === 'Ukr poshta') {
            setPost('Укр пошта')
        }
        if (data.post === 'Nova poshta') {
            setPost('Нова пошта')
        }
        if (data.post === 'Meest express') {
            setPost('Міст експресс')
        }
        if (data.deliveryType === 'Self-pick') {
            setSendType('Самовивіз')
        }
        if (data.deliveryType === 'Delivery by courier') {
            setSendType('Доставка курєром')
        }
    }, [])

    return (
        <div className={'orderHandle'}>

            <div className={'orderInfoDropDown'} onClick={changeDetails}>
                Замовлення# {data.id}
            </div>

            {showDetails ?
                <>
                    <div className={'orderInfo'}>

                        <div className={'orderInfoText'}>
                            Імя Прізвище: {data.firstName} {data.secondName}
                        </div>
                        <div className={'orderInfoText'}>
                            Номер телефону: {data.phoneNumber}
                        </div>
                        {data.status === 'waiting' ?
                            <div className={'shopRequestItemDenyButton'} onClick={beforeDeny}><BsIcons.BsXLg/>
                            </div> : data.deliveryStatus === 'onWay' ?
                                <div className={'shopRequestItemDenyButton'} onClick={beforeDelivery}>
                                    <BsIcons.BsCheckLg/></div> : <></>}
                    </div>

                    <div className={'orderInfo3'}>
                        <div className={'orderInfoText'}>
                            Адреса: {data.address}
                        </div>
                        <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                            Статус доставки: {deliveryStatus}
                        </div>
                        <div className={'shopRequestItemDenyButton'}></div>
                    </div>

                    <div className={'orderInfo3'}>
                        <div className={'orderInfoText'}>
                            Тип доставки: {sendType}
                        </div>
                        <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                            Пошта: {post}
                        </div>
                        <div className={'shopRequestItemDenyButton'}></div>
                    </div>

                    <div className={'orderInfo2'}>
                        <div className={'orderInfoText'}>
                            Статус: {status}
                        </div>
                        <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                            Тип оплати: {payType}
                        </div>
                        <div className={'shopRequestItemDenyButton'}></div>
                    </div>

                    <div className={'orderInfo2'} style={{height: '100px'}}>
                        <div className={'orderInfoText'}>
                            Ціна: {data.toPay}
                        </div>
                        <div className={'orderInfoText'} style={{marginRight: '20px'}}>
                            Статус оплати: {payStatus}
                        </div>
                        <div className={'shopRequestItemDenyButton'}></div>
                    </div>

                    <div className={'orderProducts'}>
                        {products}
                    </div>
                </>
                :
                <></>
            }

        </div>
    )
}

export default OrderComponent
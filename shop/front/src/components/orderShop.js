import '../index.css'
import React, {useEffect, useState} from "react";
import * as BsIcons from "react-icons/bs";
import OrderShopInfo from "./orderShopInfo";
import axios from "axios";
import notification from "../grobalVariables/notificationArray";
import stringify from "qs-stringify";

function OrderShop({data, update}) {

    const [showInfo, setShowInfo] = useState(false)

    function changeShowInfo() {
        setShowInfo(!showInfo)
    }

    const [showMe, setShowMe] = useState(true)

    const [showButtons, setShowButtons] = useState(true)

    const [waiting, setWaiting] = useState(true)

    const [onWay, setOnWay] = useState(true)

    async function denyOrder() {
        let r = 'deny'
        await axios({
            method: "patch",
            url: "http://localhost:3000/order/change/" + data.id + '/' + String(r),
        }).then(function (response) {
            console.log(response)
            if (response.data) {
                setShowInfo(false)
                setShowMe(false)
                notification.addNotification({type: 'success', name: 'Ви відхилили замовлення'})
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    const countsArrayDB = []
    const countArrayOS = []
    const idArray = []
    const boughtArray = []

    async function acceptOrder() {

        let checker = true
        console.log(countsArrayDB)
        console.log(countArrayOS)
        let counter = 0
        const resArray = []
        countArrayOS.forEach((number) => {
            if (Number(number) <= Number(countsArrayDB[counter])) {
                resArray.push({
                    id: idArray[counter],
                    number: Number(countsArrayDB[counter]) - Number(number),
                    buyed: Number(boughtArray[counter]) + 1
                })
            } else checker = false
            counter++
        })
        console.log(resArray)
        if (checker) {

            resArray.forEach((data) => {
                updateProduct(data)
            })

            let r = 'accept'
            await axios({
                method: "patch",
                url: "http://localhost:3000/order/change/" + data.id + '/' + String(r),
            }).then(function (response) {
                console.log(response)
                if (response.data) {
                    setShowInfo(false)
                    data.status = 'accept'
                    notification.addNotification({type: 'success', name: 'Ви прийняли замовлення'})
                }
            }).catch(function (error) {
                console.log(error)
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        } else denyOrder()
    }

    async function updateProduct(pr) {

        await axios({
            method: "put",
            url: "http://localhost:3000/product/update/" + pr.id,
            data: stringify({
                number: pr.number,
                buyed: pr.buyed
            })
        }).then(function (response) {

        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }


async function getProduct(prId) {
    await axios({
        method: "get",
        url: "http://localhost:3000/product/get/" + prId,
    }).then(function (response) {
        console.log(response)
        if (response.data) {
            countsArrayDB.push(response.data[0].number)
            boughtArray.push(response.data[0].buyed)
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
            setShowInfo(false)
            data.status = 'accept'
        }
    }).catch(function (error) {
        console.log(error)
        notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
    });
}

async function deliveryStatusTaken() {
    let r = 'taken'
    await axios({
        method: "patch",
        url: "http://localhost:3000/order/changeDS/" + data.id + '/' + String(r),
    }).then(function (response) {
        console.log(response)
        if (response.data) {
            setShowInfo(false)
            data.deliveryStatus = 'taken'
            setOnWay(false)
            setShowMe(false)
            finishOrder()
        }
    }).catch(function (error) {
        console.log(error)
        notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
    });
}

async function deliveryStatusOnWay() {
    let r = 'onWay'
    await axios({
        method: "patch",
        url: "http://localhost:3000/order/changeDS/" + data.id + '/' + String(r),
    }).then(function (response) {
        console.log(response)
        if (response.data) {
            setShowInfo(false)
            data.deliveryStatus = 'onWay'
            setWaiting(false)
        }
    }).catch(function (error) {
        console.log(error)
        notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
    });
}


useEffect(() => {
    if (data.status === 'accept') {
        setShowButtons(false)
    }
}, [showInfo])

useEffect(() => {
    let newData = JSON.parse(data.products)
    newData.forEach(async (data) => {
        countArrayOS.push(String(data.count))
        idArray.push(data.id)
        await getProduct(data.id)
    })
}, [])

return (
    <>{showMe ?
        <>
            <div className={'ordersShop'} onClick={changeShowInfo}>

                <div className={'orderShopInfo'}>
                    Замовлення# {data.id}
                </div>

                {showButtons ?
                    <div className={'orderShopButtons'}>
                        <div className={'orderShopButtonGood'} onClick={acceptOrder}>
                            <BsIcons.BsCheckLg/>
                        </div>
                        <div className={'orderShopButtonBad'} onClick={denyOrder}>
                            <BsIcons.BsXLg/>
                        </div>
                    </div>
                    :
                    data.deliveryStatus === 'waiting for the sender in the mail' ?
                        <div className={'orderShopButtons'}>
                            <div className={'orderShopDeliveryChange'} onClick={deliveryStatusOnWay}>
                                В дорозі
                            </div>
                        </div>
                        :
                        data.deliveryStatus === 'onWay' ?
                            <div className={'orderShopButtons'}>
                                <div className={'orderShopDeliveryChange'} onClick={deliveryStatusTaken}>
                                    Забрано
                                </div>
                            </div>
                            :
                            <></>
                }

            </div>
            {showInfo
                ?
                <div className={'myShopOrderInfo'}>
                    <OrderShopInfo data={data}/>
                    {showButtons ? <div className={'orderShopButtons'}>
                            <div className={'orderShopButtonGood'} onClick={acceptOrder}>
                                <BsIcons.BsCheckLg/>
                            </div>
                            <div className={'orderShopButtonBad'} onClick={denyOrder}>
                                <BsIcons.BsXLg/>
                            </div>
                        </div>
                        :
                        waiting ?
                            <div className={'orderShopButtons'}>
                                <div className={'orderShopDeliveryChange'} onClick={deliveryStatusOnWay}>
                                    В дорозі
                                </div>
                            </div>
                            :
                            onWay ?
                                <div className={'orderShopButtons'}>
                                    <div className={'orderShopDeliveryChange'} onClick={deliveryStatusTaken}>
                                        Забрано
                                    </div>
                                </div>
                                :
                                <></>
                    }
                    <div className={'orderShopInfoBack'} onClick={changeShowInfo}>
                        <BsIcons.BsXLg/>
                    </div>
                </div>
                :
                <></>
            }
        </>
        :
        <></>
    }
    </>
)
}

export default OrderShop
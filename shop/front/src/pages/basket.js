import React from "react";
import '../index.css'
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import Product from "../components/product";
import notification from "../grobalVariables/notificationArray";
import {useDispatch, useSelector} from "react-redux";
import {LiqPayPay} from "react-liqpay";
import {setBuy} from "../redux/actions";
import stringify from "qs-stringify";

function Basket() {

    const dispatch = useDispatch();

    const id = useSelector(state => state.login.stateUserId)

    const firstNameState = useSelector(state => state.login.stateFirstName)

    const buyINFO = useSelector(state => state.buy.stateBuy)

    const secondNameState = useSelector(state => state.login.stateSecondName)

    const phoneNumberState = useSelector(state => state.login.statePhoneNumber)

    const [backToMain, setBackToMain] = useState(false)

    const [products, setProducts] = useState(<></>)

    const [update, setUpdate] = useState(false)

    const [price, setPrice] = useState(0)

    const [basketData, setBasketData] = useState([])

    const [showOrder, setShowOrder] = useState(false)

    const [address, setAddress] = useState('')

    const [firstName, setFirstName] = useState(firstNameState)

    const [secondName, setSecondName] = useState(secondNameState)

    const [phoneNumber, setPhoneNumber] = useState(phoneNumberState)

    const [post, setPost] = useState('')

    const [deliveryType, setDeliveryType] = useState('Self-pick')

    const [payType, setPayType] = useState('Postpaid')

    const [payment, setPayment] = useState([])

    const [showingForm, setShowingForm] = useState('asd')

    const [showForm, setShowForm] = useState(false)

    const [count, setCount] = useState(false)

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    function changeUpdateCount(asd) {
        setCount(asd)
    }

    function changeAddress(event) {
        setAddress(event.target.value)
    }

    function changeDeliveryType(event) {
        setDeliveryType(event.target.value)
    }

    function changePaidType(event) {
        setPayType(event.target.value)
    }

    function changeFirstName(event) {
        setFirstName(event.target.value)
    }

    function changeSecondName(event) {
        setSecondName(event.target.value)
    }

    function changePhoneNumber(event) {
        setPhoneNumber(event.target.value)
    }

    function changeUpdate() {
        setUpdate(!update)
    }

    function buy() {
        setShowOrder(!showOrder)
    }

    async function getProducts() {
        await axios({
            method: "get",
            url: "http://localhost:3000/basket/findAll/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                let temPrice = 0
                const productss = []
                const dataBs = []
                response.data.forEach(data => {
                    dataBs.push(data)
                    productss.push(<Product product={JSON.parse(data.product)} bs={true} update={changeUpdate}
                                            count={data.count} updateCount={changeUpdateCount}/>)
                    let pr = JSON.parse(data.product)
                    temPrice = temPrice + Number(pr.price) * data.count
                })
                setBasketData(dataBs)
                setPrice(temPrice)
                setProducts([])
                setProducts(productss)
            } else {
                setProducts(<></>)
                setPrice(0)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function getPrice() {
        await axios({
            method: "get",
            url: "http://localhost:3000/basket/findAll/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                let temPrice = 0
                const dataBs = []
                response.data.forEach(data => {
                    dataBs.push(data)
                    let pr = JSON.parse(data.product)
                    temPrice = temPrice + Number(pr.price) * data.count
                })
                setBasketData(dataBs)
                setPrice(temPrice)
            } else setProducts(<></>)
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function makeOrder() {
        dispatch(setBuy({buyForms: []}))
        if (firstName.length < 1) {
            notification.addNotification({type: 'warning', name: 'Напишіть ваше імя'})
        } else if (secondName.length < 1) {
            notification.addNotification({type: 'warning', name: 'Напишіть ваше прізвище'})
        } else if (phoneNumber.length < 1) {
            notification.addNotification({type: 'warning', name: 'Напишіть ваш мобільний номер'})
        } else if (address.length < 1) {
            notification.addNotification({type: 'warning', name: 'Напишіть вашу адресу'})
        } else if (post.length < 1) {
            notification.addNotification({type: 'warning', name: 'Виберіть пошту'})
        } else {
            const array = []
            basketData.forEach((data) => {
                let prod = JSON.parse(data.product)
                array.push(prod.shopID)
            })
            const uniqueArray = array.filter(onlyUnique)
            const res = []
            uniqueArray.forEach((prId) => {
                let pub = ''
                let priv = ''
                getCreditCart(prId, pub, priv)
                const thisID = []
                let toPay = 0
                basketData.forEach((data) => {
                    console.log(data)
                    removeFromBasket(data.productId)
                    let prod = JSON.parse(data.product)
                    if (prId === prod.shopID) {
                        toPay = toPay + data.count * Number(prod.price)
                        thisID.push({
                            id: data.productId,
                            count: data.count,
                            productName: prod.name,
                            productImage: prod.images
                        })
                    }
                })
                const rand = Math.floor(1 + Math.random() * 900000000)
                const resObj = {
                    userId: id,
                    shopID: prId,
                    address: address,
                    firstName: firstName,
                    secondName: secondName,
                    phoneNumber: phoneNumber,
                    deliveryType: deliveryType,
                    payType: payType,
                    toPay: toPay,
                    liqPayId: rand,
                    post: post,
                    products: JSON.stringify(thisID)
                }
                res.push(resObj)
                if (payType === "Pay now") {
                    payNow(toPay, prId, rand)
                }
            })
            res.forEach(async (data) => {
                await createOrder(data)
            })
        }
    }

    async function createOrder(data) {

        console.log(data)

        await axios({
            method: "post",
            url: "http://localhost:3000/order/create",
            data: data
        }).then(function (response) {
                setShowOrder(false)
                getProducts()
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });

    }

    async function removeFromBasket(prId) {

        await axios({
            method: "patch",
            url: "http://localhost:3000/basket/disable/" + prId + "&" + id
        }).then(function (response) {

        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    let pr = ''

    let pb = ''

    async function payNow(toPay, prId, rand) {
        let payInf = payment
        await getCreditCart(prId)
        console.log(pr, pb)
        payInf.push(
            <LiqPayPay
                publicKey={pr}
                privateKey={pb}
                amount={String(toPay)}
                description="Payment for product"
                currency="UAH"
                orderId={rand}
                result_url="http://localhost:3005/basket"
                server_url="http://localhost:3005/basket"
                product_description="Cosmetic"
                style={{margin: "8px"}}
            />
        )
        dispatch(setBuy({buyForms: payInf}))
    }

    async function getCreditCart(prId) {
        await axios({
            method: "get",
            url: "http://localhost:3000/creditCart/findAll/" + prId,
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

    useEffect(() => {
        getProducts()
    }, [update])

    useEffect(() => {
        getPrice()
    }, [count])

    useEffect(() => {
        if (buyINFO.length > 0) {
            let r = buyINFO
            console.log(r)
            let a = r.pop()
            let props = a.props
            console.log(props)
            setShowOrder(false)
            if (props.publicKey !== '') {
                dispatch(setBuy({buyForms: r}))
                setShowForm(true)
                setShowingForm(
                    <LiqPayPay
                        publicKey={props.publicKey}
                        privateKey={props.privateKey}
                        amount={props.amount}
                        description="Payment for product"
                        currency="UAH"
                        orderId={props.orderId}
                        result_url="http://localhost:3005/basket"
                        server_url="http://localhost:3005/basket"
                        product_description="Cosmetic"
                        style={{
                            backgroundColor: '#337ab7',
                            color: '#fff',
                            borderColor: '#2e6da4',
                            border: '1px solid transparent',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            width: '12%',
                            height: '5%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}
                    />
                )
            }
        }
    }, [buyINFO])

    if (backToMain) {

        return <Redirect to={'/'}/>

    } else return (
        <div className={'wishList'}>

            <div className={'settingsHead'}>

                <div className={'settingsBack'} onClick={changeBackToMain}>
                    <BsIcons.BsCaretLeftFill/>Назад
                </div>

                <div className={'settingsText'}>
                    Корзина
                </div>

            </div>

            <div className={'basketHandle'}>
                {products}
                <div className={'basketBuy'}>
                    <div className={'basketBuyButton'} onClick={buy}>
                        Зробити замовлення {price} ₴
                    </div>
                </div>
            </div>

            {showForm ?
                <div className={'hideAll'}>
                    {showingForm}
                </div>
                : <></>}

            {
                showOrder ?
                    <div className={'detailsBackgroundHandle'}>
                        <div className={'detailsBlockBS'}>

                            <div className={'detailsOrder'}>
                                <div className={'makeOrder'}>
                                    Зробити замовлення
                                </div>
                                <div className={'postChoose'}>
                                    <div className={post === 'Nova poshta' ? 'post choosenPost' : 'post'}
                                         onClick={() => setPost('Nova poshta')}>
                                        <img
                                            src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAkFBMVEX////aKRzYAADZGQDYEQDZHQvkfnraJxnaJRbZIhLutrTvubjcRT333t3olZLfXFf56Ofro6Dxw8LZKyD45OP9+Pjzy8rdTUb88/PusrDicWz77u711tXlhID00dDbNSvjd3PhamXmi4feUUrfV1HtrKrqnZrbOzLgY17cQjrxwL/lg3/nkY3sp6XbOC/ke3dzrNKDAAAJeUlEQVR4nO2c6ULiOhSAS5oMLVgUlE1cEBWQgfH93+7SnJOlbboXHe+c789IuuZrs52k43kEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAE8T/gaXw8Rd99E38VT8/M9zl7vfnuG/l7GLKgFxOyh+++lb+FAeshfZICGCUkBbGVkBRJUglJ8bJKSIpDyaWkrKLoZ7T0LiU1pExvr5CtSXzfxQkfV9Z+i9Mbk+w29pnHu6sEb4+T9BWuP2DTx2OzDNbHrSSW8lTp+CkLEGbueczjhLCnExafjIdw4sBnV+bUIx4kCAXrzRIXiMwFpi3zWpFljpLKUqbmBEwnnnx5hlv1+8CEfeqQ/VJbRr7jwgf7Ao/6UP7eQYbLyVdSVYrtRD/HlJMx66fOzV9xk8PJ+cIL6wJcHxt8dJXtIoqUVJRSwYmrePrXsA2d9AG10aqaBtwcxL5ghHpiiuTT4jo9U+FlKHdyZ/YIQv3QOeQbnPSfJX18n8JXc/55aO5L/PIuzt0Nskq8wny5UhvuSs8xNUZznLxhrvqcz996TOWRreKNcGGOTVF0K6X0TeWMQn2oVHin2S9hnHBS/nYkmfECJ0/4moS3suqM9lgYxO/4JzjRhXTIU042Ugaf4b+DVrmsxwWdrOERh3O1ccvwtYl/pJw8yTOFb/rUUMMyNBvYPZ5L087JhONxM+AJ2k9wArnqC9O5uMeCEPdD0Inqxv2G10E3uvDeiLXnCZDzhXHATpz0uAIyLZ2oCuFkdl9h0shTTvztIWbwAq+J7tdgXcRmqhCJTRe5rUY3TlJIJ7gNalQEciruPd0W++BSpvf7elAEQvv++c8HZgrc13A5J9i/YPb+ULRkreHos3HTKzrKrUIOGqBJ4sO2Wc1hlkkpc5I9wqbIydLhBMqB7IW4+rFMlzMfKhEpCfa0uy5dsszW3mVOinu0RU4O6TbpzIssI+GLp52EQoJ9Fza0z5vs+rHyLlMDluw6k1bmhBdKUU4wZ0IExgnUA8lzwuOX9SU+/fVGsoeOrKo1rsHd/jA8M4GT+peoZZcsbOCkcOyDTsJ7xWugnWDf3+5ZjLHpjjtgqbY4wk3L+MeN6u1BBYwvn2iR9xzOw74mTgoHhJN0nfFu9dleoUBwHV1RHVvZFKX6bN4nNLlrz3PXNecTJSIJXRCPhBs5OUvJrWgnRf3Ypeq87KE5HqunLzuraSfQaYM7DNMRBuu4DpHBgWZOCqQUOsHaI44kvW42L76qj+FsqbIzDeTOsvqd5QQyWLcxXYiXNHSSL6XYiQmfnOtg/ewFPG5wIo7L95hRgBXp8bxpD4VO6N4xx42jDkxoMITkcLJlvoFlSyxkOk9KsRPvxRVL4xBLwzoDM65eqfi9wRGA+DUcIIcrqLrDLlwgKqrmcDI7jgzH7EAr+cKnKXHizTNSAjWYc9ajIu6YbWGLPSiA09bvZ+ejA40OJ2XoTplTSpkTb58KyPpCaXc5CXnsAfrywdy6Dr464b72/efwbop1CydOKaVOvHdVGcTJgq31nlknIbuKlWANy0/2hbBdTwwoW2CFo1s5cUmZYPRW53QMv61B7PT0h/G4suKM/7a650eWZg+12TX+TGT/HROPtTPgwo6dt3PSy84QLiJAJ6zSCTLxMD4et4NUYpREK4hcp5g6Uxuystv6lk46rfe/kY3fnRMcjfx4nvsdOpG9zJ9Popvc1kmwu8Adfj28SyfhvPyAH8Bb2KET8WULQS7KoMN2x9EY/0w+ws6c+MkqdjgYOhkcUr3N2fZzf/2yWSYCqndwtJrzPMAvlL7AjQv9p+Myal3GDPcYVH5ii9uwIyciVZv4PA97fL165MwXYRgKznZWW75ksCv+3Mmfqp8a4ca7OEKddxGlWO9gJptLpfTCTpykleBYzYUVOh0xYXYL+LN+lqnpH4gGqAhJhKH6m8SCjSQqwmTWqVRcdJaU0sZJRkmBE53T6Tw12RHoKZzOnJh1KnJ+saqUftjaSVZJFSc7kd007tZJZG2vsxZQvSnOOJtNXpzNpaSCk70rboTD666cbCzt/smrDr4pTeOxTiVxHasO1tWtsJ2YfoA476rCKHJivI4TPHX6WljHwooOmGwL/tRwgm9KUydOJd5gMMCj/TEGTodHYeVUhaUFW78PtnMVcuOjOk4WSzx3+lpL2RbjOpXfMNlWo5b18E1p6MStJOYmPZU7s3I6VPM7L1DMZ2FgvShVnWjuHGl6ncpqqdfw1CB+U5o5yVei71OHemwnOCXhf6qNK2yWZY1S20mU9m9uILjyFri13orrs5RGTgqUFDuBP4Nns/sE1ynFs+HdOIF1KnHdCtPudVdcL/R6XYtSJ37RWLjICW5LxKF2Mufy0XTjBNeprNT5aq+4XjhmXEvXnxSGB4qcPPFsvqDh7MevTidOYI2LXK6DyxhqD1NX9d+TYu9FTjLrRPXVZCXbiRO7wMB6n/orrrM1UJmT4jqrihN7kAxTfHJlcBdOVLMnW2XXuqhmtFvjV+QkcqxTgqZITvF14QTXOuHsIM6fto+jX84JFnC7DtOz4143TrBTeBvGYI+wgxXXl3OiBqzMPLhrXLkUB5I6cDJRY4fE9y7tV1xf0MkJ+7FM9RleVEJc/jtwsrdjzZr2QeMLOlmox8jng+jmYRzgABHCHMoJfB2z+pBOxAZ+zhzteMZJYorT0H7F9SnhpHiFcJZCJ95IBV/C+FspX7/cMqcqPIZRChw1C5yDt/dEMk5wnUrffGeJuWj2XctWrcTZJt6/cK1X51TrIxc78Z6DXhYG33nZn7blUewEP4O6Nd/j4sdizWahVoLjcq1kkQzVIq6Paq18iZObzCeS8SpIrxsns2xbf/RTt1MLO5qfpWjYV8eJF/H0ZZhaatTaCfRbE7VHZI0xO5ZSWUmpE28xZ3b5EUx/GNrWCdbgyYhJD4qTX98HnDNXSnUlZydylb1xMsEEU/SGf5gv+1OB4OzeNKQDJkpJOYE0PMUWfyaahREmNv16ME9KDSXe6v5XzFrf+8NaJiQmFR5Gb/GKz+f7pf1F9Qz2LOTeHivdwAFrTHv8hJ+J+7mDfT63XkPcUuoo+R/ikvKPK3FJ+eeVZKWQEi8thZRIbCmF4eh/CSOFlGgWO7kiPnB8QPkPM36O/weor/yfI34Cq7tF+U4EQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAX4z+oxJgnvo1wvAAAAABJRU5ErkJggg=='}
                                            alt={"Nova poshta"} className={'postImage'}/>
                                    </div>
                                    <div className={post === 'Ukr poshta' ? 'post choosenPost' : 'post'}
                                         onClick={() => setPost('Ukr poshta')}>
                                        <img
                                            src={'data:image/png;base64,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'}
                                            alt={"Ukr poshta"} className={'postImage'}/>
                                    </div>
                                    <div className={post === 'Meest express' ? 'post choosenPost' : 'post'}
                                         onClick={() => setPost('Meest express')}>
                                        <img
                                            src={'data:image/png;base64,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'}
                                            alt={"Meest express"} className={'postImage'}/>
                                    </div>
                                </div>
                                <div className='order'>
                                    <input type="text" value={address} onChange={changeAddress}
                                           placeholder='Адреса'
                                           className={address.length > 2 ? 'green' : 'red'}/>
                                </div>
                                <div className={'classOfTake'}>
                                    <div className={'classChooser'}>
                                        <select value={deliveryType} onChange={changeDeliveryType}>
                                            <option value="Self-pick">Самовивіз</option>
                                            <option value="Delivery by courier">Доставити курєром</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'classOfTake'}>
                                    <div className={'classChooser'}>
                                        <select value={payType} onChange={changePaidType}>
                                            <option value="Postpaid">Після плата</option>
                                            <option value="Pay now">Сплатити зараз</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='order'>
                                    <input type="text" value={firstName} onChange={changeFirstName}
                                           placeholder='Імя'
                                           className={address.length > 2 ? 'green' : 'red'}/>
                                </div>
                                <div className='order'>
                                    <input type="text" value={secondName} onChange={changeSecondName}
                                           placeholder='Прізвище'
                                           className={address.length > 2 ? 'green' : 'red'}/>
                                </div>
                                <div className='order'>
                                    <input type="text" value={phoneNumber} onChange={changePhoneNumber}
                                           placeholder='Номер телефону'
                                           className={address.length > 2 ? 'green' : 'red'}/>
                                </div>
                                <div className={'acceptOrder'} onClick={makeOrder}>
                                    Підтвердити замовлення
                                </div>
                            </div>

                        </div>

                        <div className={'detailsClose'} onClick={buy}><BsIcons.BsXCircleFill/></div>
                    </div>
                    :
                    <></>
            }

        </div>
    )
}

export default Basket
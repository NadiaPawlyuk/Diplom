import '../index.css'
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import Product from "../components/product";
import React from "react";
import notification from "../grobalVariables/notificationArray";
import {useSelector} from "react-redux";

function WishList() {

    const id = useSelector(state => state.login.stateUserId)

    const [backToMain, setBackToMain] = useState(false)

    const [products, setProducts] = useState(<></>)

    const [update, setUpdate] = useState(false)

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    function changeUpdate() {
        setUpdate(!update)
    }

    async function getProducts() {
        await axios({
            method: "get",
            url: "http://localhost:3000/wishList/findAll/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                const productss = []
                const productres = []
                let countProducts = 0
                response.data.forEach(data => {
                    console.log(data)
                    productss.push(<Product product={JSON.parse(data.product)} wl={true} update={changeUpdate}/>)
                    countProducts++
                    console.log(productss.length)
                    if (countProducts === 5) {
                        const a = <div className={'productLn'}>{productss.map(data => {
                            return data
                        })}</div>
                        productres.push(a)
                        productss.length = 0
                        countProducts = 0
                    }
                })
                if(productss.length > 0){
                    const a = <div className={'productLn'}>{productss.map(data => {
                        return data
                    })}</div>
                    productres.push(a)
                }
                setProducts(productres)
            }else setProducts(<></>)
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        getProducts()
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
                    Список бажань
                </div>

            </div>

            <div className={'wishListHandle'}>
                {products}
            </div>

        </div>
    )
}

export default WishList
import '../index.css'
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import Product from "../components/product";
import React from "react";
import notification from "../grobalVariables/notificationArray";
import {useSelector} from "react-redux";
import BigLineComparison from "../components/bigLineComparison";

function Comparison() {

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

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    async function getProducts() {
        await axios({
            method: "get",
            url: "http://localhost:3000/comparison/findAll/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                const categories = []
                response.data.forEach(data => {
                    categories.push(data.categoryId)
                })
                const uniqueArray = categories.filter(onlyUnique)
                const res = []
                uniqueArray.forEach((data) => {
                    const products = []
                    response.data.forEach((prod) => {
                        if(data === prod.categoryId){
                            products.push(prod.product)
                        }
                    })
                    res.push(<BigLineComparison data={data} products={products} changeUpdate={changeUpdate}/>)
                })
                setProducts(res)
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

                <div className={'comparisonText'}>
                    Порівняння
                </div>

            </div>

            <div className={'comparisonHandlePr'}>
                {products}
            </div>

        </div>
    )
}

export default Comparison
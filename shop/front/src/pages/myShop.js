import React from "react";
import '../index.css'
import {Redirect} from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Page from "../components/page";
import ProductInfoController from "../components/productInfoController";
import notification from "../grobalVariables/notificationArray";
import ProductShop from "../components/productShop";
import Product from "../components/product";
import AddProduct from "../components/addProduct";
import OrderComponent from "../components/order";
import OrderShop from "../components/orderShop";

function MyShop() {

    const [offset, setOffset] = useState(0)

    const [page, setPage] = useState(0)

    const [pages, setPages] = useState([])

    const pageLimit = 16

    const [pagesN, setPagesN] = useState(0)

    const [editCart, setEditCart] = useState(false)

    const shop = useSelector(state => state.shop.stateShopName)

    const id = useSelector(state => state.login.stateUserId)

    const [backToMain, setBackToMain] = useState(false)

    const [searchType, setSearchType] = useState('name')

    const [searchObj, setSearchObj] = useState('')

    const [search, setSearch] = useState(false)

    const [deleteSmt, setDeleteSmt] = useState(false)

    const [products, setProducts] = useState(<></>)

    const [showCreateForm, setCreateForm] = useState(false)

    const [publicKey, setPublicKey] = useState('')

    const [privateKey, setPrivateKey] = useState('')

    const [orders, setOrders] = useState([])

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    function changeEditCart() {
        if(editCart) {
            getCreditCart()
        }
        setEditCart(!editCart)
    }

    function changeShowCreateForm() {
        setCreateForm(!showCreateForm)
    }

    function changeSearchObj(event){
        setSearchObj(event.target.value)
    }

    function changePublicKey(event){
        setPublicKey(event.target.value)
    }

    function changePrivateKey(event){
        setPrivateKey(event.target.value)
    }

    function changeSearch(){
        setSearch(!search)
        if(search){
            getProducts()
            setSearchObj('')
        }
    }

    function changeSearchType(event){
        setSearchType(event.target.value)
    }

    function changePageTo(data) {
        setPage(data)
    }

    function changeDelete(){
        setDeleteSmt(!deleteSmt)
    }

    async function getProducts(){
        await axios({
            method: "get",
            url: "http://localhost:3000/product/getAllShop/" + id + '&' + pageLimit + '&' + offset,
        }).then(function (response) {
            if (response.data.rows.length > 0) {
                let usersNumber = response.data.count
                let pagesNumber = 0
                const pagesBefore = []
                do {
                    usersNumber = usersNumber - pageLimit
                    pagesBefore.push(<Page number={pagesNumber} page={page}
                                           changePage={(data) => changePageTo(data)}/>)
                    pagesNumber++
                } while (usersNumber > 0)
                setPagesN(pagesNumber - 1)
                setPages(pagesBefore)
                const productss = []
                const productres = []
                let countProducts = 0
                response.data.rows.forEach(data => {
                    productss.push(<ProductShop product={data} update={changeDelete}/>)
                    countProducts++
                    if (countProducts === 4) {
                        const a = <div className={'productLnShop'}>{productss.map(data => {
                            return data
                        })}</div>
                        productres.push(a)
                        productss.length = 0
                        countProducts = 0
                    }
                })
                if (productss.length > 0) {
                    const a = <div className={'productLnShop'}>{productss.map(data => {
                        return data
                    })}</div>
                    productres.push(a)
                }
                setProducts([])
                setProducts(productres)
            }else setProducts(<></>)
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function getCreditCart(){
        await axios({
            method: "get",
            url: "http://localhost:3000/creditCart/findAll/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                setPublicKey(response.data[0].publicKey)
                setPrivateKey(response.data[0].privateKey)
            }else setProducts(<></>)
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function updateCreditCart(){
        await axios({
            method: "patch",
            url: "http://localhost:3000/creditCart/change/" + id + '&' + publicKey + '&' + privateKey,
        }).then(function (response) {
            changeEditCart()
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function searchProducts(){
        console.log('asd')
        await axios({
            method: "get",
            url: "http://localhost:3000/product/searchShop/" + searchType + '&' + searchObj + '&' + id + '/' + '&' + pageLimit + '&' + offset,
        }).then(function (response) {
            console.log(response)
            if (response.data.rows.length > 0) {
                changeSearch()
                let usersNumber = response.data.count
                let pagesNumber = 0
                const pagesBefore = []
                do {
                    usersNumber = usersNumber - pageLimit
                    pagesBefore.push(<Page number={pagesNumber} page={page}
                                           changePage={(data) => changePageTo(data)}/>)
                    pagesNumber++
                } while (usersNumber > 0)
                setPagesN(pagesNumber - 1)
                setPages(pagesBefore)
                const productss = []
                const productres = []
                let countProducts = 0
                response.data.rows.forEach(data => {
                    productss.push(<ProductShop product={data} update={changeDelete}/>)
                    countProducts++
                    if (countProducts === 4) {
                        const a = <div className={'productLnShop'}>{productss.map(data => {
                            return data
                        })}</div>
                        productres.push(a)
                        productss.length = 0
                        countProducts = 0
                    }
                })
                if (productss.length > 0) {
                    const a = <div className={'productLnShop'}>{productss.map(data => {
                        return data
                    })}</div>
                    productres.push(a)
                }
                setProducts([])
                setProducts(productres)
            } else {
                setProducts(<></>)
                notification.addNotification({type: 'warning', name: 'Немає даних'})
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function getOrders() {
        await axios({
            method: "get",
            url: "http://localhost:3000/order/findAllSID/" + id,
        }).then(function (response) {
            const array = []
            if (response.data.length > 0) {
                response.data.forEach(data => {
                    array.push(<OrderShop data={data}/>)
                })
            }
            setOrders(array)
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        getCreditCart()
        getOrders()
    }, [])

    useEffect(() => {
        setOffset(pageLimit * page)
    }, [page])

    useEffect(() => {
        if(!search) {
            getProducts()
        } else searchProducts()
    }, [offset])

    useEffect(() => {
        if(!search) {
            getProducts()
        } else searchProducts()
    }, [deleteSmt, showCreateForm])

    if (backToMain) {

        return <Redirect to={'/'}/>

    } else return (
        <div className={'settings'}>

            <div className={'settingsHead'}>

                <div className={'settingsBack'} onClick={changeBackToMain}>
                    <BsIcons.BsCaretLeftFill/>Назад
                </div>

                <div className={'settingsText'}>
                    {shop}
                </div>

            </div>

            <div className={'controllersSearchHandle'}>
                <div className={'controllerSearchChooser'}>
                    <select value={searchType} onChange={changeSearchType}>
                        <option value="name">Імя</option>
                        <option value="shopName">Назва магазину</option>
                        <option value="id">ID</option>
                        <option value="price">Ціна</option>
                        <option value="category">Категорія</option>
                    </select>
                </div>

                <div className={'searchForm'} style={{marginLeft: '15px'}}>
                    <div className='searchInput'>
                        <input type="text" value={searchObj} onChange={changeSearchObj} placeholder='Напишіть те що хочете знайти'/>
                    </div>
                    <div className={'searchButton'} onClick={searchProducts}> <BsIcons.BsSearch/> </div>
                </div>

                {search ? <div className={'closeSearchButton'} onClick={changeSearch}><BsIcons.BsXCircleFill/></div> : <></>}

            </div>

            <div className={'myShopBloc'}>

                <div className={'myShopProducts'}>
                    <div className={'myShopProductsHandle'}>
                        {products}
                    </div>
                    <div className={'pageLine'}>
                        {
                            pagesN < 4 ?
                                <>{pages}</>
                                :
                                page >= 2 ?
                                    page >= pagesN - 1 ?
                                        <>
                                            {pages.slice(0, 1)}
                                            {pagesN >= 4 ? <Page number={'...'}/> : <></>}
                                            {pages.slice(pagesN - 2, pagesN + 1)}
                                        </>
                                        :
                                        <>
                                            {pages[0]}
                                            {page >= 3 ? <Page number={'...'}/> : <></>}
                                            {pages.slice(page - 1, page + 2)}
                                            {page <= pagesN - 3 ? <Page number={'...'}/> : <></>}
                                            {pages[pagesN]}
                                        </>
                                    :
                                    <>
                                        {pages.slice(0, 3)}
                                        {pagesN >= 4 ? <Page number={'...'}/> : <></>}
                                        {pages.slice(pagesN, pagesN + 1)}
                                    </>
                        }
                    </div>
                </div>


                <div className={'myShopOrders'}>
                    <div className={'myShopOrdersHandle'}>
                        {orders}
                    </div>
                    <div className={'myShopCart'}>
                        {editCart ?
                            <div className={'keys'}>
                                <input type="text" value={publicKey} onChange={changePublicKey} placeholder='Публічний ключ LiqPay'/>
                                <input type="text" value={privateKey} onChange={changePrivateKey} placeholder='Приватний ключ LiqPay'/>
                            </div>
                            :
                            publicKey}
                        {editCart ?
                            <>
                            <BsIcons.BsCheckLg className={'acceptCreditCart'} onClick={updateCreditCart}/>
                            <BsIcons.BsXLg className={'cancelCreditCart'} onClick={changeEditCart}/>
                            </>
                            :
                        <BsIcons.BsPencilSquare className={'editCreditCart'} onClick={changeEditCart}/>
                        }
                    </div>
                </div>

            </div>

            <div className={'userControllerAddCircle'} onClick={changeShowCreateForm}><BsIcons.BsFillBagPlusFill className=''/></div>

            {showCreateForm ? <AddProduct back={changeShowCreateForm}/> : <></>}

        </div>
    )
}

export default MyShop
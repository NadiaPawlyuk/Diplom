import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import notification from "../grobalVariables/notificationArray";
import axios from "axios";
import Page from "../components/page";
import AddProduct from "../components/addProduct";
import ProductInfoController from "../components/productInfoController";

function ProductController() {

    const [offset, setOffset] = useState(0)

    const [page, setPage] = useState(0)

    const [pages, setPages] = useState([])

    const pageLimit = 9

    const [pagesN, setPagesN] = useState(0)

    const [backToMain, setBackToMain] = useState(false)

    const [showCreateForm, setCreateForm] = useState(false)

    const [products, setProducts] = useState(<></>)

    const [deleteSmt, setDeleteSmt] = useState(false)

    const [searchType, setSearchType] = useState('name')

    const [searchObj, setSearchObj] = useState('')

    const [search, setSearch] = useState(false)

    function changeSearchObj(event){
        setSearchObj(event.target.value)
    }

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    function changePageTo(data) {
        setPage(data)
    }

    function changeShowCreateForm() {
        setCreateForm(!showCreateForm)
    }

    function changeDelete(){
        setDeleteSmt(!deleteSmt)
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

    useEffect(() => {
        if(!search) {
            getProducts()
        }else searchProducts()
    }, [])

    async function getProducts(){
        await axios({
            method: "get",
            url: "http://localhost:3000/product/getAll" + pageLimit + '&' + offset,
        }).then(function (response) {
            console.log(response)
            if (response.data.rows.length > 0) {
                let usersNumber = response.data.count
                let pagesNumber = 0
                const pagesBefore = []
                do {
                    usersNumber = usersNumber - pageLimit
                    pagesBefore.push(<Page number={pagesNumber} page={page} changePage={(data) => changePageTo(data)}/>)
                    pagesNumber++
                } while (usersNumber > 0)
                setPagesN(pagesNumber - 1)
                setPages(pagesBefore)
                const productss = []
                response.data.rows.forEach(data => {
                    productss.push(<ProductInfoController product={data} update={changeDelete}/>)
                })
                setProducts(productss)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function searchProducts(){
        await axios({
            method: "get",
            url: "http://localhost:3000/product/search/" + searchType + '&' + searchObj + '/' + '&' + pageLimit + '&' + offset,
        }).then(function (response) {
            console.log(response)
            if (response.data.rows.length > 0) {
                if(!search) {
                    changeSearch()
                }
                let usersNumber = response.data.count
                let pagesNumber = 0
                const pagesBefore = []
                do {
                    usersNumber = usersNumber - pageLimit
                    pagesBefore.push(<Page number={pagesNumber} page={page} changePage={(data) => changePageTo(data)}/>)
                    pagesNumber++
                } while (usersNumber > 0)
                setPagesN(pagesNumber - 1)
                setPages(pagesBefore)
                const productss = []
                response.data.rows.forEach(data => {
                    productss.push(<ProductInfoController product={data} update={changeDelete}/>)
                })
                setProducts(productss)
            } else {
                notification.addNotification({type: 'warning', name: 'Немає даних'})
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        setOffset(pageLimit * page)
    }, [page])

    useEffect(() => {
        if(!search) {
            getProducts()
        } else searchProducts()
    }, [offset, deleteSmt, showCreateForm])

    if (backToMain) {

        return <Redirect to={'/'}/>

    } else return (
        <div className={'userController'}>
            <div className={'settingsHead'}>

                <div className={'settingsBack'} onClick={changeBackToMain}>
                    <BsIcons.BsCaretLeftFill className=''/>Назад
                </div>

                <div className={'userControllerText'}>
                    Керування товарами
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

            <div className={'usersHandle'}>
                <div className={'usersBlock'}>
                    {products}
                </div>
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

            <div className={'userControllerAddCircle'} onClick={changeShowCreateForm}><BsIcons.BsFillBagPlusFill className=''/></div>

            {showCreateForm ? <AddProduct back={changeShowCreateForm}/> : <></>}

        </div>
    )
}

export default ProductController
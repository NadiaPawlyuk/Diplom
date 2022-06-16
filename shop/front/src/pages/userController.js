import '../index.css'
import React from "react";
import * as BsIcons from "react-icons/bs";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import notification from "../grobalVariables/notificationArray";
import axios from "axios";
import AddUser from "../components/addUser";
import Page from "../components/page";
import UserInfoController from "../components/userInfoController";
import SearchForm from "../components/searchForm";

function UserController() {

    const [offset, setOffset] = useState(0)

    const [page, setPage] = useState(0)

    const [pages, setPages] = useState([])

    const pageLimit = 9

    const [pagesN, setPagesN] = useState(0)

    const [backToMain, setBackToMain] = useState(false)

    const [showCreateForm, setCreateForm] = useState(false)

    const [users, setUsers] = useState(<></>)

    const [deleteSmt, setDeleteSmt] = useState(false)

    const [searchType, setSearchType] = useState('firstName')

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

    function changeSearchType(event){
        setSearchType(event.target.value)
    }

    function changeSearch(){
        setSearch(!search)
        if(search){
            getUsers()
            setSearchObj('')
        }
    }

    useEffect(() => {
        if(!search) {
            getUsers()
        }else searchUsers()
    }, [])

    async function getUsers(){
        await axios({
            method: "get",
            url: "http://localhost:3000/user/getAll" + pageLimit + '&' + offset,
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
                const userrs = []
                response.data.rows.forEach(data => {
                    userrs.push(<UserInfoController user={data} update={changeDelete}/>)
                })
                setUsers(userrs)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function searchUsers(){
        await axios({
            method: "get",
            url: "http://localhost:3000/user/search/" + searchType + '&' + searchObj + '/' + '&' + pageLimit + '&' + offset,
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
                const userrs = []
                response.data.rows.forEach(data => {
                    userrs.push(<UserInfoController user={data} update={changeDelete}/>)
                })
                setUsers(userrs)
            } else {
                notification.addNotification({type: 'warning', name: 'Немає даних'})
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        setOffset(pageLimit * page)
        console.log(page)
    }, [page])

    useEffect(() => {
        if(!search) {
            getUsers()
        } else searchUsers()
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
                    Керування користувачами
                </div>

            </div>

            <div className={'controllersSearchHandle'}>
                <div className={'controllerSearchChooser'}>
                    <select value={searchType} onChange={changeSearchType}>
                        <option value="firstName">Імя</option>
                        <option value="secondName">Прізвище</option>
                        <option value="id">ID</option>
                        <option value="phoneNumber">Номер телефону</option>
                        <option value="login">Логін</option>
                    </select>
                </div>

                <div className={'searchForm'} style={{marginLeft: '15px'}}>
                    <div className='searchInput'>
                        <input type="text" value={searchObj} onChange={changeSearchObj} placeholder='Напишіть те що хочете знайти'/>
                    </div>
                    <div className={'searchButton'} onClick={searchUsers}> <BsIcons.BsSearch/> </div>
                </div>

                {search ? <div className={'closeSearchButton'} onClick={changeSearch}><BsIcons.BsXCircleFill/></div> : <></>}

            </div>

            <div className={'usersHandle'}>
                <div className={'usersBlock'}>
                    {users}
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

            <div className={'userControllerAddCircle'} onClick={changeShowCreateForm}><BsIcons.BsFillPersonPlusFill className=''/></div>

            {showCreateForm ? <AddUser back={changeShowCreateForm}/> : <></>}

        </div>
    )
}

export default UserController
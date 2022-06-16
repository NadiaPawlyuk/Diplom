import React from "react";
import {useState} from "react";
import axios from "axios";
import stringify from "qs-stringify";
import {useDispatch} from 'react-redux'
import {setAdmin, setLoginRed, setShop} from "../redux/actions";
import notification from "../grobalVariables/notificationArray";

function LogRegForm() {

    const dispatch = useDispatch();

    const [login, setLogin] = useState("")

    const [password, setPassword] = useState("")

    const [firstName, setFirstName] = useState("")

    const [secondName, setSecondName] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("")

    const [register, setRegister] = useState(false)

    function changeRegister() {
        setPhoneNumber('')
        setFirstName('')
        setSecondName('')
        setLogin('')
        setPassword('')
        setRegister(!register)
    }

    function changeLogin(event) {
        setLogin(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
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

    async function loginToSite() {
        let check = true
        if(!login || !password){
            notification.addNotification({type: 'warning', name: 'Заповніть усі поля'})
        } else if(password.length <= 4){
            notification.addNotification({type: 'warning', name: 'Пароль повинен містити більше 4 символів'})
        } else if(login.length <= 2){
            notification.addNotification({type: 'warning', name: 'Логін повинен містити більше 2 символів'})
        } else
        {
            await axios({
                method: "get",
                url: "http://localhost:3000/user/login" + login + '&' + password
            }).then(function (response) {
                console.log(response)
                if (response.data.length > 0) {
                    setPhoneNumber('')
                    setFirstName('')
                    setSecondName('')
                    setLogin('')
                    setPassword('')
                    dispatch(setLoginRed({
                        firstName: response.data[0].firstName,
                        secondName: response.data[0].secondName,
                        phoneNumber: response.data[0].phoneNumber,
                        userLogin: response.data[0].login,
                        userId: response.data[0].id
                    }))
                    if(response.data[0].isAdmin === true) {
                        dispatch(setAdmin({isAdmin: 'true'}))
                    } else dispatch(setAdmin({isAdmin: 'false'}))
                    if(response.data[0].isShop === true) {
                        dispatch(setShop({isShop: 'true', shopName: response.data[0].shopName}))
                    } else dispatch(setShop({isShop: 'false', shopName: ''}))
                    notification.addNotification({type: 'success', name: 'Ви увійшли в систему'})
                } else notification.addNotification({type: 'warning', name: 'Не правильний логін або пароль'})
            }).catch(function (error) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    async function registerOnSite() {
        if(!firstName || !secondName || !phoneNumber || !login || !password){
            notification.addNotification({type: 'warning', name: 'Заповніть усі поля'})
        } else if(firstName.length <= 2){
            notification.addNotification({type: 'warning', name: 'Імя повиненне містити більше 2 символів'})
        }else if(secondName.length <= 2){
            notification.addNotification({type: 'warning', name: 'Прізвище повиненне містити більше 2 символів'})
        }else if(password.length <= 4){
            notification.addNotification({type: 'warning', name: 'Пароль повинен містити більше 4 символів'})
        }else if(login.length <= 2){
            notification.addNotification({type: 'warning', name: 'Логін повинен містити більше 2 символів'})
        }else if(phoneNumber.length <= 9){
            notification.addNotification({type: 'warning', name: 'Номер телефону повинен містити більше 9 символів'})
        } else{
            await axios({
                method: "post",
                url: "http://localhost:3000/user/create",
                data: stringify({
                    login: login,
                    password: password,
                    firstName: firstName,
                    secondName: secondName,
                    phoneNumber: phoneNumber
                })
            }).then(function (response) {
                if (response.data !== '') {
                    setPhoneNumber('')
                    setFirstName('')
                    setSecondName('')
                    setLogin('')
                    setPassword('')
                    dispatch(setLoginRed({
                        firstName: response.data.firstName,
                        secondName: response.data.secondName,
                        phoneNumber: response.data.phoneNumber,
                        userLogin: response.data.login,
                        userId: response.data.id
                    }))
                    dispatch(setAdmin({isAdmin: false}))
                    dispatch(setShop({isShop: 'false', shopName: ''}))
                    notification.addNotification({type: 'success', name: 'Ваш аккаун створено'})
                }
            }).catch(function (error) {
                if(error.message === 'Request failed with status code 500'){
                    notification.addNotification({type: 'error', name: 'Цей користувач уже існує'})
                }else notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    return (<div className={'logRegForm'}>

        <div className={'logRegInputs'}>

            {register ?
                <>
                    <div className='logRegInput'>
                        <input type="text" value={login} onChange={changeLogin} placeholder='Логін' className={login.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="password" value={password} onChange={changePassword} placeholder='Пароль' className={password.length > 4 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={firstName} onChange={changeFirstName} placeholder='Імя' className={firstName.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={secondName} onChange={changeSecondName} placeholder='Прізвище' className={secondName.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={phoneNumber} onChange={changePhoneNumber} placeholder='Номер телефону' className={phoneNumber.length > 9 ? 'green' : 'red'}/>
                    </div>
                </> :
                <>
                    <div className='logRegInput'>
                        <input type="text" value={login} onChange={changeLogin} placeholder='Логін' className={login.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="password" value={password} onChange={changePassword} placeholder='Пароль' className={password.length > 4 ? 'green' : 'red'}/>
                    </div>
                </>}


        </div>

        <div className={'logRegButtons'}>

            <div className={'logRegButton'}
                 onClick={register ? registerOnSite : loginToSite}>{register ? 'Реєстрація' : 'Увійти'}</div>

            <div
                className={'logRegChangeText'}> {register ? 'Уже маєте аккаунт?' : 'Не маєте аккаунту?'}
                <div className={'logRegChangeTextButton'}
                     onClick={() => changeRegister()}>{register ? 'Увійти' : 'Реєстрація'} </div>
            </div>
        </div>

    </div>)
}

export default LogRegForm
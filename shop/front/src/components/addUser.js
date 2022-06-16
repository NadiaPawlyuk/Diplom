import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import {Redirect} from "react-router-dom";
import {useState} from "react";
import notification from "../grobalVariables/notificationArray";
import axios from "axios";
import stringify from "qs-stringify";
import {setAdmin, setLoginRed} from "../redux/actions";

function AddUser({back}) {

    const [login, setLogin] = useState("")

    const [password, setPassword] = useState("")

    const [firstName, setFirstName] = useState("")

    const [secondName, setSecondName] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("")

    const [isAdmin, setIsAdmin] = useState('')

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

    function changeIsAdmin(event){
        setIsAdmin(event.target.value)
    }

    async function registerOnSite() {
        if(!firstName || !secondName || !phoneNumber || !login || !password || !isAdmin){
            notification.addNotification({type: 'warning', name: 'Заповніть усі поля'})
        } else if(firstName.length <= 2){
            notification.addNotification({type: 'warning', name: 'Імя повинне містити більше 2 символів'})
        }else if(secondName.length <= 2){
            notification.addNotification({type: 'warning', name: 'Прізвище повинне містити більше 2 символів'})
        }else if(password.length <= 4){
            notification.addNotification({type: 'warning', name: 'Пароль повинен містити більше 4 символів'})
        }else if(login.length <= 2){
            notification.addNotification({type: 'warning', name: 'Логін повинен містити більше 2 символів'})
        }else if(phoneNumber.length <= 9){
            notification.addNotification({type: 'warning', name: 'Номер телефону повинен містити більше 9 символів'})
        }else if(isAdmin !== 'так' && isAdmin !== 'ні'){
            notification.addNotification({type: 'warning', name: 'Напишіть так або ні в полі адмін'})
        }else{
            let isAdminBool
            if(isAdmin === 'так'){
                isAdminBool = 1
            }
            if (isAdmin === 'ні'){
                isAdminBool = 0
            }
            await axios({
                method: "post",
                url: "http://localhost:3000/user/create",
                data: stringify({
                    login: login,
                    password: password,
                    firstName: firstName,
                    secondName: secondName,
                    phoneNumber: phoneNumber,
                    isAdmin: isAdminBool
                })
            }).then(function (response) {
                if (response.data !== '') {
                    setPhoneNumber('')
                    setFirstName('')
                    setSecondName('')
                    setLogin('')
                    setPassword('')
                    setIsAdmin('')
                    back()
                    notification.addNotification({type: 'success', name: 'Ви добавили користувача'})
                }
            }).catch(function (error) {
                if(error.message === 'Request failed with status code 500'){
                    notification.addNotification({type: 'error', name: 'Цей користувач уже існує'})
                }else notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    return (
        <div className={'addUser'}>
            <div onClick={back} className={'addUserClose'}><BsIcons.BsXCircleFill className='profileIcon'/></div>
            <div className={'addUserInputsHolder'}>
                <div className={'addUserInputs'}>
                    <div className='logRegInput'>
                        <input type="text" value={login} onChange={changeLogin} placeholder='Логін'
                               className={login.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="password" value={password} onChange={changePassword} placeholder='Пароль'
                               className={password.length > 4 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={firstName} onChange={changeFirstName} placeholder='Імя'
                               className={firstName.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={secondName} onChange={changeSecondName} placeholder='Прізвище'
                               className={secondName.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={phoneNumber} onChange={changePhoneNumber} placeholder='Номер телефону'
                               className={phoneNumber.length > 9 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={isAdmin} onChange={changeIsAdmin} placeholder='Є адміном?(так або ні)'
                               className={(isAdmin === 'так' || isAdmin === 'ні') ? 'green' : 'red'}/>
                    </div>
                </div>
            </div>
            <div className={'addUserButtonHolder'}>
                <div className={'addUserButton'} onClick={registerOnSite}>
                    Добавити користувача
                </div>
            </div>
        </div>
    )
}

export default AddUser
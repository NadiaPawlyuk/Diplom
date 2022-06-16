import React from "react";
import * as BsIcons from "react-icons/bs";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import stringify from "qs-stringify";
import notification from "../grobalVariables/notificationArray";
import {setLoginRed} from "../redux/actions";

function Settings() {

    const dispatch = useDispatch()

    const [login, setLogin] = useState("")

    const [password, setPassword] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")

    const [firstName, setFirstName] = useState("")

    const [secondName, setSecondName] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("")

    const [backToMain, setBackToMain] = useState(false)

    const [changeSomething, setChangeSomething] = useState(false)

    const [whatToChange, setWhatToChange] = useState('')

    const [changeInputs, setChangeInputs] = useState()

    const id = useSelector(state => state.login.stateUserId)

    const loginState = useSelector(state => state.login.stateUserLogin)

    const firstNameState = useSelector(state => state.login.stateFirstName)

    const secondNameState = useSelector(state => state.login.stateSecondName)

    const phoneNumberState = useSelector(state => state.login.statePhoneNumber)

    function changeBackToMain() {
        setBackToMain(!backToMain)
    }

    function changeWhatToChange(data) {
        setWhatToChange(data)
    }

    function changeChangeSomething(data) {
        setFirstName('')
        setSecondName('')
        setPassword('')
        setPhoneNumber('')
        setLogin('')
        setChangeSomething(!changeSomething)
        if (data) {
            changeWhatToChange(data)
        }
    }

    function changeLogin(event) {
        setLogin(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    function changeCurrentPassword(event) {
        setCurrentPassword(event.target.value)
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

    async function getNewData() {
        await axios({
            method: "get",
            url: "http://localhost:3000/user/get/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                dispatch(setLoginRed({
                    firstName: response.data[0].firstName,
                    secondName: response.data[0].secondName,
                    phoneNumber: response.data[0].phoneNumber,
                    userLogin: response.data[0].login,
                    userId: response.data[0].id
                }))
                changeChangeSomething()
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function changeFirstNameAPI() {
        if (firstName === firstNameState) {
            notification.addNotification({type: 'warning', name: "Ви вже використовуєте це ім'я"})
        } else {
            await axios({
                method: "put",
                url: "http://localhost:3000/user/update/" + id,
                data: stringify({
                    firstName: firstName
                })
            }).then(function (response) {
                if (response.data.length > 0) {
                    notification.addNotification({type: 'success', name: "Ви успішно змінили ім'я"})
                    getNewData()
                }
            }).catch(function (error) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    async function changeSecondNameAPI() {
        if (secondName === secondNameState) {
            notification.addNotification({type: 'warning', name: 'Ви вже використовуєте це прізвище'})
        } else {
            await axios({
                method: "put",
                url: "http://localhost:3000/user/update/" + id,
                data: stringify({
                    secondName: secondName
                })
            }).then(function (response) {
                if (response.data.length > 0) {
                    notification.addNotification({type: 'success', name: 'Ви успішно змінили прізвище'})
                    getNewData()
                }
            }).catch(function (error) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    async function changeLoginAPI() {
        if (login === loginState) {
            notification.addNotification({type: 'warning', name: 'Ви вже використовуєте цей логін'})
        } else {
            await axios({
                method: "put",
                url: "http://localhost:3000/user/update/" + id,
                data: stringify({
                    login: login
                })
            }).then(function (response) {
                if (response.data.length > 0) {
                    notification.addNotification({type: 'success', name: 'Ви успішно змінили логін'})
                    getNewData()
                }
            }).catch(function (error) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    async function changePhoneNumberAPI() {
        if (phoneNumber === phoneNumberState) {
            notification.addNotification({type: 'warning', name: 'Ви вже використовуєте цей номер телефону'})
        } else {
            await axios({
                method: "put",
                url: "http://localhost:3000/user/update/" + id,
                data: stringify({
                    phoneNumber: phoneNumber
                })
            }).then(function (response) {
                if (response.data.length > 0) {
                    notification.addNotification({type: 'success', name: 'Ви успішно змінили номер телефону'})
                    getNewData()
                }
            }).catch(function (error) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    async function changePasswordAPI() {

        let existedPassword = ''

        await axios({
            method: "get",
            url: "http://localhost:3000/user/get/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                existedPassword = response.data[0].password
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });

        if(password === existedPassword){
            notification.addNotification({type: 'warning', name: 'Ви вже використовуєте цей пароль'})
        }else if(existedPassword !== currentPassword){
            notification.addNotification({type: 'warning', name: 'Паролі не співпадають'})
        } else  await axios({
            method: "put",
            url: "http://localhost:3000/user/update/" + id,
            data: stringify({
                password: password
            })
        }).then(function (response) {
            if (response.data.length > 0) {
                notification.addNotification({type: 'success', name: 'Ви успішно змінили пароль'})
                changeChangeSomething()
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        switch (whatToChange) {
            case 'first_name': {
                setChangeInputs(
                    <div className={'changeMenu'}>
                        <div className={'changeMenuText'}>
                            Впишіть ім'я
                        </div>
                        <div className={'changeMenuInputsHolder'}>
                            <div className='changeInput'>
                                <input type="text" value={firstName} onChange={changeFirstName} placeholder="Ім'я"
                                       className={firstName.length > 2 ? 'green' : 'red'}/>
                            </div>
                        </div>
                        <div className={'changeMenuButtonHolder'}>
                            <div onClick={changeFirstNameAPI}
                                 className={firstName.length > 2 ? 'changeMenuButtonSend' : 'changeMenuButtonSend grayButtonDisable'}>Змінити ім'я
                            </div>
                        </div>
                    </div>
                )
                break
            }
            case 'second_name': {
                setChangeInputs(
                    <div className={'changeMenu'}>
                        <div className={'changeMenuText'}>
                            Впишіть прізвище
                        </div>
                        <div className={'changeMenuInputsHolder'}>
                            <div className='changeInput'>
                                <input type="text" value={secondName} onChange={changeSecondName}
                                       placeholder='Прізвище' className={secondName.length > 2 ? 'green' : 'red'}/>
                            </div>
                        </div>
                        <div className={'changeMenuButtonHolder'}>
                            <div onClick={changeSecondNameAPI}
                                 className={secondName.length > 2 ? 'changeMenuButtonSend' : 'changeMenuButtonSend grayButtonDisable'}>Змінити прізвище
                            </div>
                        </div>
                    </div>
                )
                break
            }
            case 'phone_number': {
                setChangeInputs(
                    <div className={'changeMenu'}>
                        <div className={'changeMenuText'}>
                            Впишіть номер телефону
                        </div>
                        <div className={'changeMenuInputsHolder'}>
                            <div className='changeInput'>
                                <input type="text" value={phoneNumber} onChange={changePhoneNumber}
                                       placeholder='Номер телефону' className={phoneNumber.length > 9 ? 'green' : 'red'}/>
                            </div>
                        </div>
                        <div className={'changeMenuButtonHolder'}>
                            <div onClick={changePhoneNumberAPI}
                                 className={phoneNumber.length > 9 ? 'changeMenuButtonSend' : 'changeMenuButtonSend grayButtonDisable'}>Змінити номер телефону
                            </div>
                        </div>
                    </div>
                )
                break
            }
            case 'login': {
                setChangeInputs(
                    <div className={'changeMenu'}>
                        <div className={'changeMenuText'}>
                            Впишіть логін
                        </div>
                        <div className={'changeMenuInputsHolder'}>
                            <div className='changeInput'>
                                <input type="text" value={login} onChange={changeLogin} placeholder='Логін'
                                       className={login.length > 2 ? 'green' : 'red'}/>
                            </div>
                        </div>
                        <div className={'changeMenuButtonHolder'}>
                            <div onClick={changeLoginAPI}
                                 className={login.length > 2 ? 'changeMenuButtonSend' : 'changeMenuButtonSend grayButtonDisable'}>Змінити логін
                            </div>
                        </div>
                    </div>
                )
                break
            }
            case 'password': {
                setChangeInputs(
                    <div className={'changeMenu'}>
                        <div className={'changeMenuText'}>
                            Впишіть теперішній пароль та новий
                        </div>
                        <div className={'changeMenuInputsHolder'}>
                            <div className='changeInput'>
                                <input type="text" value={currentPassword} onChange={changeCurrentPassword}
                                       placeholder='Теперішній пароль'
                                       className={currentPassword.length > 4 ? 'green' : 'red'}/>
                            </div>
                            <div className='changeInput'>
                                <input type="text" value={password} onChange={changePassword} placeholder='Новий пароль'
                                       className={password.length > 4 ? 'green' : 'red'}/>
                            </div>
                        </div>
                        <div className={'changeMenuButtonHolder'}>
                            <div onClick={changePasswordAPI}
                                className={(password.length > 4 && currentPassword.length > 4) ? 'changeMenuButtonSend' : 'changeMenuButtonSend grayButtonDisable'}>Змінити пароль
                            </div>
                        </div>
                    </div>
                )
                break
            }
        }
    }, [whatToChange, firstName, secondName, password, login, phoneNumber, currentPassword])

    if (backToMain) {

        return <Redirect to={'/'}/>

    } else return (
        <>
            <div className={'settings'}>

                <div className={'settingsHead'}>

                    <div className={'settingsBack'} onClick={changeBackToMain}>
                        <BsIcons.BsCaretLeftFill className=''/>Назад
                    </div>

                    <div className={'settingsTextN'}>
                        Налаштування
                    </div>

                </div>

                <div className={'settingsButtonsHolder'}>

                    <div className={'settingsButtonsLine'}>
                        <div className={'settingsButton'} onClick={() => changeChangeSomething('first_name')}>Змінити ім'я
                        </div>
                    </div>

                    <div className={'settingsButtonsLine'}>
                        <div className={'settingsButton'} onClick={() => changeChangeSomething('second_name')}>Змінити прізвище
                        </div>
                    </div>

                    <div className={'settingsButtonsLine'}>
                        <div className={'settingsButton'} onClick={() => changeChangeSomething('login')}>Змінити логін
                        </div>
                    </div>

                    <div className={'settingsButtonsLine'}>
                        <div className={'settingsButton'} onClick={() => changeChangeSomething('password')}>Змінити пароль
                        </div>
                    </div>

                    <div className={'settingsButtonsLine'}>
                        <div className={'settingsButton'} onClick={() => changeChangeSomething('phone_number')}>Змінити номер телефону
                        </div>
                    </div>

                </div>

            </div>
            <div className={changeSomething ? 'changeSomething' : 'dontChangeSomething'}>
                <div onClick={changeChangeSomething} className={'closeChangeMenu'}>
                    <BsIcons.BsXCircleFill className='profileIcon'/>
                </div>
                <div className={'changeBlock'}>
                    {changeInputs}
                </div>
            </div>
        </>
    )
}

export default Settings
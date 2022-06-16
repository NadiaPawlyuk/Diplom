import React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {setLoginRed} from "../redux/actions";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import notification from "../grobalVariables/notificationArray";
import {Redirect} from "react-router-dom";

function LoginedForm() {

    const dispatch = useDispatch();

    const firstNameState = useSelector(state => state.login.stateFirstName)

    const secondNameState = useSelector(state => state.login.stateSecondName)

    const shop = useSelector(state => state.shop.stateShop)

    const admin = useSelector(state => state.admin.stateAdmin)

    const [goToSettings, setGoToSettings] = useState(false)

    const [goToAddUser, setGoToAddUser] = useState(false)

    const [goToProductController, setGoToProductController] = useState(false)

    const [goToWishList, setGoToWishList] = useState(false)

    const [goToFormShopRequest, setGoToFormShopRequest] = useState(false)

    const [goToControllerShopRequest, setGoToControllerShopRequest] = useState(false)

    const [goToMyShop, setGoToMyShop] = useState(false)

    const [goToBasket, setGoToBasket] = useState(false)

    const [goToOrders, setGoToOrders] = useState(false)

    const [goToComparison, setGoToComparison] = useState(false)

    function logout() {
        dispatch(setLoginRed({firstName: '', secondName: '', phoneNumber: '', userLogin: '', userId: ''}))
        notification.addNotification({type: 'success', name: 'Ви вийшли з аккаунту'})
    }

    function changeGoToSettings(){
        setGoToSettings(!goToSettings)
    }

    function changeGoToComparison(){
        setGoToComparison(!goToComparison)
    }

    function changeGoToOrders(){
        setGoToOrders(!goToOrders)
    }

    function changeGoToBasket(){
        setGoToBasket(!goToBasket)
    }

    function changeGoToControllerShopRequest(){
        setGoToControllerShopRequest(!goToControllerShopRequest)
    }

    function changeGoToWishList(){
        setGoToWishList(!goToWishList)
    }

    function changeGoToMyShop(){
        setGoToMyShop(!goToMyShop)
    }

    function changeGoToAddUser(){
        setGoToAddUser(!goToAddUser)
    }

    function changeGoToFormShopRequest(){
        setGoToFormShopRequest(!goToFormShopRequest)
    }

    function changeGoToProductController(){
        setGoToProductController(!goToProductController)
    }

    if (goToSettings) {

        return <Redirect to={'/settings'}/>

    } else if(goToAddUser){

        return <Redirect to={'/addUser'}/>

    } else if(goToProductController){

        return <Redirect to={'/productController'}/>

    } else if(goToWishList){

        return <Redirect to={'/wishList'}/>

    } else if(goToFormShopRequest){

        return <Redirect to={'/shopRequestForm'}/>

    } else if(goToControllerShopRequest){

        return <Redirect to={'/shopRequestController'}/>

    } else if(goToMyShop){

        return <Redirect to={'/myShop'}/>

    } else if(goToBasket){

        return <Redirect to={'/basket'}/>

    } else if(goToOrders){

        return <Redirect to={'/orders'}/>

    } else if(goToComparison){

        return <Redirect to={'/comparison'}/>

    } else return (
        <div className={'logRegForm'}>

        <div className={'logRegInputs'}>

            <div className={'loginedUserName'}>{firstNameState} {secondNameState}</div>

            <div className={'loginedMenu'}>

                {admin === 'true' ?
                    <>
                        <div className={'loginedButton'} onClick={changeGoToProductController}>Керування товарами<BsIcons.BsFillBagFill className=''/></div>

                        <div className={'loginedButton'} onClick={changeGoToAddUser}>Керування користувачами<BsIcons.BsFillPersonLinesFill className=''/></div>

                        <div className={'loginedButton'} onClick={changeGoToControllerShopRequest}>Магазинні запити<BsIcons.BsFillBagFill className=''/></div>

                    </>
                    :
                    <>
                        <div className={'loginedButton'} onClick={changeGoToWishList}>Список бажань<BsIcons.BsSuitHeartFill className=''/></div>

                        <div className={'loginedButton'} onClick={changeGoToComparison}>Порівняння<RiIcons.RiScales3Line className=''/></div>

                        <div className={'loginedButton'} onClick={changeGoToBasket}>Корзина<BsIcons.BsBasketFill className=''/></div>

                        <div className={'loginedButton'} onClick={changeGoToOrders}>Замовлення<BsIcons.BsHddStackFill className=''/></div>

                        {shop === 'true' ?
                            <div className={'loginedButton'} onClick={changeGoToMyShop}>Мій магазин<BsIcons.BsFillBagFill className=''/></div>
                            :
                            <div className={'loginedButton'} onClick={changeGoToFormShopRequest}>Стати магазином<BsIcons.BsFillBagFill className=''/></div>}

                    </>}

                <div className={'loginedButton'} onClick={changeGoToSettings}>Налаштування<BsIcons.BsGearFill className=''/></div>

            </div>

        </div>

        <div className={'logRegButtons'}>

            <div>
                <div className={'logRegChangeTextButton'} onClick={logout}>Вийти з системи</div>
            </div>

        </div>

    </div>)
}

export default LoginedForm
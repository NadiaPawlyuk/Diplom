import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import UpdateUser from "./updateUser";
import {useEffect, useState} from "react";
import DeleteUser from "./deleteUser";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

function ProductInfoController({product, update}) {


    const [showUpdateForm, setUpdateForm] = useState(false)

    function changeShowUpdateForm() {
        setUpdateForm(!showUpdateForm)
    }

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    function changeShowDeleteConfirm() {
        setShowDeleteConfirm(!showDeleteConfirm)
    }

    useEffect(() => {
        update()
    }, [showDeleteConfirm, showUpdateForm])

    return (
        <div className={'userInfo'}>
            <div className={'userInfoID'}>
                {'#' + product.id}
            </div>
            <div className={'userInfoNames'}>
                <BsIcons.BsFillBagFill className='userInfoIcon'/>
                <div className={'userInfoName'}
                     title={product.name}>{product.name.length > 7 ? product.name.slice(0, 7) + ".." : product.name}</div>
                <BsIcons.BsFillCartFill className='userInfoIcon'/>
                <div className={'userInfoName'}
                     title={product.shopName}>{product.shopName.length > 7 ? product.shopName.slice(0, 7) + ".." : product.shopName}</div>
            </div>
            <div className={'userInfoPhone'}>
                <BsIcons.BsBoxSeam className='userInfoIcon'/>
                <div className={'userInfoPhonePhone'}>{product.price}</div>
                <BsIcons.BsCurrencyExchange className='userInfoIcon productIconMarginLeft'/>
                <div className={'userInfoPhonePhone'}>{product.number}</div>
            </div>
            <div className={'userInfoLogin'}>
                <BsIcons.BsFillInboxesFill className='userInfoIcon'/>
                <div title={product.category} className={'userInfoPhonePhone'}>{product.category.length > 7 ? product.category.slice(0,7) + ".." : product.category}</div>
            </div>
            <div className={'userInfoButtons'}>

                <div className={'userInfoButton userInfoUpdateButton'} onClick={changeShowUpdateForm}>
                    <BsIcons.BsFillBagDashFill className='userInfoIcon'/>
                </div>

                <div className={'userInfoButton userInfoDeleteButton'} onClick={changeShowDeleteConfirm}>
                    <BsIcons.BsFillBagXFill className='userInfoIcon'/>
                </div>

            </div>

            {showUpdateForm ? <UpdateProduct back={changeShowUpdateForm} product={product}/> : <></>}

            {showDeleteConfirm ? <DeleteProduct id={product.id} back={changeShowDeleteConfirm}/> : <></>}

        </div>
    )
}

export default ProductInfoController
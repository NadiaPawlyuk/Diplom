import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import {useEffect, useState} from "react";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";


function ProductShop({product, update}) {

    const [showUpdateForm, setUpdateForm] = useState(false)

    function changeShowUpdateForm() {
        if(showUpdateForm){
            update()
        }
        setUpdateForm(!showUpdateForm)
    }

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    function changeShowDeleteConfirm(e) {
        e.stopPropagation();
        setShowDeleteConfirm(!showDeleteConfirm)
    }

    function asd(){
        if(showDeleteConfirm){
            update()
        }
        setShowDeleteConfirm(!showDeleteConfirm)
    }

    const [images, setImages] = useState(product.images.split(';'))

    return (
        <>
            <div className={'productShopBlc'} onClick={changeShowUpdateForm}>

                <BsIcons.BsFillXCircleFill className={'deleteShopProduct'} onClick={changeShowDeleteConfirm}/>

                <div className={'productImageHolder'}>
                    <img src={images[0]} alt={product.name} className={'productImage'}/>
                </div>
                <div className={'productNameHolder'} title={product.name}>
                    {product.name.length > 100 ? product.name.slice(0, 100) + ".." : product.name}
                </div>
                <div className={'productPriceAndCart'}>
                    {product.number === '0' || product.number === 0 ?
                        <div className={'productPrice'}>Not available</div>
                        :
                        <div className={'productPrice'}>{product.price} ₴</div>
                    }
                    <div className={'productNumber'}># {product.number}</div>
                </div>

            </div>

            {showDeleteConfirm ? <DeleteProduct id={product.id} back={asd}/> : <></>}

            {showUpdateForm ? <UpdateProduct back={changeShowUpdateForm} product={product}/> : <></>}
        </>
    )
}

export default ProductShop
import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import UpdateUser from "./updateUser";
import {useEffect, useState} from "react";
import DeleteUser from "./deleteUser";

function UserInfoController({user, update}) {


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
                {'#' + user.id}
            </div>
            <div className={'userInfoNames'}>
                <BsIcons.BsFillPersonFill className='userInfoIcon'/>
                <div className={'userInfoName'}
                     title={user.firstName}>{user.firstName.length > 7 ? user.firstName.slice(0, 7) + ".." : user.firstName}</div>
                <div className={'userInfoName'}
                     title={user.secondName}>{user.secondName.length > 7 ? user.secondName.slice(0, 7) + ".." : user.secondName}</div>
            </div>
            <div className={'userInfoPhone'}>
                <BsIcons.BsFillTelephoneFill className='userInfoIcon'/>
                <div className={'userInfoPhonePhone'}>{user.phoneNumber}</div>
            </div>
            <div className={'userInfoLogin'}>
                <BsIcons.BsFillPersonBadgeFill className='userInfoIcon'/>
                <div title={user.login} className={'userInfoPhonePhone'}>{user.login.length > 7 ? user.login.slice(0,7) + ".." : user.login}</div>
            </div>
            <div className={'userInfoButtons'}>

                <div className={'userInfoButton userInfoUpdateButton'} onClick={changeShowUpdateForm}>
                    <BsIcons.BsFillPersonLinesFill className='userInfoIcon'/>
                </div>

                <div className={'userInfoButton userInfoDeleteButton'} onClick={changeShowDeleteConfirm}>
                    <BsIcons.BsFillPersonXFill className='userInfoIcon'/>
                </div>

            </div>

            {showUpdateForm ? <UpdateUser back={changeShowUpdateForm} user={user}/> : <></>}

            {showDeleteConfirm ? <DeleteUser id={user.id} back={changeShowDeleteConfirm}/> : <></>}

        </div>
    )
}

export default UserInfoController
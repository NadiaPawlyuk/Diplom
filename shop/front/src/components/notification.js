import React from "react";
import * as BsIcons from "react-icons/bs";
import {useEffect, useState} from "react";
import notification from "../grobalVariables/notificationArray";

function Notification({data}) {

    const [icon, setIcon] = useState('')

    const [type, setType] = useState('')

    useEffect(() => {

        setTimeout(() => {

            notification.removeNotification()

        }, 5000)

    }, [])

    useEffect(() => {
        switch (data.type) {
            case 'error': {
                setIcon(<BsIcons.BsFillEmojiDizzyFill className='notificationIcon'/>)
                setType('notificationError')
                break
            }
            case 'success': {
                setIcon(<BsIcons.BsFillEmojiHeartEyesFill className='notificationIcon'/>)
                setType('notificationSuccess')
                break
            }
            case 'warning': {
                setIcon(<BsIcons.BsFillEmojiFrownFill className='notificationIcon'/>)
                setType('notificationWarning')
                break
            }
            case 'info': {
                setIcon(<BsIcons.BsFillEmojiWinkFill className='notificationIcon'/>)
                setType('notificationInfo')
                break
            }
            default: {
                setIcon(<BsIcons.BsFillEmojiWinkFill className='notificationIcon'/>)
                setType('notificationInfo')
            }
        }
    }, [data.type])

    return (
        <div className={'notification ' + type}>
            {icon}
            <div className={'notificationLine'}></div>
            <div className={'notificationMessage'}>{data.name}</div>
        </div>
    )
}

export default Notification
import React from "react";
import Notification from "../components/notification";

const notificationArray = []

function addNotification(data){
    if(notificationArray.length > 9){
        notificationArray.shift()
    }
    notificationArray.push(data)

    return notificationArray
}

function removeNotification(){
    notificationArray.shift()
}

function getNotification(){
    const a = []
    notificationArray.map(data =>{
        a.push(<Notification data={data}/>)
    })
    return a
}

const notification={
    notificationArray: notificationArray,
    addNotification: addNotification,
    removeNotification: removeNotification,
    getNotification: getNotification
}

export default notification
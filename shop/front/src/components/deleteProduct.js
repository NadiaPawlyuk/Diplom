import React from "react";
import '../index.css'
import notification from "../grobalVariables/notificationArray";
import axios from "axios";

function DeleteProduct({back, id}) {


    async function deleteProduct() {
        await axios({
            method: "delete",
            url: "http://localhost:3000/product/delete/" + id
        }).then(function (response) {
            console.log('R', response)
            if (response.data === 'Success') {
                notification.addNotification({type: 'success', name: 'Ви видалили товар'})
            }
            back()
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    return (
        <div className={'deleteUser'}>
            <div className={'deleteUserInside'}>
                <div className={'userButton deleteUserButton'} onClick={deleteProduct}>Видалити</div>
                <div className={'userButton cancelDeleteButton'} onClick={back}>Відхилити</div>
            </div>
        </div>
    )
}

export default DeleteProduct
import React from "react";
import '../index.css'
import notification from "../grobalVariables/notificationArray";
import axios from "axios";

function DeleteUser({back, id}) {


    async function deleteUser() {

        await axios({
            method: "delete",
            url: "http://localhost:3000/user/delete/" + id
        }).then(function (response) {
            console.log('R', response)
            if (response.data === 'Success') {
                notification.addNotification({type: 'success', name: 'Ви видалили користувача'})
            }
            back()
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    return (
        <div className={'deleteUser'}>
            <div className={'deleteUserInside'}>
                <div className={'userButton deleteUserButton'} onClick={deleteUser}>Видалити</div>
                <div className={'userButton cancelDeleteButton'} onClick={back}>Відхилити</div>
            </div>
        </div>
    )
}

export default DeleteUser
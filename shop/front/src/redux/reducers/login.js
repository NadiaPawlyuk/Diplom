import {SET_LOGINRED} from "../actions/actionTypes";

let firstName = localStorage.getItem('first_name');
let secondName = localStorage.getItem('second_name');
let phoneNumber = localStorage.getItem('phone_number');
let userLogin = localStorage.getItem('user_login');
let userId = localStorage.getItem('user_id')

const initialState = {
    stateFirstName: firstName ? firstName : "",
    stateSecondName: secondName ? secondName : "",
    statePhoneNumber: phoneNumber ? phoneNumber : "",
    stateUserLogin: userLogin ? userLogin : "",
    stateUserId: userId ? userId : ""
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGINRED:{
            localStorage.setItem("first_name", action.data.firstName);
            localStorage.setItem("second_name", action.data.secondName);
            localStorage.setItem("phone_number", action.data.phoneNumber);
            localStorage.setItem("user_login", action.data.userLogin);
            localStorage.setItem("user_id", action.data.userId);
            return {
                ...state,
                stateFirstName: action.data.firstName,
                stateSecondName: action.data.secondName,
                statePhoneNumber: action.data.phoneNumber,
                stateUserLogin: action.data.userLogin,
                stateUserId: action.data.userId,
            };
        }
        default:
            return state;
    }
}

export default login;
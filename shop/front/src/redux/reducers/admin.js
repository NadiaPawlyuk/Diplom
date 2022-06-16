import {SET_ADMIN} from "../actions/actionTypes";

let isAdmin = localStorage.getItem('is_admin');

const initialState = {
    stateAdmin: isAdmin ? isAdmin : 'false',
};

const admin = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN:{
            localStorage.setItem("is_admin", action.data.isAdmin);
            return {
                ...state,
                stateAdmin: action.data.isAdmin,
            };
        }
        default:
            return state;
    }
}

export default admin;
import {SET_RESENT} from "../actions/actionTypes";

let resent = JSON.parse(localStorage.getItem('resent'));

const initialState = {
    stateRecent: resent ? resent : []
};

const resentProd = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESENT:{
            localStorage.setItem("resent", JSON.stringify(action.data.resent));
            return {
                ...state,
                stateRecent: action.data.resent,
            };
        }
        default:
            return state;
    }
}

export default resentProd;
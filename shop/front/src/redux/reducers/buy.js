import {SET_BUY} from "../actions/actionTypes";

let buyForms = JSON.parse(localStorage.getItem('buy_forms'));

const initialState = {
    stateBuy: buyForms ? buyForms : []
};

const buy = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUY:{
            localStorage.setItem("buy_forms", JSON.stringify(action.data.buyForms));
            return {
                ...state,
                stateBuy: action.data.buyForms,
            };
        }
        default:
            return state;
    }
}

export default buy;
import {SET_SHOP} from "../actions/actionTypes";

let isShop = localStorage.getItem('is_shop');
let shopName = localStorage.getItem('shop_name');

const initialState = {
    stateShop: isShop ? isShop : 'false',
    stateShopName: shopName ? shopName : 'false'
};

const shop = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOP:{
            localStorage.setItem("is_shop", action.data.isShop);
            localStorage.setItem("shop_name", action.data.shopName);
            return {
                ...state,
                stateShop: action.data.isShop,
                stateShopName: action.data.shopName,
            };
        }
        default:
            return state;
    }
}

export default shop;
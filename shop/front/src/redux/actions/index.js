import {
    SET_LOGINRED,
    SET_ADMIN, SET_SHOP, SET_BUY, SET_RESENT
} from "./actionTypes";

export const setLoginRed = (data) => ({
    type: SET_LOGINRED,
    data: data
})

export const setAdmin = (data) => ({
    type: SET_ADMIN,
    data: data
})

export const setShop = (data) => ({
    type: SET_SHOP,
    data: data
})

export const setBuy = (data) => ({
    type: SET_BUY,
    data: data
})

export const setResent = (data) => ({
    type: SET_RESENT,
    data: data
})
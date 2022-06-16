import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import notification from "../grobalVariables/notificationArray";
import axios from "axios";
import stringify from "qs-stringify";
import {setAdmin, setLoginRed} from "../redux/actions";
import {useSelector} from "react-redux";

function AddProduct({back}) {

    const shopIDState = useSelector(state => state.shop.stateShop)

    const shopNameState = useSelector(state => state.shop.stateShopName)

    const id = useSelector(state => state.login.stateUserId)

    const [name, setName] = useState("")

    const [shopName, setShopName] = useState("")

    const [shopID, setShopID] = useState("")

    const [chType, setChType] = useState("")

    function changeChType(event) {
        setChType(event.target.value)
    }

    const [chCapacity, setChCapacity] = useState("")

    function changeChCapacity(event) {
        setChCapacity(event.target.value)
    }

    const [chScent, setChScent] = useState("")

    function changeChScent(event) {
        setChScent(event.target.value)
    }

    const [chUseType, setChUseType] = useState("")

    function changeChUseType(event) {
        setChUseType(event.target.value)
    }

    const [chGender, setChGender] = useState("")

    function changeChGender(event) {
        setChGender(event.target.value)
    }

    const [chBrand, setChBrand] = useState("")

    function changeChBrand(event) {
        setChBrand(event.target.value)
    }

    const [chCountry, setChCountry] = useState("")

    function changeChCountry(event) {
        setChCountry(event.target.value)
    }

    const [chPurpose, setChPurpose] = useState("")

    function changeChPurpose(event) {
        setChPurpose(event.target.value)
    }

    const [chColor, setChColor] = useState("")

    function changeChColor(event) {
        setChColor(event.target.value)
    }

    const [chMass, setChMass] = useState("")

    function changeChMass(event) {
        setChMass(event.target.value)
    }

    const [chTexture, setChTexture] = useState("")

    function changeChTexture(event) {
        setChTexture(event.target.value)
    }

    const [chEffect, setChEffect] = useState("")

    function changeChEffect(event) {
        setChEffect(event.target.value)
    }

    const [chCoverage, setChCoverage] = useState("")

    function changeChCoverage(event) {
        setChCoverage(event.target.value)
    }

    const [chProtectionDegree, setChProtectionDegree] = useState("")

    function changeChProtectionDegree(event) {
        setChProtectionDegree(event.target.value)
    }

    const [chSkinType, setChSkinType] = useState("")

    function changeChSkinType(event) {
        setChSkinType(event.target.value)
    }

    const [chCount, setChCount] = useState("")

    function changeChCount(event) {
        setChCount(event.target.value)
    }

    const [chMaterial, setChMaterial] = useState("")

    function changeChMaterial(event) {
        setChMaterial(event.target.value)
    }

    const [chHairType, setChHairType] = useState("")

    function changeChHairType(event) {
        setChHairType(event.target.value)
    }

    const [chFixationDegree, setChFixationDegree] = useState("")

    function changeChFixationDegree(event) {
        setChFixationDegree(event.target.value)
    }

    const [chTime, setChTime] = useState("")

    function changeChTime(event) {
        setChTime(event.target.value)
    }

    const [chAlcoholContent, setChAlcoholContent] = useState("")

    function changeChAlcoholContent(event) {
        setChAlcoholContent(event.target.value)
    }

    const [chFormat, setChFormat] = useState("")

    function changeChFormat(event) {
        setChFormat(event.target.value)
    }

    const [chBoxType, setChBoxType] = useState("")

    function changeChBoxType(event) {
        setChBoxType(event.target.value)
    }

    const [chAgeCategory, setChAgeCategory] = useState("")

    function changeChAgeCategory(event) {
        setChAgeCategory(event.target.value)
    }

    const [chUsage, setChUsage] = useState("")

    function changeChUsage(event) {
        setChUsage(event.target.value)
    }

    const [chStyle, setChStyle] = useState("")

    function changeChStyle(event) {
        setChStyle(event.target.value)
    }

    const [charecteristics, setCharecteristics] = useState('')

    const [images, setImages] = useState("")

    const [price, setPrice] = useState('')

    const [category, setCategory] = useState("")

    const [categoryTXT, setCategoryTXT] = useState("")

    const [number, setNumber] = useState('')

    const [about, setAbout] = useState('')


    function changeName(event) {
        setName(event.target.value)
    }

    function changeShopName(event) {
        setShopName(event.target.value)
    }

    function changeShopID(event) {
        setShopID(event.target.value)
    }

    function changeImages(event) {
        setImages(event.target.value)
    }

    function changePrice(event) {
        setPrice(event.target.value)
    }

    function changeCategory(event) {
        setChAgeCategory('')
        setChAlcoholContent('')
        setChBoxType('')
        setChCapacity('')
        setChBrand('')
        setChColor('')
        setChCount('')
        setChType('')
        setChUseType('')
        setChScent('')
        setChGender('')
        setChCountry('')
        setChPurpose('')
        setChMass('')
        setChTexture('')
        setChEffect('')
        setChCoverage('')
        setChProtectionDegree('')
        setChSkinType('')
        setChMaterial('')
        setChHairType('')
        setChFixationDegree('')
        setChTime('')
        setChFormat('')
        setChUsage('')
        setChStyle('')
        let r = event.target.value.split(', ')
        if(r.length > 0) {
            setCategory(r[0])
            setCategoryTXT(r[1])
        } else {
            setCategory(event.target.value)
            setCategoryTXT(event.target.value)
        }
    }

    function changeNumber(event) {
        setNumber(event.target.value)
    }

    function changeAbout(event) {
        setAbout(event.target.value)
    }

    async function addProductOnSite() {
        if (!name || !shopName || !shopID || !images || !price || !category || !number || !about) {
            notification.addNotification({type: 'warning', name: 'Заповніть всі поля'})
        } else if (name.length <= 2) {
            notification.addNotification({type: 'warning', name: 'Назва повинна містити більше 2 символів'})
        } else if (shopName.length <= 2) {
            notification.addNotification({type: 'warning', name: 'Назва магазину повинне містити більше 2 символів'})
        } else if (category.length <= 2) {
            notification.addNotification({type: 'warning', name: 'Категорія повинна містити більше 2 символів'})
        } else if (about.length <= 20) {
            notification.addNotification({type: 'warning', name: 'Детальна інформація повинна містити більше 20 символів'})
        } else if (Number(price) <= 0) {
            notification.addNotification({type: 'warning', name: 'Ціна повинна бути більшою за 0'})
        } else {
            let char
            if (category === 'Gift for her' || category === 'Gift for him') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chUseType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика тип використання не може бути порожньою'
                    })
                } else if (chGender.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стать не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        useType: chUseType,
                        gender: chGender,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Makeup accessories' || category === 'Cosmetic bags') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMaterial.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика матеріали не може бути порожньою'
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика Бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        material: chMaterial,
                        color: chColor,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Jewelry' || category === 'Hair accessories') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMaterial.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика матеріали не може бути порожньою'
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chStyle.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стиль не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        material: chMaterial,
                        color: chColor,
                        style: chStyle,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Solar series self tanning') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chUsage.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика використання не може бути порожньою'
                    })
                } else if (chAgeCategory.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вік не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        purpose: chPurpose,
                        usage: chUsage,
                        ageCategory: chAgeCategory,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Solar series SPF 30' || category === 'Solar series SPF 40'
                || category === 'Solar series SPF 50') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chProtectionDegree.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика ступінь захисту не може бути порожньою'
                    })
                } else if (chAgeCategory.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вік не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        purpose: chPurpose,
                        protectionDegree: chProtectionDegree,
                        ageCategory: chAgeCategory,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Women deodorants, antiperspirants' || category === 'Men\'s deodorants, antiperspirants') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chFormat.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика формат не може бути порожньою'
                    })
                } else if (chGender.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стать не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        purpose: chPurpose,
                        format: chFormat,
                        gender: chGender,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Shaving machines and cartridges' || category === 'Shaving cosmetics'
                || category === 'Depilatory products') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chSkinType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика тип шкіри не може бути порожньою'
                    })
                } else if (chGender.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стать не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        purpose: chPurpose,
                        skinType: chSkinType,
                        gender: chGender,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Body scrubs' || category === 'Bath bombs and foams') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вага не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        purpose: chPurpose,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Liquid soap' || category === 'Shower gels for bath') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chBoxType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид упаковки не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        purpose: chPurpose,
                        boxType: chBoxType,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Hand antiseptics') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chTexture.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика текстура не може бути порожньою'
                    })
                } else if (chAlcoholContent.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вміст алкоголю не може бути порожньою'
                    })
                } else if (chFormat.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика формат не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        texture: chTexture,
                        alcoholContent: chAlcoholContent,
                        format: chFormat,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (category === 'Creams, lotions for the body' || category === 'Body care oils'
                || category === 'Anti-cellulite remedies' || category === 'Hand care'
                || category === 'Foot care') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chSkinType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика тип шкіри не може бути порожньою'
                    })
                } else if (chTime.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика час використання не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        skinType: chSkinType,
                        usageTime: chTime,
                        purpose: chPurpose,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Nail care' || category === 'Solid dish soap'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else  if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        purpose: chPurpose,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Nail scissors' || category === 'Nail clippers'
                || category === 'Nail pushers' || category === 'Heel graters and saws'
                || category === 'Nail files' || category === 'Pedicure accessories'
                || category === 'Manicure and pedicure kits' || category === 'Bath and shower accessories') {
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Henna, basma for hair' || category === 'Nail decor'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вага не може бути порожньою'
                    })
                } else  if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        color: chColor,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Hair lighteners'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вага не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Hair styling sprays' || category === 'Hair gels'
                || category === 'Foams for hair' || category === 'Hair mousses'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chFixationDegree.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика ступінь фіксації не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chGender.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стать не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        fixationDegree: chFixationDegree,
                        purpose: chPurpose,
                        gender: chGender,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Shampoo' || category === 'Dandruff shampoo'
                || category === 'Dry shampoo' || category === 'Anti-hair loss remedies'
                || category === 'Hair masks' || category === 'Hair balms'
                || category === 'Hair conditioners' || category === 'Hair sprays'
                || category === 'Hair oils'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chHairType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика тип волосся не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chGender.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стать не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        hairType: chHairType,
                        purpose: chPurpose,
                        gender: chGender,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Cotton discs'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCount.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика кількість не може бути порожньою'
                    })
                } else if (chMaterial.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика мфтеріал не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        count: chCount,
                        material: chMaterial,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Micellar cleansing water' || category === 'Removing makeup from the eyes'
                || category === 'Reliance almond oil'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chSkinType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика тип шкіри не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        skinType: chSkinType,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Care of the lips'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вага не може бути порожньою'
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chTexture.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика текстура не може бути порожньою'
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        color: chColor,
                        texture: chTexture,
                        purpose: chPurpose,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Lipsticks' || category === 'Liquid lipsticks'
                || category === 'Lip glosses' || category === 'Lip pencils'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вага не може бути порожньою'
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chEffect.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика еффект не може бути порожньою'
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        color: chColor,
                        effect: chEffect,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Skin foundation' || category === 'BB-cream'
                || category === 'CC-cream'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chTexture.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика текстура не може бути порожньою'
                    })
                } else if (chCoverage.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика покриття не може бути порожньою'
                    })
                } else if (chProtectionDegree.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика ступінь захисту не може бути порожньою'
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        color: chColor,
                        texture: chTexture,
                        coverage: chCoverage,
                        protectionDegree: chProtectionDegree,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'False eyelashes'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chEffect.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика еффект не може бути порожньою'
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        effect: chEffect,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Eyelash and eyebrow care' || category === 'Makeup setting spray'
                || category === 'Gel polish removers'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Eyeshadow' || category === 'Eyebrow products'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика маса не може бути порожньою'
                    })
                } else if (chTexture.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика текстура не може бути порожньою'
                    })
                } else if (chEffect.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика еффект не може бути порожньою'
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        texture: chTexture,
                        effect: chEffect,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Eyeliners' || category === 'Blush'
                || category === 'Bronzers' || category === 'Highlighters'
                || category === 'Face powders' || category === 'Concealers, correctors'
                || category === 'Bases, primers for makeup'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика маса не може бути порожньою'
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chTexture.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика текстура не може бути порожньою'
                    })
                } else if (chEffect.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика еффект не може бути порожньою'
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        color: chColor,
                        texture: chTexture,
                        effect: chEffect,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Eye pencils' || category === 'Face contouring'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chMass.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вага не може бути порожньою'
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else if (chTexture.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика текстура не може бути порожньою'
                    })
                } else  if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        mass: chMass,
                        color: chColor,
                        texture: chTexture,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Mascaras' || category === 'Tinted hair dyes'
                || category === 'Ammonia-free hair dyes' || category === 'Ammonia hair dyes'
                || category === 'Gel varnishes'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chColor.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else   if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        color: chColor,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Shower gels' || category === 'Body creams'
                || category === 'Body lotions' || category === 'Body oils'
                || category === 'Soap'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика об'єм не може бути порожньою"
                    })
                } else if (chPurpose.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика призначення не може бути порожньою'
                    })
                } else if (chGender.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стать не може бути порожньою'
                    })
                } else   if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика колір не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        purpose: chPurpose,
                        gender: chGender,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if(category === 'Women\'s perfumery' || category === 'Men\'s perfumery'
                || category === 'Unisex perfumery' || category === 'Perfume gift sets for her'
                || category === 'Perfume gift sets for him' || category === 'Perfume gift sets unisex perfume'
                || category === 'Solid perfumes' || category === 'Gift perfumed sets'){
                if (chType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика вид не може бути порожньою'
                    })
                } else if (chCapacity.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: "Характеристика обє'м не може бути порожньою"
                    })
                } else if (chScent.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика запах не може бути порожньою'
                    })
                } else if (chUseType.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика тип використання не може бути порожньою'
                    })
                } else if (chGender.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика стать не може бути порожньою'
                    })
                } else   if (chBrand.length === 0) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика бренд не може бути порожньою'
                    })
                } else if (chCountry.length <= 2) {
                    notification.addNotification({
                        type: 'warning',
                        name: 'Характеристика країна не може бути порожньою'
                    })
                } else {
                    char = {
                        type: chType,
                        capacity: chCapacity,
                        scent: chScent,
                        useType: chUseType,
                        gender: chGender,
                        brand: chBrand,
                        country: chCountry
                    }
                }
            }
            if (char) {
                await axios({
                    method: "post",
                    url: "http://localhost:3000/product/create",
                    data: stringify({
                        name: name,
                        shopName: shopName,
                        shopID: shopID,
                        charecteristics: JSON.stringify(char),
                        images: images,
                        price: price,
                        category: category,
                        number: number,
                        about: about
                    })
                }).then(function (response) {
                    if (response.data !== '') {
                        setName('')
                        setShopName('')
                        setShopID('')
                        setNumber('')
                        setAbout('')
                        setCategory('')
                        setImages('')
                        setPrice('')
                        setCharecteristics('')
                        back()
                        notification.addNotification({type: 'success', name: 'Ви створили новий продукт'})
                    }
                }).catch(function (error) {
                    console.log(error)
                    if (error.message === 'Request failed with status code 500') {
                        notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
                    } else notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
                });
            } else notification.addNotification({type: 'warning', name: 'Заповніть усі характеристики, або виберать категорію'})
        }
    }

    useEffect(() => {
        if(shopIDState !== 'false'){
            setShopName(shopNameState)
            setShopID(id)
        }
    }, [])

    return (
        <div className={'addUser'}>
            <div onClick={back} className={'addProductClose'}><BsIcons.BsXCircleFill className='profileIcon'/></div>
            <div className={'addUserInputsHolder'}>
                <div className={'addProductsInputs'}>
                    <div className='logRegInput'>
                        <input type="text" value={name} onChange={changeName} placeholder='Назва'
                               className={name.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={shopName} onChange={changeShopName} placeholder='Назва магазину'
                               className={shopName.length > 2 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={shopID} onChange={changeShopID} placeholder='ID магазину'
                               className={shopID.length > 0 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={images} onChange={changeImages}
                               placeholder='Фото(більше 1 вставте між ними (;))'
                               className={images.length > 0 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={price} onChange={changePrice} placeholder='Ціна'
                               className={price > 0 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input list="cosmeticCategory" placeholder={'Категорія'} value={categoryTXT}
                               onChange={changeCategory} className={category.length > 0 ? 'green' : 'red'}/>
                        <datalist id="cosmeticCategory">
                            <option value="Women's perfumery, Жіноча парфумерія">Жіноча парфумерія</option>
                            <option value="Men's perfumery, Чоловіча парфумерія">Чоловіча парфумерія</option>
                            <option value="Unisex perfumery, Унісекс парфумерія">Унісекс парфумерія</option>
                            <option value="Shower gels, Гелі для душу">Гелі для душу</option>
                            <option value="Body creams, Креми для тіла">Креми для тіла</option>
                            <option value="Body lotions, Лосьйони для тіла">Лосьйони для тіла</option>
                            <option value="Body oils, Олії для тіла">Олії для тіла</option>
                            <option value="Soap, Мило">Мило</option>
                            <option value="Perfume gift sets for her, Парфумовані набори для неї">Парфумовані набори для неї</option>
                            <option value="Perfume gift sets for him, Парфумовані набори для нього">Парфумовані набори для нього</option>
                            <option value="Perfume gift sets unisex perfume, Парфумовані набори унісекс">Парфумовані набори унісекс</option>
                            <option value="Solid perfumes, Тверді парфуми">Тверді парфуми</option>
                            <option value="Mascaras, Туші для вій">Туші для вій</option>
                            <option value="Eye pencils, Олівці для очей">Олівці для очей</option>
                            <option value="Eyeliners, Підводки для очей">Підводки для очей</option>
                            <option value="Eyeshadow, Тіні">Тіні</option>
                            <option value="Eyebrow products, Декоративні засоби для брів">Декоративні засоби для брів</option>
                            <option value="Eyelash and eyebrow care, Догляд за бровами, віями">Догляд за бровами, віями</option>
                            <option value="False eyelashes, Накладні вії">Накладні вії</option>
                            <option value="Skin foundation, Тональні засоби">Тональні засоби</option>
                            <option value="BB-cream, BB-крем">BB-крем</option>
                            <option value="CC-cream, CC-крем">CC-крем</option>
                            <option value="Blush, Рум’яна">Рум’яна</option>
                            <option value="Bronzers, Бронзери">Бронзери</option>
                            <option value="Highlighters, Хайлайтери">Хайлайтери</option>
                            <option value="Face contouring, Контуринг для обличчя">Контуринг для обличчя</option>
                            <option value="Face powders, Пудри">Пудри</option>
                            <option value="Concealers, correctors, Консилери, коректори">Консилери, коректори</option>
                            <option value="Bases, primers for makeup, Бази, праймери під макіяж">Бази, праймери під макіяж</option>
                            <option value="Makeup setting spray, Спреї для фіксації макіяжу">Спреї для фіксації макіяжу</option>
                            <option value="Lipsticks, Помади">Помади</option>
                            <option value="Liquid lipsticks, Рідкі матові помади">Рідкі матові помади</option>
                            <option value="Lip glosses, Блиски">Блиски</option>
                            <option value="Lip pencils, Олівці для губ">Олівці для губ</option>
                            <option value="Care of the lips, Догляд за шкірою губ">Догляд за шкірою губ</option>
                            <option value="Micellar cleansing water, Міцелярна вода">Міцелярна вода</option>
                            <option value="Removing makeup from the eyes, Зняття макіяжу з очей">Зняття макіяжу з очей</option>
                            <option value="Reliance almond oil, Гідрофільна олія">Гідрофільна олія</option>
                            <option value="Cotton discs, Ватні диски">Ватні диски</option>
                            <option value="Shampoo, Шампунь">Шампунь</option>
                            <option value="Dandruff shampoo, Шампунь проти лупи">Шампунь проти лупи</option>
                            <option value="Dry shampoo, Сухий шампунь">Сухий шампунь</option>
                            <option value="Anti-hair loss remedies, Засоби проти випадіння волосся">Засоби проти випадіння волосся</option>
                            <option value="Hair masks, Маски для волосся">Маски для волосся</option>
                            <option value="Hair balms, Бальзами для волосся">Бальзами для волосся</option>
                            <option value="Hair conditioners, Кондиціонери для волосся">Кондиціонери для волосся</option>
                            <option value="Hair sprays, Спреї для волосся">Спреї для волосся</option>
                            <option value="Hair oils, Олія для волосся">Олія для волосся</option>
                            <option value="Hair styling sprays, Лаки для волосся">Лаки для волосся</option>
                            <option value="Hair gels, Гелі для волосся">Гелі для волосся</option>
                            <option value="Foams for hair, Пінки для волосся">Пінки для волосся</option>
                            <option value="Hair mousses, Муси для волосся">Муси для волосся</option>
                            <option value="Tinted hair dyes, Відтінкові фарби">Відтінкові фарби</option>
                            <option value="Ammonia-free hair dyes, Безаміачні фарби">Безаміачні фарби</option>
                            <option value="Ammonia hair dyes, Аміачні фарби">Аміачні фарби</option>
                            <option value="Hair lighteners, Освітлювачі">Освітлювачі</option>
                            <option value="Henna, basma for hair, Хна, басма">Хна, басма</option>
                            <option value="Gel varnishes, Гель-лаки">Гель-лаки</option>
                            <option value="Gel polish removers, Засоби для зняття гель-лаку">Засоби для зняття гель-лаку</option>
                            <option value="Nail scissors, Ножиці">Ножиці</option>
                            <option value="Nail clippers, Щипчики для нігтів">Щипчики для нігтів</option>
                            <option value="Nail pushers, Пушери">Пушери</option>
                            <option value="Heel graters and saws, Терки та пилки для п’яток">Терки та пилки для п’яток</option>
                            <option value="Nail files, Пилочки">Пилочки</option>
                            <option value="Pedicure accessories, Аксесуари для педикюру">Аксесуари для педикюру</option>
                            <option value="Nail care, Догляд для нігтів">Догляд для нігтів</option>
                            <option value="Nail decor, Декор для нігтів">Декор для нігтів</option>
                            <option value="Manicure and pedicure kits, Манікюрні та педикюрні набори">Манікюрні та педикюрні набори</option>
                            <option value="Creams, lotions for the body, Креми, лосьйони для тіла">Креми, лосьйони для тіла</option>
                            <option value="Body care oils, Олії для тіла">Олії для тіла</option>
                            <option value="Anti-cellulite remedies, Антицелюлітні засоби">Антицелюлітні засоби</option>
                            <option value="Hand care, Догляд за руками">Догляд за руками</option>
                            <option value="Foot care, Догляд за ногами">Догляд за ногами</option>
                            <option value="Hand antiseptics, Антисептики для рук">Антисептики для рук</option>
                            <option value="Liquid soap, Рідке мило">Рідке мило</option>
                            <option value="Solid dish soap, Тверде мило">Тверде мило</option>
                            <option value="Shower gels for bath, Гелі для душу(догляд)">Гелі для душу(догляд)</option>
                            <option value="Body scrubs, Скраби для тіла">Скраби для тіла</option>
                            <option value="Bath bombs and foams, Бомбочки та піна для ванної">Бомбочки та піна для ванної</option>
                            <option value="Bath and shower accessories, Аксесуари для ванни та душу">Аксесуари для ванни та душу</option>
                            <option value="Shaving machines and cartridges, Станки та картриджі">Станки та картриджі</option>
                            <option value="Shaving cosmetics, Косметика для гоління">Косметика для гоління</option>
                            <option value="Depilatory products, Засоби для депіляції">Засоби для депіляції</option>
                            <option value="Women deodorants, antiperspirants, Жіночі дезодоранти">Жіночі дезодоранти</option>
                            <option value="Men's deodorants, antiperspirants, Чоловічі дезодоранти">Чоловічі дезодоранти</option>
                            <option value="Solar series SPF 30, SPF 30">SPF 30</option>
                            <option value="Solar series SPF 40, SPF 40">SPF 40</option>
                            <option value="Solar series SPF 50, SPF 50">SPF 50</option>
                            <option value="Solar series self tanning, Автозасмага">Автозасмага</option>
                            <option value="Jewelry, Прикраси">Прикраси</option>
                            <option value="Hair accessories, Аксесуари для волосся">Аксесуари для волосся</option>
                            <option value="Makeup accessories, Аксесуари для макіяжу">Аксесуари для макіяжу</option>
                            <option value="Cosmetic bags, Косметички">Косметички</option>
                            <option value="Gift for her, Подарунки для неї">Подарунки для неї</option>
                            <option value="Gift for him, Подарунки для нього">Подарунки для нього</option>
                            <option value="Gift perfumed sets, Унісекс подарунки">Унісекс подарунки</option>
                        </datalist>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={number} onChange={changeNumber} placeholder='Кількість'
                               className={number.length > 0 ? 'green' : 'red'}/>
                    </div>

                    <div className='logRegInput'>
                        <input type="text" value={about} onChange={changeAbout} placeholder='Про продукт'
                               className={about.length > 20 ? 'green' : 'red'}/>
                    </div>
                </div>
                <div className={'productCharacteristics'}>
                    Характеристики
                    {
                        category === 'Women\'s perfumery' || category === 'Men\'s perfumery'
                        || category === 'Unisex perfumery' || category === 'Perfume gift sets for her'
                        || category === 'Perfume gift sets for him' || category === 'Perfume gift sets unisex perfume'
                        || category === 'Solid perfumes' || category === 'Gift perfumed sets' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCapacity} onChange={changeChCapacity}
                                           placeholder="Об'єм"
                                           className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chScent} onChange={changeChScent} placeholder='Запах'
                                           className={chScent.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chUseType} onChange={changeChUseType}
                                           placeholder='Вид використання'
                                           className={chUseType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chGender} onChange={changeChGender} placeholder='Стать'
                                           className={chGender.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Shower gels' || category === 'Body creams'
                            || category === 'Body lotions' || category === 'Body oils'
                            || category === 'Soap' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCapacity} onChange={changeChCapacity}
                                               placeholder="Об'єм"
                                               className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chPurpose} onChange={changeChPurpose}
                                               placeholder='Призначення'
                                               className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chGender} onChange={changeChGender}
                                               placeholder='Стать'
                                               className={chGender.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Mascaras' || category === 'Tinted hair dyes'
                                || category === 'Ammonia-free hair dyes' || category === 'Ammonia hair dyes'
                                || category === 'Gel varnishes' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCapacity} onChange={changeChCapacity}
                                                   placeholder="Об'єм"
                                                   className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chColor} onChange={changeChColor}
                                                   placeholder='Колір'
                                                   className={chColor.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </>
                                    :
                                    <></>
                    }
                    {
                        category === 'Eye pencils' || category === 'Face contouring' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chMass} onChange={changeChMass}
                                           placeholder='Вага'
                                           className={chMass.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chColor} onChange={changeChColor}
                                           placeholder='Колір'
                                           className={chColor.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chTexture} onChange={changeChTexture}
                                           placeholder='Текстура'
                                           className={chTexture.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробництва'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            : category === 'Eyeliners' || category === 'Blush'
                            || category === 'Bronzers' || category === 'Highlighters'
                            || category === 'Face powders' || category === 'Concealers, correctors'
                            || category === 'Bases, primers for makeup' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chMass} onChange={changeChMass}
                                               placeholder='вага'
                                               className={chMass.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chColor} onChange={changeChColor}
                                               placeholder='Колір'
                                               className={chColor.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chTexture} onChange={changeChTexture}
                                               placeholder='Текстура'
                                               className={chTexture.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chEffect} onChange={changeChEffect}
                                               placeholder='Еффект'
                                               className={chEffect.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                : category === 'Eyeshadow' || category === 'Eyebrow products' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chMass} onChange={changeChMass}
                                                   placeholder='Вага'
                                                   className={chMass.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chTexture} onChange={changeChTexture}
                                                   placeholder='Текстура'
                                                   className={chTexture.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chEffect} onChange={changeChEffect}
                                                   placeholder='Еффект'
                                                   className={chEffect.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </> : <></>
                    }
                    {
                        category === 'Eyelash and eyebrow care' || category === 'Makeup setting spray'
                        || category === 'Gel polish removers' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCapacity} onChange={changeChCapacity}
                                           placeholder="Об'єм"
                                           className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'False eyelashes' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chEffect} onChange={changeChEffect}
                                               placeholder='Еффект'
                                               className={chEffect.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Skin foundation' || category === 'BB-cream'
                                || category === 'CC-cream' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCapacity} onChange={changeChCapacity}
                                                   placeholder="Об'єм"
                                                   className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chColor} onChange={changeChColor}
                                                   placeholder='Колір'
                                                   className={chColor.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chTexture} onChange={changeChTexture}
                                                   placeholder='Текстура'
                                                   className={chTexture.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCoverage} onChange={changeChCoverage}
                                                   placeholder='Покриття'
                                                   className={chCoverage.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chProtectionDegree}
                                                   onChange={changeChProtectionDegree} placeholder='Рівень захисту'
                                                   className={chProtectionDegree.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </> : <></>
                    }
                    {
                        category === 'Lipsticks' || category === 'Liquid lipsticks'
                        || category === 'Lip glosses' || category === 'Lip pencils' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chMass} onChange={changeChMass} placeholder='Вага'
                                           className={chMass.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chColor} onChange={changeChColor} placeholder='Колір'
                                           className={chColor.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chEffect} onChange={changeChEffect} placeholder='Еффект'
                                           className={chEffect.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Care of the lips' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chMass} onChange={changeChMass} placeholder='Вага'
                                               className={chMass.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chColor} onChange={changeChColor} placeholder='Колір'
                                               className={chColor.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chTexture} onChange={changeChTexture}
                                               placeholder='Текстура'
                                               className={chTexture.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chPurpose} onChange={changeChPurpose}
                                               placeholder='Призначення'
                                               className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Micellar cleansing water' || category === 'Removing makeup from the eyes'
                                || category === 'Reliance almond oil' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCapacity} onChange={changeChCapacity}
                                                   placeholder="Об'єм"
                                                   className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chSkinType} onChange={changeChSkinType}
                                                   placeholder='Тип шкіри'
                                                   className={chSkinType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </> : <></>
                    }
                    {
                        category === 'Cotton discs' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCount} onChange={changeChCount}
                                           placeholder='Кількість'
                                           className={chCount.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chMaterial} onChange={changeChMaterial}
                                           placeholder='Матеріал'
                                           className={chMaterial.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Shampoo' || category === 'Dandruff shampoo'
                            || category === 'Dry shampoo' || category === 'Anti-hair loss remedies'
                            || category === 'Hair masks' || category === 'Hair balms'
                            || category === 'Hair conditioners' || category === 'Hair sprays'
                            || category === 'Hair oils' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCapacity} onChange={changeChCapacity}
                                               placeholder="Об'єм"
                                               className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chHairType} onChange={changeChHairType}
                                               placeholder='Тип волосся/проблема'
                                               className={chHairType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chPurpose} onChange={changeChPurpose}
                                               placeholder='Призначення'
                                               className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chGender} onChange={changeChGender}
                                               placeholder='Стать'
                                               className={chGender.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Hair styling sprays' || category === 'Hair gels'
                                || category === 'Foams for hair' || category === 'Hair mousses' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCapacity} onChange={changeChCapacity}
                                                   placeholder="Об'єм"
                                                   className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chFixationDegree}
                                                   onChange={changeChFixationDegree}
                                                   placeholder='Ступінь фіксації'
                                                   className={chFixationDegree.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chPurpose} onChange={changeChPurpose}
                                                   placeholder='Призначення'
                                                   className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chGender} onChange={changeChGender}
                                                   placeholder='Стать'
                                                   className={chGender.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </> : <></>
                    }
                    {
                        category === 'Hair lighteners' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chMass} onChange={changeChMass}
                                           placeholder='Вага'
                                           className={chMass.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Henna, basma for hair' || category === 'Nail decor' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chMass} onChange={changeChMass}
                                               placeholder='Вага'
                                               className={chMass.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chColor} onChange={changeChColor}
                                               placeholder='Колір'
                                               className={chColor.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Nail scissors' || category === 'Nail clippers'
                                || category === 'Nail pushers' || category === 'Heel graters and saws'
                                || category === 'Nail files' || category === 'Pedicure accessories'
                                || category === 'Manicure and pedicure kits' || category === 'Bath and shower accessories' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </>
                                    :
                                    <></>
                    }
                    {
                        category === 'Nail care' || category === 'Solid dish soap' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCapacity} onChange={changeChCapacity}
                                           placeholder="Об'єм"
                                           className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chPurpose} onChange={changeChPurpose}
                                           placeholder='Призначення'
                                           className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Creams, lotions for the body' || category === 'Body care oils'
                            || category === 'Anti-cellulite remedies' || category === 'Hand care'
                            || category === 'Foot care' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCapacity} onChange={changeChCapacity}
                                               placeholder="Об'єм"
                                               className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chSkinType} onChange={changeChSkinType}
                                               placeholder='Тип шкіри'
                                               className={chSkinType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chTime} onChange={changeChTime}
                                               placeholder='Час застозування'
                                               className={chTime.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chPurpose} onChange={changeChPurpose}
                                               placeholder='Призначення'
                                               className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Hand antiseptics' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCapacity} onChange={changeChCapacity}
                                                   placeholder="Об'єм"
                                                   className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chTexture} onChange={changeChTexture}
                                                   placeholder='Текстура'
                                                   className={chTexture.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chAlcoholContent}
                                                   onChange={changeChAlcoholContent}
                                                   placeholder='Вміст алкоголю'
                                                   className={chAlcoholContent.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chFormat} onChange={changeChFormat}
                                                   placeholder='Формат'
                                                   className={chFormat.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </>
                                    :
                                    <></>
                    }
                    {
                        category === 'Liquid soap' || category === 'Shower gels for bath' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCapacity} onChange={changeChCapacity}
                                           placeholder="Об'єм"
                                           className={chCapacity.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chPurpose} onChange={changeChPurpose}
                                           placeholder='Призначення'
                                           className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBoxType} onChange={changeChBoxType}
                                           placeholder='Тип упаковки'
                                           className={chBoxType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Body scrubs' || category === 'Bath bombs and foams' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chMass} onChange={changeChMass}
                                               placeholder='Вага'
                                               className={chMass.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chPurpose} onChange={changeChPurpose}
                                               placeholder='Призначення'
                                               className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Shaving machines and cartridges' || category === 'Shaving cosmetics'
                                || category === 'Depilatory products' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chPurpose} onChange={changeChPurpose}
                                                   placeholder='Призначення'
                                                   className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chSkinType} onChange={changeChSkinType}
                                                   placeholder='Тип шкіри'
                                                   className={chSkinType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chGender} onChange={changeChGender}
                                                   placeholder='Стать'
                                                   className={chGender.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </>
                                    :
                                    <></>
                    }
                    {
                        category === 'Women deodorants, antiperspirants' || category === 'Men\'s deodorants, antiperspirants' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chPurpose} onChange={changeChPurpose}
                                           placeholder='Призначення'
                                           className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chFormat} onChange={changeChFormat}
                                           placeholder='Формат'
                                           className={chFormat.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chGender} onChange={changeChGender}
                                           placeholder='Стать'
                                           className={chGender.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Solar series SPF 30' || category === 'Solar series SPF 40'
                            || category === 'Solar series SPF 50' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chPurpose} onChange={changeChPurpose}
                                               placeholder='Призначення'
                                               className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chProtectionDegree}
                                               onChange={changeChProtectionDegree}
                                               placeholder='ступінь захисту'
                                               className={chProtectionDegree.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chAgeCategory} onChange={changeChAgeCategory}
                                               placeholder='Вікова категорія'
                                               className={chAgeCategory.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Solar series self tanning' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chPurpose} onChange={changeChPurpose}
                                                   placeholder='Призначення'
                                                   className={chPurpose.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chUsage} onChange={changeChUsage}
                                                   placeholder='Використання'
                                                   className={chUsage.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chAgeCategory} onChange={changeChAgeCategory}
                                                   placeholder='Вікова категорія'
                                                   className={chAgeCategory.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </>
                                    :
                                    <></>
                    }
                    {
                        category === 'Jewelry' || category === 'Hair accessories' ?
                            <>
                                <div className='logRegInput'>
                                    <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                           className={chType.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chMaterial} onChange={changeChMaterial}
                                           placeholder='Матеріал'
                                           className={chMaterial.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chColor} onChange={changeChColor}
                                           placeholder='Колір'
                                           className={chColor.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chStyle} onChange={changeChStyle}
                                           placeholder='Стиль'
                                           className={chStyle.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chBrand} onChange={changeChBrand}
                                           placeholder='Бренд'
                                           className={chBrand.length > 0 ? 'green' : 'red'}/>
                                </div>

                                <div className='logRegInput'>
                                    <input type="text" value={chCountry} onChange={changeChCountry}
                                           placeholder='Країна виробник'
                                           className={chCountry.length > 0 ? 'green' : 'red'}/>
                                </div>
                            </>
                            :
                            category === 'Makeup accessories' || category === 'Cosmetic bags' ?
                                <>
                                    <div className='logRegInput'>
                                        <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                               className={chType.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chMaterial} onChange={changeChMaterial}
                                               placeholder='Матеріал'
                                               className={chMaterial.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chColor} onChange={changeChColor}
                                               placeholder='Колір'
                                               className={chColor.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chBrand} onChange={changeChBrand}
                                               placeholder='Бренд'
                                               className={chBrand.length > 0 ? 'green' : 'red'}/>
                                    </div>

                                    <div className='logRegInput'>
                                        <input type="text" value={chCountry} onChange={changeChCountry}
                                               placeholder='Країна виробник'
                                               className={chCountry.length > 0 ? 'green' : 'red'}/>
                                    </div>
                                </>
                                :
                                category === 'Gift for her' || category === 'Gift for him' ?
                                    <>
                                        <div className='logRegInput'>
                                            <input type="text" value={chType} onChange={changeChType} placeholder='Вид'
                                                   className={chType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chUseType} onChange={changeChUseType}
                                                   placeholder='Тип використання'
                                                   className={chUseType.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chGender} onChange={changeChGender}
                                                   placeholder='Стать'
                                                   className={chGender.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chBrand} onChange={changeChBrand}
                                                   placeholder='Бренд'
                                                   className={chBrand.length > 0 ? 'green' : 'red'}/>
                                        </div>

                                        <div className='logRegInput'>
                                            <input type="text" value={chCountry} onChange={changeChCountry}
                                                   placeholder='Країна виробник'
                                                   className={chCountry.length > 0 ? 'green' : 'red'}/>
                                        </div>
                                    </>
                                    :
                                    <></>
                    }
                </div>
            </div>
            <div className={'addUserButtonHolder'}>
                <div className={'addUserButton'} onClick={addProductOnSite}>
                    Додати товар
                </div>
            </div>
        </div>
    )
}

export default AddProduct
import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import notification from "../grobalVariables/notificationArray";
import axios from "axios";
import stringify from "qs-stringify";
import Comment from "./comment";
import Characteristic from "./characteristic";
import {setResent} from "../redux/actions";

function Product({product, wl, rec, bs, update, count, updateCount, comp, recently}) {

    const dispatch = useDispatch();

    const [showDetails, setShowDetails] = useState(false)

    const [images, setImages] = useState(product.images.split(';'))

    const [currentImage, setCurrentImage] = useState(0)

    const [inWishList, setInWishList] = useState(false)

    const [inComparison, setInComparison] = useState(false)

    const [comment, setComment] = useState('')

    const [startCount, setStartCount] = useState(0)

    const firstNameState = useSelector(state => state.login.stateFirstName)

    const secondNameState = useSelector(state => state.login.stateSecondName)

    const admin = useSelector(state => state.admin.stateAdmin)

    const id = useSelector(state => state.login.stateUserId)

    const resent = useSelector(state => state.resentProd.stateRecent)

    const [comments, setComments] = useState([])

    const [shopStars, setShopStars] = useState([])

    const [heartChoosed, setHeartChoosed] = useState(false)

    const [comparisonChoosed, setComparisonChoosed] = useState(false)

    const [characteristics, setCharacteristics] = useState(<></>)

    const [pr, setPr] = useState(product.number)

    const [recommendation, setRecommendation] = useState(<></>)

    const [inBasket, setInBasket] = useState(false)

    const [number, setNumber] = useState(1)

    function changeShowDetails() {
        if(!showDetails){
            let r = resent
            if(r.length === 10){
                r.shift()
            }
            let counter = 0
            if(r.length > 0) {
                r.forEach((data) => {
                    if(data.id === product.id){
                        r.splice(counter, 1)
                    }
                    counter++
                })
            }
            r.push(product)
            dispatch(setResent({resent: r}))
            console.log('dsa')
        }
        setShowDetails(!showDetails)
    }

    function upNumber(e) {
        e.stopPropagation();
        if (number + 1 <= pr) {
            setNumber(number + 1)
            changeNumber(number + 1)
        }
    }

    function downNumber(e) {
        e.stopPropagation();
        if (number - 1 >= 1) {
            setNumber(number - 1)
            changeNumber(number - 1)
        }
    }

    function nextimage() {
        if (currentImage + 1 < images.length) {
            setCurrentImage(currentImage + 1)
        }
    }

    function previosimage() {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1)
        }
    }

    function changeComment(event) {
        setComment(event.target.value)
    }

    function changeHeart(e) {
        e.stopPropagation();
        if (String(id) === product.shopID) {
            notification.addNotification({type: 'warning', name: 'Це ваш товар'})
        } else if (admin === 'true') {
            notification.addNotification({type: 'warning', name: 'Вибачте але адміністратор не може тодавати товар у список бажань'})
        } else {
            if (heartChoosed === false) {
                addToWishList()
            }
            if (heartChoosed === true) {
                removeFromWishList()
            }
            setHeartChoosed(!heartChoosed)
        }
    }

    function changeComparison(e) {
        e.stopPropagation();
        if (String(id) === product.shopID) {
            notification.addNotification({type: 'warning', name: 'Це ваш продукт'})
        } else if (admin === 'true') {
            notification.addNotification({type: 'warning', name: 'Вибачте але адміністратор не може тодавати товар у порівняння'})
        } else {
            if (comparisonChoosed === false) {
                addToComparison()
                setInComparison(true)
            }
            if (comparisonChoosed === true) {
                removeFromComparison()
                setInComparison(false)
            }
            setComparisonChoosed(!comparisonChoosed)
        }
    }

    function addToCart(e) {
        e.stopPropagation()
        addToBasket()
    }

    function inCart(e) {
        e.stopPropagation()
    }

    function removeBasket(e) {
        e.stopPropagation()
        removeFromBasket()
    }

    async function addComment() {
        if (!comment) {
            notification.addNotification({type: 'warning', name: 'Напишіть коментар'})
        } else {
            await axios({
                method: "post",
                url: "http://localhost:3000/comment/create",
                data: stringify({
                    stars: startCount,
                    comment: comment,
                    senderName: firstNameState + " " + secondNameState,
                    productId: product.id,
                    shopId: product.shopID
                })
            }).then(function (response) {
                if (response.data !== '') {
                    setComment('')
                    setStartCount(0)
                    getAllComments()
                    getAllStars()
                    notification.addNotification({type: 'success', name: 'Ви залишили коментар'})
                }
            }).catch(function (error) {
                console.log(error)
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    async function getAllComments() {

        await axios({
            method: "get",
            url: "http://localhost:3000/comment/findAll/" + product.id
        }).then(function (response) {
            if (response.data.length > 0) {
                setComments(response.data)
            } else setComments([])
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function getAllStars() {

        await axios({
            method: "get",
            url: "http://localhost:3000/comment/findShop/" + product.shopID
        }).then(function (response) {
            if (response.data.length > 0) {
                let counter = 0
                let starsSh = 0
                response.data.forEach((elem) => {
                    starsSh = starsSh + Number(elem.stars)
                    if (elem.stars !== '0') {
                        counter++
                    }
                })
                let res = starsSh / counter
                setShopStars(res)
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function addToWishList() {

        await axios({
            method: "post",
            url: "http://localhost:3000/wishList/create",
            data: stringify({
                productId: product.id,
                product: JSON.stringify(product),
                userId: id
            })
        }).then(function (response) {
            if (response.data !== '') {
                notification.addNotification({type: 'success', name: 'Ви добавили товар у список бажань'})
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function addToComparison() {

        await axios({
            method: "post",
            url: "http://localhost:3000/comparison/create",
            data: stringify({
                productId: product.id,
                product: JSON.stringify(product),
                userId: id,
                categoryId: product.category
            })
        }).then(function (response) {
            if (response.data !== '') {
                notification.addNotification({type: 'success', name: 'Ви додали товар у порівняння'})
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function addToBasket() {

        if (String(id) === product.shopID) {
            notification.addNotification({type: 'warning', name: 'Це ваш товар'})
        } else if (admin === 'true') {
            notification.addNotification({type: 'warning', name: 'Вибачте але адміністратор не може тодавати товар у кошик'})
        } else {

            await axios({
                method: "post",
                url: "http://localhost:3000/basket/create",
                data: stringify({
                    productId: product.id,
                    product: JSON.stringify(product),
                    userId: id
                })
            }).then(function (response) {
                if (response.data !== '') {
                    setInBasket(true)
                    notification.addNotification({type: 'success', name: 'Ви додаєте товар у кошик'})
                }
            }).catch(function (error) {
                console.log(error)
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            });
        }
    }

    async function removeFromWishList() {

        await axios({
            method: "patch",
            url: "http://localhost:3000/wishList/disable/" + product.id + "&" + id
        }).then(function (response) {
            if (response.data !== '') {
                setInWishList(false)
                notification.addNotification({type: 'success', name: 'You remove product from wish list'})
                if (wl) {
                    update()
                }
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Server did not response'})
        });
    }

    async function removeFromComparison() {

        await axios({
            method: "patch",
            url: "http://localhost:3000/comparison/disable/" + product.id + "&" + id
        }).then(function (response) {
            if (response.data !== '') {
                setInComparison(false)
                notification.addNotification({type: 'success', name: 'Ви забрали товар з порівняння'})
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function removeFromBasket() {

        await axios({
            method: "patch",
            url: "http://localhost:3000/basket/disable/" + product.id + "&" + id
        }).then(function (response) {
            if (response.data !== '') {
                setInBasket(false)
                update()
                notification.addNotification({type: 'success', name: 'Ви забрали товар з кошику'})
            }
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function findIfInWishList() {

        await axios({
            method: "get",
            url: "http://localhost:3000/wishList/findPr/" + id + '&' + product.id
        }).then(function (response) {
            if (response.data.length > 0) {
                setHeartChoosed(true)
                setInWishList(true)
            }
        }).catch(function (error) {
            if (id) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            }
        });
    }

    async function findIfInComparison() {

        await axios({
            method: "get",
            url: "http://localhost:3000/comparison/findPr/" + id + '&' + product.id
        }).then(function (response) {
            if (response.data.length > 0) {
                setComparisonChoosed(true)
                setInComparison(true)
            }
        }).catch(function (error) {
            if (id) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            }
        });
    }

    async function findIfInBasket() {

        await axios({
            method: "get",
            url: "http://localhost:3000/basket/findPr/" + id + '&' + product.id
        }).then(function (response) {
            if (response.data.length > 0) {
                setInBasket(true)
            }
        }).catch(function (error) {
            if (id) {
                notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
            }
        });
    }

    async function getProduct() {
        await axios({
            method: "get",
            url: "http://localhost:3000/product/get/" + product.id,
        }).then(function (response) {
            let res = response.data[0]
            setPr(res.number)
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function getRecommendation() {
        await axios({
            method: "get",
            url: "http://localhost:3000/product/recommendation/" + product.category,
        }).then(function (response) {
            if (response.data.length > 0) {
                const productss = []
                response.data.forEach(data => {
                    if (data.id !== product.id) {
                        productss.push(<Product product={data} wl={false} rec={true}/>)
                    }
                })
                setRecommendation(productss)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    async function changeNumber(num) {

        await axios({
            method: "patch",
            url: "http://localhost:3000/basket/number/" + product.id + "&" + id + "&" + num
        }).then(function (response) {
            updateCount(num + 9999999999)
        }).catch(function (error) {
            console.log(error)
            notification.addNotification({type: 'error', name: 'Сервер не відповідає'})
        });
    }

    useEffect(() => {
        getAllComments()
        getAllStars()
        getRecommendation()
    }, [showDetails])

    useEffect(() => {
        findIfInWishList()
        findIfInBasket()
        findIfInComparison()
        if (count) {
            setNumber(count)
        }
        if (wl || bs) {
            getProduct()
        }
        const chArr = []
        for (const [key, value] of Object.entries(JSON.parse(product.charecteristics))) {
            let parameter
            if (key === 'type') {
                parameter = 'Вид'
            }
            if (key === 'useType') {
                parameter = 'Тип користування'
            }
            if (key === 'gender') {
                parameter = 'Стать'
            }
            if (key === 'brand') {
                parameter = 'Бренд'
            }
            if (key === 'country') {
                parameter = 'Країна виробник'
            }
            if (key === 'material') {
                parameter = 'Матеріал'
            }
            if (key === 'color') {
                parameter = 'Колір'
            }
            if (key === 'style') {
                parameter = 'Стиль'
            }
            if (key === 'usage') {
                parameter = 'Використання'
            }
            if (key === 'ageCategory') {
                parameter = 'Вікова категорія'
            }
            if (key === 'purpose') {
                parameter = 'Призначення'
            }
            if (key === 'protectionDegree') {
                parameter = 'Ступінь захисту'
            }
            if (key === 'format') {
                parameter = 'Формат'
            }
            if (key === 'skinType') {
                parameter = 'Тип шкіри'
            }
            if (key === 'mass') {
                parameter = 'Вага'
            }
            if (key === 'capacity') {
                parameter = 'Обєм'
            }
            if (key === 'boxType') {
                parameter = 'Тип упаковки'
            }
            if (key === 'texture') {
                parameter = 'Текстура'
            }
            if (key === 'alcoholContent') {
                parameter = 'Вміст алкоголю'
            }
            if (key === 'usageTime') {
                parameter = 'Тип використання'
            }
            if (key === 'fixationDegree') {
                parameter = 'Ступінь фіксації'
            }
            if (key === 'hairType') {
                parameter = 'Тип волосся'
            }
            if (key === 'count') {
                parameter = 'Кількість'
            }
            if (key === 'effect') {
                parameter = 'Еффект'
            }
            if (key === 'coverage') {
                parameter = 'Покриття'
            }
            if (key === 'scent') {
                parameter = 'Запах'
            }
            let char = {
                key: parameter,
                value: value
            }
            chArr.push(<Characteristic char={char} comp={comp}/>)
        }
        setCharacteristics(chArr)
    }, [])

    return (
        <>
            {bs ?
                <div className={'basketProduct'} onClick={changeShowDetails}>
                    <div className={'basketPhotoName'}>
                        <div className={'basketImageHolder'}>
                            <img src={images[0]} alt={product.name} className={'productImage'}/>
                        </div>
                        <div className={'basketName'}>
                            {product.name}
                        </div>
                    </div>
                    <div className={'basketAddDelete'}>
                        <div className={'basketPlusMinus'}>
                            <div className={'basketPlusMinusButton'} onClick={downNumber}>
                                <BsIcons.BsPatchMinusFill/>
                            </div>
                            {number}
                            <div className={'basketPlusMinusButton'} onClick={upNumber}>
                                <BsIcons.BsPatchPlusFill/>
                            </div>
                        </div>
                        <div className={'basketPrice'}>
                            {Number(product.price) * number} ₴
                        </div>
                        <div className={'basketRemove'} onClick={removeBasket}>
                            <BsIcons.BsTrashFill/>
                        </div>
                    </div>
                </div>
                :
                comp ?
                    <div className={'compareProduct'}>
                        <div className={'productBlcComp'}>

                            {heartChoosed ?
                                <BsIcons.BsSuitHeartFill className={'heartProductListFill'} onClick={changeHeart}/> :
                                <BsIcons.BsSuitHeart className={'heartProductList'} onClick={changeHeart}/>}

                            {comparisonChoosed ?
                                <RiIcons.RiScales3Line className={'comparisonProductListFill'}
                                                       onClick={changeComparison}/> :
                                <RiIcons.RiScales3Line className={'comparisonProductList'} onClick={changeComparison}/>}

                            <div className={'productImageHolder'}>
                                <img src={images[0]} alt={product.name} className={'productImage'}/>
                            </div>
                            <div className={'productNameHolder'} title={product.name}>
                                {product.name.length > 100 ? product.name.slice(0, 100) + ".." : product.name}
                            </div>
                            <div className={'productPriceAndCart'}>
                                {pr === '0' ?
                                    <div className={'productPrice'}>Закінчився</div>
                                    :
                                    <div className={'productPrice'}>{product.price} ₴</div>
                                }
                                {inBasket ?
                                    <div className={'productCartButtonCom'} onClick={inCart}>In
                                        Cart <BsIcons.BsCartCheckFill
                                            className='profileIcon'
                                            style={{fontSize: '20px'}}/>
                                    </div>
                                    :
                                    pr === '0' ?
                                        <div className={'productCartButtonCom'} onClick={inCart}>Закінчився</div>
                                        :
                                        <div className={'productCartButtonCom'} onClick={addToCart}><BsIcons.BsFillCartPlusFill
                                                className='profileIcon'
                                                style={{fontSize: '20px'}}/>
                                        </div>
                                }
                            </div>

                        </div>

                        <div className={'detailsCharacteristicsComp'}>
                            Характеристики:
                            <div className={'detailsCharacteristicBoxComp'}>
                                {characteristics}
                            </div>
                        </div>

                    </div>
                    :
                    <div className={wl ? 'productBlcWL' : rec ? 'productBlcREC' : recently ? 'productBlcRecent' : 'productBlc'}
                         onClick={changeShowDetails}>

                        {heartChoosed ?
                            <BsIcons.BsSuitHeartFill className={'heartProductListFill'} onClick={changeHeart}/> :
                            <BsIcons.BsSuitHeart className={'heartProductList'} onClick={changeHeart}/>}

                        {comparisonChoosed ?
                            <RiIcons.RiScales3Line className={'comparisonProductListFill'}
                                                   onClick={changeComparison}/> :
                            <RiIcons.RiScales3Line className={'comparisonProductList'} onClick={changeComparison}/>}

                        <div className={'productImageHolder'}>
                            <img src={images[0]} alt={product.name} className={'productImage'}/>
                        </div>
                        <div className={'productNameHolder'} title={product.name}>
                            {product.name.length > 100 ? product.name.slice(0, 100) + ".." : product.name}
                        </div>
                        <div className={'productPriceAndCart'}>
                            {pr === '0' ?
                                <div className={'productPrice'}>Закінчився</div>
                                :
                                <div className={'productPrice'}>{product.price} ₴</div>
                            }
                            {inBasket ?
                                <div className={'productCartButton'} onClick={inCart}>В кошику <BsIcons.BsCartCheckFill
                                    className='profileIcon'
                                    style={{fontSize: '20px'}}/>
                                </div>
                                :
                                pr === '0' ?
                                    <div className={'productCartButton'} onClick={inCart}>Закінчився</div>
                                    :
                                    <div className={'productCartButton'} onClick={addToCart}>Купити <BsIcons.BsFillCartPlusFill
                                            className='profileIcon'
                                            style={{fontSize: '20px'}}/>
                                    </div>
                            }
                        </div>

                    </div>
            }
            {showDetails ? <div className={'detailsBackgroundHandle'}>

                <div className={'detailsBlock'}>

                    <div className={'detailsHandle'}>

                        <div className={'detailsPhotos'}>

                            <div className={'detailsPhoto'}>
                                <img src={images[currentImage]} alt={product.name} className={'detailsImage'}/>
                            </div>

                            <div className={'detailsPhotoChanger'}>
                                <div className={'previousImage'} onClick={previosimage}><BsIcons.BsCaretLeftFill
                                    className='profileIcon' style={{fontSize: '34px'}}/></div>
                                <div className={'point'}>{images.map((elem, i) => {
                                    return <div className={'dotsImages'} onClick={() => setCurrentImage(i)}>
                                        <BsIcons.BsFillCircleFill style={i === currentImage ? {
                                            fontSize: '24px',
                                            color: 'gray'
                                        } : {fontSize: '18px', color: 'lightgray'}}/></div>
                                })}</div>
                                <div className={'nextImage'} onClick={nextimage}><BsIcons.BsCaretRightFill
                                    className='profileIcon' style={{fontSize: '34px'}}/></div>
                            </div>
                        </div>

                        <div className={'detailsHandleInfo'}>

                            <div className={'detailsName'}>
                                <div style={{margin: '14px'}}>{product.name}</div>
                            </div>


                            <div className={'detailsCharacteristics'}>
                                Характеристики:
                                <div className={'detailsCharacteristicBox'}>
                                    {characteristics}
                                </div>
                            </div>

                            <div className={'detailsShop'}>
                                <div className={'detailsShopText'}>
                                    Продавець: {product.shopName}
                                </div>
                                <div className={'shopStarts'}>
                                    {shopStars > 0 ? shopStars < 0.5 ? <BsIcons.BsStarHalf className={'starFill'}/> :
                                            <BsIcons.BsStarFill className={'starFill'}/> :
                                        <BsIcons.BsStar className={'starEmpty'}/>}
                                    {shopStars > 1 ? shopStars < 1.5 ? <BsIcons.BsStarHalf className={'starFill'}/> :
                                            <BsIcons.BsStarFill className={'starFill'}/> :
                                        <BsIcons.BsStar className={'starEmpty'}/>}
                                    {shopStars > 2 ? shopStars < 2.5 ? <BsIcons.BsStarHalf className={'starFill'}/> :
                                            <BsIcons.BsStarFill className={'starFill'}/> :
                                        <BsIcons.BsStar className={'starEmpty'}/>}
                                    {shopStars > 3 ? shopStars < 3.5 ? <BsIcons.BsStarHalf className={'starFill'}/> :
                                            <BsIcons.BsStarFill className={'starFill'}/> :
                                        <BsIcons.BsStar className={'starEmpty'}/>}
                                    {shopStars > 4 ? shopStars < 4.5 ? <BsIcons.BsStarHalf className={'starFill'}/> :
                                            <BsIcons.BsStarFill className={'starFill'}/> :
                                        <BsIcons.BsStar className={'starEmpty'}/>}
                                </div>
                            </div>

                            <div className={'detailsButtons'}>
                                {pr === '0' ?
                                    <div className={'detailsPrise'}>Закінчився</div>
                                    :
                                    <div className={'detailsPrise'}>Ціна: {product.price}₴</div>
                                }
                                <div className={'detailsBtns'}>
                                    {inBasket ?
                                        <div className={'detailsBuyButton'} onClick={inCart}>В кошику</div>
                                        :
                                        <div className={'detailsBuyButton'} onClick={addToCart} style={pr === '0' ? {
                                            pointerEvents: 'none',
                                            background: 'darkgrey'
                                        } : {}}>Купити</div>
                                    }
                                    {inWishList ?
                                        <div className={'detailsHeartReady'} onClick={() => {
                                            removeFromWishList()
                                            setHeartChoosed(false)
                                        }}><BsIcons.BsFillHeartFill/></div>
                                        :
                                        <div className={'detailsHeart'} onClick={() => {
                                            if (String(id) === product.shopID) {
                                                notification.addNotification({
                                                    type: 'warning',
                                                    name: 'Це ваш продукт'
                                                })
                                            } else if (admin === 'true') {
                                                notification.addNotification({
                                                    type: 'warning',
                                                    name: 'Вибачте але адміністратор не може тодавати товар у список бажань'
                                                })
                                            } else {
                                                setInWishList(true)
                                                addToWishList()
                                                setHeartChoosed(true)
                                            }
                                        }}>
                                            <BsIcons.BsFillHeartFill/></div>
                                    }
                                    {inComparison ?
                                        <div className={'detailsBalancerReady'} onClick={() => {
                                            removeFromComparison()
                                            setComparisonChoosed(false)
                                        }}><RiIcons.RiScales3Line/></div>
                                        :
                                        <div className={'detailsBalancer'} onClick={() => {
                                            if (String(id) === product.shopID) {
                                                notification.addNotification({
                                                    type: 'warning',
                                                    name: 'Це ваш продукт'
                                                })
                                            } else if (admin === 'true') {
                                                notification.addNotification({
                                                    type: 'warning',
                                                    name: 'Вибачте але адміністратор не може тодавати товар у порівняння'
                                                })
                                            } else {
                                                setInComparison(true)
                                                addToComparison()
                                                setComparisonChoosed(true)
                                            }
                                        }}>
                                            <RiIcons.RiScales3Line/></div>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className={'detailsRecommendation'}>
                        <div className={'detailsInfoHeader'}>Рекомендації:</div>
                        <div className={'detailsRecommendationProducts'}>{recommendation}</div>

                    </div>

                    <div className={'detailsInfo'}>
                        <div className={'detailsInfoHeader'}>Опис товару:</div>
                        <div className={'detailsInfoInfo'}>{product.about}</div>
                    </div>

                    <div className={'detailsComments'}>
                        <div className={'detailsCommentsTitle'}>Переглянути коментарі</div>
                        <div className={'detailsCommentsHandle'}>
                            {comments.length === 0 ?
                                <div>Коментарів немає</div>
                                :
                                comments.map(comm => {
                                    return <Comment comment={comm}/>
                                })}
                        </div>
                        <div className={'detailsCommentsTitle'}>Залишити коментар</div>
                        <div className={'detailsCommentsStars'}>
                            {startCount > 0 ? <BsIcons.BsStarFill className={'starLeaveCommentFill'}
                                                                  onClick={() => setStartCount(1)}/> :
                                <BsIcons.BsStar className={'starLeaveCommentEmpty'} onClick={() => setStartCount(1)}/>}
                            {startCount > 1 ? <BsIcons.BsStarFill className={'starLeaveCommentFill'}
                                                                  onClick={() => setStartCount(2)}/> :
                                <BsIcons.BsStar className={'starLeaveCommentEmpty'} onClick={() => setStartCount(2)}/>}
                            {startCount > 2 ? <BsIcons.BsStarFill className={'starLeaveCommentFill'}
                                                                  onClick={() => setStartCount(3)}/> :
                                <BsIcons.BsStar className={'starLeaveCommentEmpty'} onClick={() => setStartCount(3)}/>}
                            {startCount > 3 ? <BsIcons.BsStarFill className={'starLeaveCommentFill'}
                                                                  onClick={() => setStartCount(4)}/> :
                                <BsIcons.BsStar className={'starLeaveCommentEmpty'} onClick={() => setStartCount(4)}/>}
                            {startCount > 4 ? <BsIcons.BsStarFill className={'starLeaveCommentFill'}
                                                                  onClick={() => setStartCount(5)}/> :
                                <BsIcons.BsStar className={'starLeaveCommentEmpty'} onClick={() => setStartCount(5)}/>}
                        </div>
                        <div className={'detailsCommentsLeave'}>
                            <div className='detailsInput'>
                                <input type="text" value={comment} onChange={changeComment} placeholder='Ваш коментар'
                                       className={comment.length > 0 ? 'green' : 'red'}/>
                            </div>
                            <div className={'detailsCommentsLeaveButton'} onClick={addComment}>
                                <BsIcons.BsFillCursorFill/></div>
                        </div>
                    </div>

                </div>

                <div className={'detailsClose'} onClick={changeShowDetails}><BsIcons.BsXCircleFill/></div>

            </div> : <></>}
        </>
    )
}

export default Product
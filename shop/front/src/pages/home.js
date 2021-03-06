import React from "react";
import '../index.css'
import * as BsIcons from 'react-icons/bs'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import LogRegForm from "../components/logRegForm";
import LoginedForm from "../components/loginedForm";
import SearchForm from "../components/searchForm";
import axios from "axios";
import Page from "../components/page";
import ProductInfoController from "../components/productInfoController";
import notification from "../grobalVariables/notificationArray";
import Product from "../components/product";
import stringify from "qs-stringify";
import resent from "../redux/reducers/resent";
import resentProd from "../redux/reducers/resent";
import {setShop} from "../redux/actions";

function Home() {

    const [profileLeft, setProfileLeft] = useState(false)

    const loginState = useSelector(state => state.login.stateUserLogin)

    const [products, setProducts] = useState(<></>)

    const [offset, setOffset] = useState(0)

    const [page, setPage] = useState(0)

    const [pages, setPages] = useState([])

    const pageLimit = 20

    const [pagesN, setPagesN] = useState(0)

    const [searchObj, setSearchObj] = useState('')

    const [weFindSomething, setWeFindSomething] = useState(false)

    const [showCategoryList, setShowCategoryList] = useState(false)

    const [shoWBig1, setShowBig1] = useState(false)

    const [shoWBig2, setShowBig2] = useState(false)

    const [shoWBig3, setShowBig3] = useState(false)

    const [shoWBig4, setShowBig4] = useState(false)

    const [shoWBig5, setShowBig5] = useState(false)

    const [shoWBig6, setShowBig6] = useState(false)

    const [shoWBig7, setShowBig7] = useState(false)

    const [showMiddle1, setShowMiddle1] = useState(false)

    const [showMiddle2, setShowMiddle2] = useState(false)

    const [showMiddle3, setShowMiddle3] = useState(false)

    const [showMiddle4, setShowMiddle4] = useState(false)

    const [showMiddle5, setShowMiddle5] = useState(false)

    const [showMiddle6, setShowMiddle6] = useState(false)

    const [showMiddle7, setShowMiddle7] = useState(false)

    const [showMiddle8, setShowMiddle8] = useState(false)

    const [showMiddle9, setShowMiddle9] = useState(false)

    const [showMiddle10, setShowMiddle10] = useState(false)

    const [showMiddle11, setShowMiddle11] = useState(false)

    const [showMiddle12, setShowMiddle12] = useState(false)

    const [showMiddle13, setShowMiddle13] = useState(false)

    const [showMiddle14, setShowMiddle14] = useState(false)

    const [showMiddle15, setShowMiddle15] = useState(false)

    const [category, setCategory] = useState('no')

    const [categoryTXT, setCategoryTXT] = useState('?????? ??????????????????')

    const [minPrice, setMinPrice] = useState(0)

    const [maxPrice, setMaxPrice] = useState(99999)

    const resent = useSelector(state => state.resentProd.stateRecent)

    const [resentProducts, setRecentProducts] = useState([])

    const [interestProducts, setInterestProducts] = useState([])

    const [mostBuyed, setMostBuyed] = useState([])


    const dispatch = useDispatch();

    function moveProfileLeft() {
        setProfileLeft(!profileLeft)
    }

    function setTextCategory(txt) {
        setShowCategoryList(false)
        setCategory(txt)
    }

    function setTXTCategory(txt) {
        setCategoryTXT(txt)
    }

    function changePageTo(data) {
        setPage(data)
    }

    function changeSearchObj(event) {
        setSearchObj(event.target.value)
    }

    function changeMinPrice(event) {
        if (event.target.value > -1 && event.target.value <= 99999) {
            setMinPrice(event.target.value)
        }
    }

    function changeMaxPrice(event) {
        if (event.target.value > -1 && event.target.value <= 99999) {
            setMaxPrice(event.target.value)
        }
    }

    async function getInterests() {
        await axios({
            method: "get",
            url: "http://localhost:3000/product/interests",
        }).then(function (response) {
            if (response.data.length > 0) {
                const productss = []
                response.data.forEach(data => {

                    productss.push(<Product product={data}/>)

                })
                setInterestProducts(productss)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: '???????????? ???? ????????????????????'})
        });
    }

    async function getMostBuyed() {
        await axios({
            method: "get",
            url: "http://localhost:3000/product/mostBuyed",
        }).then(function (response) {
            if (response.data.length > 0) {
                const productss = []
                response.data.forEach(data => {

                    productss.push(<Product product={data} recently={true}/>)

                })
                setMostBuyed(productss)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: '???????????? ???? ????????????????????'})
        });
    }

    const id = useSelector(state => state.login.stateUserId)

    async function getId() {
        await axios({
            method: "get",
            url: "http://localhost:3000/user/get/" + id,
        }).then(function (response) {
            if (response.data.length > 0) {
                if (response.data[0].isShop === true) {
                    dispatch(setShop({isShop: 'true', shopName: response.data[0].shopName}))
                }
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: '???????????? ???? ????????????????????'})
        });
    }

    async function getProducts() {
        await axios({
            method: "get",
            url: "http://localhost:3000/product/getAll" + pageLimit + '&' + offset,
        }).then(function (response) {
            console.log(response)
            if (response.data.rows.length > 0) {
                let usersNumber = response.data.count
                let pagesNumber = 0
                const pagesBefore = []
                do {
                    usersNumber = usersNumber - pageLimit
                    pagesBefore.push(<Page number={pagesNumber} page={page}
                                           changePage={(data) => changePageTo(data)}/>)
                    pagesNumber++
                } while (usersNumber > 0)
                setPagesN(pagesNumber - 1)
                setPages(pagesBefore)
                const productss = []
                const productres = []
                let countProducts = 0
                response.data.rows.forEach(data => {
                    productss.push(<Product product={data}/>)
                    countProducts++
                    if (countProducts === 4) {
                        const a = <div className={'productLn'}>{productss.map(data => {
                            return data
                        })}</div>
                        productres.push(a)
                        productss.length = 0
                        countProducts = 0
                    }
                })
                if (productss.length > 0) {
                    const a = <div className={'productLn'}>{productss.map(data => {
                        return data
                    })}</div>
                    productres.push(a)
                }
                setProducts([])
                setProducts(productres)
            }
        }).catch(function (error) {
            notification.addNotification({type: 'error', name: '???????????? ???? ????????????????????'})
        });
    }

    async function searchProducts() {
        if (searchObj === '' && category === 'no' && (minPrice === 0 || minPrice === '0') && (maxPrice === 99999 || maxPrice === '99999')) {
            getProducts()
            setWeFindSomething(false)
        } else {
            let searchObj11 = searchObj
            if (searchObj11 === '') {
                searchObj11 = 'asdasdasdasdasdasdasdasdasdasdasd'
            }
            await axios({
                method: "get",
                url: "http://localhost:3000/product/searchHome/" + 'name' + '/&' + searchObj11 + '/&' + category + '/&' + Number(minPrice) + '/&' + Number(maxPrice) + '/&' + pageLimit + '/&' + offset,
            }).then(function (response) {
                console.log(response)
                if (response.data.rows.length > 0) {
                    setWeFindSomething(true)
                    let usersNumber = response.data.count
                    let pagesNumber = 0
                    const pagesBefore = []
                    do {
                        usersNumber = usersNumber - pageLimit
                        pagesBefore.push(<Page number={pagesNumber} page={page}
                                               changePage={(data) => changePageTo(data)}/>)
                        pagesNumber++
                    } while (usersNumber > 0)
                    setPagesN(pagesNumber - 1)
                    setPages(pagesBefore)
                    const productss = []
                    const productres = []
                    let countProducts = 0
                    response.data.rows.forEach(data => {
                        productss.push(<Product product={data}/>)
                        countProducts++
                        if (countProducts === 4) {
                            const a = <div className={'productLn'}>{productss.map(data => {
                                return data
                            })}</div>
                            productres.push(a)
                            productss.length = 0
                            countProducts = 0
                        }
                    })
                    if (productss.length > 0) {
                        const a = <div className={'productLn'}>{productss.map(data => {
                            return data
                        })}</div>
                        productres.push(a)
                    }
                    setProducts([])
                    setProducts(productres)
                } else {
                    notification.addNotification({type: 'warning', name: '?????????? ??????????'})
                }
            }).catch(function (error) {
                console.log(error)
                notification.addNotification({type: 'error', name: '???????????? ???? ????????????????????'})
            })
        }
        ;
    }

    useEffect(() => {
        getId()
        getInterests()
        getProducts()
        getMostBuyed()
    }, [])

    useEffect(() => {
        const array = []
        resent.forEach(data => {
            array.push(<Product product={data} recently={true}/>)
        })
        setRecentProducts([])
        setRecentProducts(array)
    }, [resent])

    useEffect(() => {
        getProducts()
    }, [loginState])

    useEffect(() => {
        setOffset(pageLimit * page)
        console.log("PAGE")
    }, [page])

    useEffect(() => {
        console.log('OFF')
        getProducts()
    }, [offset])

    useEffect(() => {
        searchProducts()
    }, [category, minPrice, maxPrice, searchObj, categoryTXT])

    return (
        <div className={'home'}>
            <div className={'header'}>
                <div className={'italicFont'}>Moonlight</div>

                <div className={profileLeft ? 'profile lefter' : 'profile'}>
                    <div className={'profileIconBox'} onClick={() => moveProfileLeft()}>
                        {profileLeft ?
                            <BsIcons.BsXCircleFill className='profileIcon'/> :
                            <BsIcons.BsFillPersonFill className='profileIcon'/>}
                    </div>

                    {loginState ? <LoginedForm/> : <LogRegForm/>}

                </div>
            </div>

            <div className={'homeProductAndFilter'}>
                <div style={{width: '100%', height: '5%', display: 'flex', alignItems: 'center'}}>
                    <div className={'showCategories'} onClick={() => {
                        setShowCategoryList(!showCategoryList)
                    }}><BsIcons.BsSortDown style={{marginRight: '8px'}}/>???????????? ??????????????????
                    </div>
                    <div style={{marginLeft: '10px', display: 'flex', alignItems: 'center', fontSize: '18px'}}>
                        {categoryTXT === '?????? ??????????????????' ? '?????? ??????????????????' : <>{categoryTXT}<BsIcons.BsXCircleFill
                            className={'closeCategory'} onClick={() => {
                            setCategoryTXT('?????? ??????????????????')
                            setCategory('no')
                        }}/></>}
                    </div>
                </div>

                {showCategoryList ? <div className={'categoryBlock'}>
                    {
                        shoWBig1 ?
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                   onClick={() => setShowBig1(!shoWBig1)}/>
                                    <div onClick={() => {
                                        setTextCategory('Women\'s perfumery,Men\'s perfumery,Unisex perfumery,Solid perfumes,Shower gels,Body creams,Body lotions,Body oils,Soap,Perfume gift sets for her,Perfume gift sets for him,Perfume gift sets unisex perfume')
                                        setTXTCategory('????????????????????')
                                    }} className={'hoverText'}> ????????????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Women\'s perfumery')
                                             setTXTCategory('???????????? ????????????????????')
                                         }}> ???????????? ????????????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Men\'s perfumery')
                                             setTXTCategory('???????????????? ????????????????????')
                                         }}> ???????????????? ????????????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Unisex perfumery')
                                             setTXTCategory('???????????????????? ??????????????')
                                         }}> ???????????????????? ??????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Solid perfumes')
                                             setTXTCategory('???????????? ??????????????')
                                         }}> ???????????? ??????????????
                                    </div>
                                </div>
                                {showMiddle1 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                           onClick={() => setShowMiddle1(!showMiddle1)}/>
                                            <div onClick={() => {
                                                setTextCategory('Shower gels,Body creams,Body lotions,Body oils,Soap')
                                                setTXTCategory('???????????????????????? ????????????')
                                            }} className={'hoverText'}> ???????????????????????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Shower gels')
                                                     setTXTCategory('???????? ?????? ????????')
                                                 }}> ???????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Body creams')
                                                     setTXTCategory('?????????? ?????? ????????')
                                                 }}> ?????????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Body lotions')
                                                     setTXTCategory('???????????????? ?????? ????????')
                                                 }}> ???????????????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Body oils')
                                                     setTXTCategory('???????? ?????? ????????')
                                                 }}> ???????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Soap')
                                                     setTXTCategory('????????')
                                                 }}> ????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle1(!showMiddle1)}/>
                                            <div onClick={() => {
                                                setTextCategory('Shower gels,Body creams,Body lotions,Body oils,Soap')
                                                setTXTCategory('???????????????????????? ????????????')
                                            }} className={'hoverText'}> ???????????????????????? ????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle2 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                           onClick={() => setShowMiddle2(!showMiddle2)}/>
                                            <div onClick={() => {
                                                setTextCategory('Perfume gift sets for her,Perfume gift sets for him,Perfume gift sets unisex perfume ')
                                                setTXTCategory('?????????????????????? ????????????')
                                            }} className={'hoverText'}> ?????????????????????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory("Perfume gift sets for her")
                                                     setTXTCategory('?????? ??????')
                                                 }}> ?????? ??????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Perfume gift sets for him')
                                                     setTXTCategory('?????? ??????????')
                                                 }}> ?????? ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Perfume gift sets unisex perfume')
                                                     setTXTCategory('??????????????')
                                                 }}> ??????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle2(!showMiddle2)}/>
                                            <div onClick={() => {
                                                setTextCategory('Perfume gift sets for her,Perfume gift sets for him,Perfume gift sets unisex perfume ')
                                                setTXTCategory('?????????????????????? ????????????')
                                            }} className={'hoverText'}> ?????????????????????? ????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            :

                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                  onClick={() => setShowBig1(!shoWBig1)}/>
                                    <div onClick={() => {
                                        setTextCategory('Women\'s perfumery,Men\'s perfumery,Unisex perfumery,Solid perfumes,Shower gels,Body creams,Body lotions,Body oils,Soap,Perfume gift sets for her,Perfume gift sets for him,Perfume gift sets unisex perfume')
                                        setTXTCategory('????????????????????')
                                    }} className={'hoverText'}> ????????????????????
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        shoWBig2 ?
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                   onClick={() => setShowBig2(!shoWBig2)}/>
                                    <div onClick={() => {
                                        setTextCategory('Mascaras,Eye pencils,Eyeliners,Eyeshadow,Eyebrow products,Eyelash and eyebrow care,False eyelashes,Skin foundation,BB-cream,CC-cream,Blush,Bronzers,Highlighters,Face contouring,Face powders,Concealers,correctors,Bases,primers for makeup,Makeup setting spray,Lipsticks,Liquid lipsticks,Lip glosses,Lip pencils,Care of the lips,Micellar cleansing water,Removing makeup from the eyes,Reliance almond oil,Cotton discs')
                                        setTXTCategory('?????????????????????? ??????????????????')
                                    }} className={'hoverText'}> ?????????????????????? ??????????????????
                                    </div>
                                </div>
                                {showMiddle3 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                           onClick={() => setShowMiddle3(!showMiddle3)}/>
                                            <div onClick={() => {
                                                setTextCategory('Mascaras,Eye pencils,Eyeliners,Eyeshadow,Eyebrow products,Eyelash and eyebrow care,False eyelashes')
                                                setTXTCategory('??????')
                                            }} className={'hoverText'}> ??????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Mascaras')
                                                     setTXTCategory('???????? ?????? ??????')
                                                 }}> ???????? ?????? ??????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Eye pencils')
                                                     setTXTCategory('???????????? ?????? ????????')
                                                 }}> ???????????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Eyeliners')
                                                     setTXTCategory('???????????????? ?????? ????????')
                                                 }}> ???????????????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Eyeshadow')
                                                     setTXTCategory('????????')
                                                 }}> ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Eyebrow products')
                                                     setTXTCategory('?????????????????????? ???????????? ?????? ????????')
                                                 }}> ?????????????????????? ???????????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Eyelash and eyebrow care')
                                                     setTXTCategory('???????????? ???? ??????????????, ??????????')
                                                 }}> ???????????? ???? ??????????????, ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('False eyelashes')
                                                     setTXTCategory('???????????????? ??????')
                                                 }}> ???????????????? ??????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                           onClick={() => setShowMiddle3(!showMiddle3)}/>
                                            <div onClick={() => {
                                                setTextCategory('Mascaras,Eye pencils,Eyeliners,Eyeshadow,Eyebrow products,Eyelash and eyebrow care,False eyelashes')
                                                setTXTCategory('??????')
                                            }} className={'hoverText'}> ??????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle4 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle4(!showMiddle4)}/>
                                            <div onClick={() => {
                                                setTextCategory('Skin foundation,BB-cream,CC-cream,Blush,Bronzers,Highlighters,Face contouring,Face powders,Concealers,correctors,Bases,primers for makeup,Makeup setting spray')
                                                setTXTCategory('??????????????')
                                            }} className={'hoverText'}> ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Skin foundation')
                                                     setTXTCategory('???????????????? ????????????')
                                                 }}> ???????????????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('BB-cream')
                                                     setTXTCategory('BB-????????')
                                                 }}> BB-????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('CC-cream')
                                                     setTXTCategory('CC-????????')
                                                 }}> CC-????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Blush')
                                                     setTXTCategory('???????????????')
                                                 }}> ???????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Bronzers')
                                                     setTXTCategory('????????????????')
                                                 }}> ????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Highlighters')
                                                     setTXTCategory('????????????????????')
                                                 }}> ????????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Face contouring')
                                                     setTXTCategory('?????????????????? ?????? ??????????????')
                                                 }}> ?????????????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Face powders')
                                                     setTXTCategory('??????????')
                                                 }}> ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Concealers, correctors')
                                                     setTXTCategory('??????????????????, ??????????????????')
                                                 }}> ??????????????????, ??????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Bases, primers for makeup')
                                                     setTXTCategory('????????, ???????????????? ?????? ????????????')
                                                 }}> ????????, ???????????????? ?????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Makeup setting spray')
                                                     setTXTCategory('?????????? ?????? ???????????????? ??????????????')
                                                 }}> ?????????? ?????? ???????????????? ??????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle4(!showMiddle4)}/>
                                            <div onClick={() => {
                                                setTextCategory('Skin foundation,BB-cream,CC-cream,Blush,Bronzers,Highlighters,Face contouring,Face powders,Concealers,correctors,Bases,primers for makeup,Makeup setting spray')
                                                setTXTCategory('??????????????')
                                            }} className={'hoverText'}> ??????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle5 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle5(!showMiddle5)}/>
                                            <div onClick={() => {
                                                setTextCategory('Lipsticks,Liquid lipsticks,Lip glosses,Lip pencils,Care of the lips')
                                                setTXTCategory('????????')
                                            }} className={'hoverText'}> ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Lipsticks')
                                                     setTXTCategory('????????????')
                                                 }}> ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Liquid lipsticks')
                                                     setTXTCategory('?????????? ???????????? ????????????')
                                                 }}> ?????????? ???????????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Lip glosses')
                                                     setTXTCategory('????????????')
                                                 }}> ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Lip pencils')
                                                     setTXTCategory('???????????? ?????? ??????')
                                                 }}> ???????????? ?????? ??????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Care of the lips')
                                                     setTXTCategory('???????????? ???? ???????????? ??????')
                                                 }}> ???????????? ???? ???????????? ??????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle5(!showMiddle5)}/>
                                            <div onClick={() => {
                                                setTextCategory('Lipsticks,Liquid lipsticks,Lip glosses,Lip pencils,Care of the lips')
                                                setTXTCategory('????????')
                                            }} className={'hoverText'}> ????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle6 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle6(!showMiddle6)}/>
                                            <div onClick={() => {
                                                setTextCategory('Micellar cleansing water,Removing makeup from the eyes,Reliance almond oil,Cotton discs')
                                                setTXTCategory('???????????? ??????????????')
                                            }} className={'hoverText'}> ???????????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Micellar cleansing water')
                                                     setTXTCategory('?????????????????? ????????')
                                                 }}> ?????????????????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Removing makeup from the eyes')
                                                     setTXTCategory('???????????? ?????????????? ?? ????????')
                                                 }}> ???????????? ?????????????? ?? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Reliance almond oil')
                                                     setTXTCategory('?????????????????????? ????????')
                                                 }}> ?????????????????????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Cotton discs')
                                                     setTXTCategory('?????????? ??????????')
                                                 }}> ?????????? ??????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle6(!showMiddle6)}/>
                                            <div onClick={() => {
                                                setTextCategory('Micellar cleansing water,Removing makeup from the eyes,Reliance almond oil,Cotton discs')
                                                setTXTCategory('???????????? ??????????????')
                                            }} className={'hoverText'}> ???????????? ??????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            :
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                  onClick={() => setShowBig2(!shoWBig2)}/>
                                    <div onClick={() => {
                                        setTextCategory('Mascaras,Eye pencils,Eyeliners,Eyeshadow,Eyebrow products,Eyelash and eyebrow care,False eyelashes,Skin foundation,BB-cream,CC-cream,Blush,Bronzers,Highlighters,Face contouring,Face powders,Concealers,correctors,Bases,primers for makeup,Makeup setting spray,Lipsticks,Liquid lipsticks,Lip glosses,Lip pencils,Care of the lips,Micellar cleansing water,Removing makeup from the eyes,Reliance almond oil,Cotton discs')
                                        setTXTCategory('?????????????????????? ??????????????????')
                                    }} className={'hoverText'}> ?????????????????????? ??????????????????
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        shoWBig3 ?
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                  onClick={() => setShowBig3(!shoWBig3)}/>
                                    <div onClick={() => {
                                        setTextCategory('Shampoo,Dandruff shampoo,Dry shampoo,Anti-hair loss remedies,Hair masks,Hair balms,Hair conditioners,Hair sprays,Hair oils,Hair styling sprays,Hair gels,Foams for hair,Hair mousses,Tinted hair dyes,Ammonia-free hair dyes,Ammonia hair dyes,Hair lighteners,Henna, basma for hair')
                                        setTXTCategory('??????????????')
                                    }} className={'hoverText'}> ??????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Shampoo')
                                             setTXTCategory('??????????????')
                                         }}> ??????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Dandruff shampoo')
                                             setTXTCategory('?????????????? ?????????? ????????')
                                         }}> ?????????????? ?????????? ????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'} onClick={() => {
                                        setTextCategory('Dry shampoo')
                                        setTXTCategory('?????????? ??????????????')
                                    }}> ?????????? ??????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Anti-hair loss remedies')
                                             setTXTCategory('???????????? ?????????? ?????????????????? ??????????????')
                                         }}> ???????????? ?????????? ?????????????????? ??????????????
                                    </div>
                                </div>
                                {showMiddle7 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle7(!showMiddle7)}/>
                                            <div onClick={() => {
                                                setTextCategory('Hair masks,Hair balms,Hair conditioners,Hair sprays,Hair oils')
                                                setTXTCategory('???????????? ???? ????????????????')
                                            }} className={'hoverText'}> ???????????? ???? ????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair masks')
                                                     setTXTCategory('?????????? ?????? ??????????????')
                                                 }}> ?????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair balms')
                                                     setTXTCategory('???????????????? ?????? ??????????????')
                                                 }}> ???????????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair conditioners')
                                                     setTXTCategory('???????????????????????? ?????? ??????????????')
                                                 }}> ???????????????????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair sprays')
                                                     setTXTCategory('?????????? ?????? ??????????????')
                                                 }}> ?????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair oils')
                                                     setTXTCategory('???????? ?????? ??????????????')
                                                 }}> ???????? ?????? ??????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle7(!showMiddle7)}/>
                                            <div onClick={() => {
                                                setTextCategory('Hair masks,Hair balms,Hair conditioners,Hair sprays,Hair oils')
                                                setTXTCategory('???????????? ???? ????????????????')
                                            }} className={'hoverText'}> ???????????? ???? ????????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle8 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle8(!showMiddle8)}/>
                                            <div onClick={() => {
                                                setTextCategory('Hair styling sprays,Hair gels,Foams for hair,Hair mousses')
                                                setTXTCategory('???????????? ?????? ??????????????????')
                                            }} className={'hoverText'}> ???????????? ?????? ??????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair styling sprays')
                                                     setTXTCategory('???????? ?????? ??????????????')
                                                 }}> ???????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair gels')
                                                     setTXTCategory('???????? ?????? ??????????????')
                                                 }}> ???????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Foams for hair')
                                                     setTXTCategory('?????????? ?????? ??????????????')
                                                 }}> ?????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair mousses')
                                                     setTXTCategory('???????? ?????? ??????????????')
                                                 }}> ???????? ?????? ??????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle8(!showMiddle8)}/>
                                            <div onClick={() => {
                                                setTextCategory('Hair styling sprays,Hair gels,Foams for hair,Hair mousses')
                                                setTXTCategory('???????????? ?????? ??????????????????')
                                            }} className={'hoverText'}> ???????????? ?????? ??????????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle9 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle9(!showMiddle9)}/>
                                            <div onClick={() => {
                                                setTextCategory('Tinted hair dyes,Ammonia-free hair dyes,Ammonia hair dyes,Hair lighteners,Henna, basma for hair')
                                                setTXTCategory('?????????? ?????? ??????????????')
                                            }} className={'hoverText'}> ?????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Tinted hair dyes')
                                                     setTXTCategory('???????????????????? ??????????')
                                                 }}> ???????????????????? ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Ammonia-free hair dyes')
                                                     setTXTCategory('???????????????????? ??????????')
                                                 }}> ???????????????????? ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Ammonia hair dyes')
                                                     setTXTCategory('?????????????? ??????????')
                                                 }}> ?????????????? ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hair lighteners')
                                                     setTXTCategory('??????????????????????')
                                                 }}> ??????????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Henna, basma for hair')
                                                     setTXTCategory('??????, ??????????')
                                                 }}> ??????, ??????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle9(!showMiddle9)}/>
                                            <div onClick={() => {
                                                setTextCategory('Tinted hair dyes,Ammonia-free hair dyes,Ammonia hair dyes,Hair lighteners,Henna, basma for hair')
                                                setTXTCategory('?????????? ?????? ??????????????')
                                            }} className={'hoverText'}> ?????????? ?????? ??????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            :

                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                  onClick={() => setShowBig3(!shoWBig3)}/>
                                    <div onClick={() => {
                                        setTextCategory('Shampoo,Dandruff shampoo,Dry shampoo,Anti-hair loss remedies,Hair masks,Hair balms,Hair conditioners,Hair sprays,Hair oils,Hair styling sprays,Hair gels,Foams for hair,Hair mousses,Tinted hair dyes,Ammonia-free hair dyes,Ammonia hair dyes,Hair lighteners,Henna, basma for hair')
                                        setTXTCategory('??????????????')
                                    }} className={'hoverText'}> ??????????????
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        shoWBig4 ?
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                  onClick={() => setShowBig4(!shoWBig4)}/>
                                    <div onClick={() => {
                                        setTextCategory('Gel varnishes,Gel polish removers,Nail scissors,Nail clippers,Nail pushers,Heel graters and saws,Nail files,Pedicure accessories,Nail care,Nail decor,Manicure and pedicure kits')
                                        setTXTCategory('??????????')
                                    }} className={'hoverText'}> ??????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Gel varnishes')
                                             setTXTCategory('????????-????????')
                                         }}> ????????-????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Gel polish removers')
                                             setTXTCategory('???????????? ?????? ???????????? ????????-????????')
                                         }}> ???????????? ?????? ???????????? ????????-????????
                                    </div>
                                </div>
                                {showMiddle10 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle10(!showMiddle10)}/>
                                            <div onClick={() => {
                                                setTextCategory('Nail scissors,Nail clippers,Nail pushers,Heel graters and saws,Nail files,Pedicure accessories,Nail care,Nail decor,Manicure and pedicure kits')
                                                setTXTCategory('?????????????????? ?????? ???????????????? ???? ????????????????')
                                            }} className={'hoverText'}> ?????????????????? ?????? ???????????????? ???? ????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Nail scissors')
                                                     setTXTCategory('????????????')
                                                 }}> ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Nail clippers')
                                                     setTXTCategory('?????????????? ?????? ????????????')
                                                 }}> ?????????????? ?????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Nail pushers')
                                                     setTXTCategory('????????????')
                                                 }}> ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Heel graters and saws')
                                                     setTXTCategory('?????????? ???? ?????????? ?????? ?????????????')
                                                 }}> ?????????? ???? ?????????? ?????? ?????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Nail files')
                                                     setTXTCategory('??????????????')
                                                 }}> ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Pedicure accessories')
                                                     setTXTCategory('?????????????????? ?????? ????????????????')
                                                 }}> ?????????????????? ?????? ????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Nail care')
                                                     setTXTCategory('???????????? ?????? ????????????')
                                                 }}> ???????????? ?????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Nail decor')
                                                     setTXTCategory('?????????? ?????? ????????????')
                                                 }}> ?????????? ?????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Manicure and pedicure kits')
                                                     setTXTCategory('?????????????????? ???? ?????????????????? ????????????')
                                                 }}> ?????????????????? ???? ?????????????????? ????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle10(!showMiddle10)}/>
                                            <div onClick={() => {
                                                setTextCategory('Nail scissors,Nail clippers,Nail pushers,Heel graters and saws,Nail files,Pedicure accessories,Nail care,Nail decor,Manicure and pedicure kits')
                                                setTXTCategory('?????????????????? ?????? ???????????????? ???? ????????????????')
                                            }} className={'hoverText'}> ?????????????????? ?????? ???????????????? ???? ????????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            :

                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                  onClick={() => setShowBig4(!shoWBig4)}/>
                                    <div onClick={() => {
                                        setTextCategory('Gel varnishes,Gel polish removers,Nail scissors,Nail clippers,Nail pushers,Heel graters and saws,Nail files,Pedicure accessories,Nail care,Nail decor,Manicure and pedicure kits')
                                        setTXTCategory('??????????')
                                    }} className={'hoverText'}> ??????????
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        shoWBig5 ?
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                  onClick={() => setShowBig5(!shoWBig5)}/>
                                    <div onClick={() => {
                                        setTextCategory('Hand antiseptics,Creams, lotions for the body,Body care oils,Anti-cellulite remedies,Hand care,Foot care,Liquid soap,Solid dish soap,Shower gels for bath,Body scrubs,Bath bombs and foams,Bath and shower accessories,Shaving machines and cartridges,Shaving cosmetics,Depilatory products,Women deodorants, antiperspirants,Men\'s deodorants, antiperspirants,Solar series SPF 30,Solar series SPF 40,Solar series SPF 50,Solar series self tanning')
                                        setTXTCategory('???????? ???? ??????????')
                                    }} className={'hoverText'}> ???????? ???? ??????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Hand antiseptics')
                                             setTXTCategory('?????????????????????? ?????? ??????')
                                         }}> ?????????????????????? ?????? ??????
                                    </div>
                                </div>
                                {showMiddle11 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle11(!showMiddle11)}/>
                                            <div onClick={() => {
                                                setTextCategory('Creams, lotions for the body,Body care oils,Anti-cellulite remedies,Hand care,Foot care')
                                                setTXTCategory('???????????? ???? ??????????')
                                            }} className={'hoverText'}> ???????????? ???? ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Creams, lotions for the body')
                                                     setTXTCategory('??????????, ???????????????? ?????? ????????')
                                                 }}> ??????????, ???????????????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Body care oils')
                                                     setTXTCategory('???????? ?????? ????????')
                                                 }}> ???????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Anti-cellulite remedies')
                                                     setTXTCategory('?????????????????????????? ????????????')
                                                 }}> ?????????????????????????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Hand care')
                                                     setTXTCategory('???????????? ???? ????????????')
                                                 }}> ???????????? ???? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Foot care')
                                                     setTXTCategory('???????????? ???? ????????????')
                                                 }}> ???????????? ???? ????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle11(!showMiddle11)}/>
                                            <div onClick={() => {
                                                setTextCategory('Creams, lotions for the body,Body care oils,Anti-cellulite remedies,Hand care,Foot care')
                                                setTXTCategory('???????????? ???? ??????????')
                                            }} className={'hoverText'}> ???????????? ???? ??????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle12 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle12(!showMiddle12)}/>
                                            <div onClick={() => {
                                                setTextCategory('Liquid soap,Solid dish soap,Shower gels for bath,Body scrubs,Bath bombs and foams,Bath and shower accessories')
                                                setTXTCategory('?????? ??????????, ????????')
                                            }} className={'hoverText'}> ?????? ??????????, ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Liquid soap')
                                                     setTXTCategory('?????????? ????????')
                                                 }}> ?????????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Solid dish soap')
                                                     setTXTCategory('???????????? ????????')
                                                 }}> ???????????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Shower gels for bath')
                                                     setTXTCategory('???????? ?????? ????????')
                                                 }}> ???????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Body scrubs')
                                                     setTXTCategory('???????????? ?????? ????????')
                                                 }}> ???????????? ?????? ????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Bath bombs and foams')
                                                     setTXTCategory('???????????????? ???? ???????? ?????? ????????????')
                                                 }}> ???????????????? ???? ???????? ?????? ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Bath and shower accessories')
                                                     setTXTCategory('?????????????????? ?????? ?????????? ???? ????????')
                                                 }}> ?????????????????? ?????? ?????????? ???? ????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle12(!showMiddle12)}/>
                                            <div onClick={() => {
                                                setTextCategory('Liquid soap,Solid dish soap,Shower gels for bath,Body scrubs,Bath bombs and foams,Bath and shower accessories')
                                                setTXTCategory('?????? ??????????, ????????')
                                            }} className={'hoverText'}> ?????? ??????????, ????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle13 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle13(!showMiddle13)}/>
                                            <div onClick={() => {
                                                setTextCategory('Shaving machines and cartridges,Shaving cosmetics,Depilatory products')
                                                setTXTCategory('??????????????, ??????????????????')
                                            }} className={'hoverText'}> ??????????????, ??????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Shaving machines and cartridges')
                                                     setTXTCategory('???????????? ???? ??????????????????')
                                                 }}> ???????????? ???? ??????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Shaving cosmetics')
                                                     setTXTCategory('?????????????????? ?????? ??????????????')
                                                 }}> ?????????????????? ?????? ??????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Depilatory products')
                                                     setTXTCategory('???????????? ?????? ??????????????????')
                                                 }}> ???????????? ?????? ??????????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle13(!showMiddle13)}/>
                                            <div onClick={() => {
                                                setTextCategory('Shaving machines and cartridges,Shaving cosmetics,Depilatory products')
                                                setTXTCategory('??????????????, ??????????????????')
                                            }} className={'hoverText'}> ??????????????, ??????????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle14 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle14(!showMiddle14)}/>
                                            <div onClick={() => {
                                                setTextCategory('Women deodorants, antiperspirants,Men\'s deodorants, antiperspirants')
                                                setTXTCategory('??????????????????????, ??????????????????????????????')
                                            }} className={'hoverText'}> ??????????????????????, ??????????????????????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Women deodorants, antiperspirants')
                                                     setTXTCategory('????????????')
                                                 }}> ????????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Men\'s deodorants, antiperspirants')
                                                     setTXTCategory('????????????????')
                                                 }}> ????????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle14(!showMiddle14)}/>
                                            <div onClick={() => {
                                                setTextCategory('Women deodorants, antiperspirants,Men\'s deodorants, antiperspirants')
                                                setTXTCategory('??????????????????????, ??????????????????????????????')
                                            }} className={'hoverText'}> ??????????????????????, ??????????????????????????????
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showMiddle15 ?
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle15(!showMiddle15)}/>
                                            <div onClick={() => {
                                                setTextCategory('Solar series SPF 30,Solar series SPF 40,Solar series SPF 50,Solar series self tanning')
                                                setTXTCategory('?????????????? ??????????')
                                            }} className={'hoverText'}> ?????????????? ??????????
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Solar series SPF 30')
                                                     setTXTCategory('SPF 30')
                                                 }}> SPF 30
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Solar series SPF 40')
                                                     setTXTCategory('SPF 40')
                                                 }}> SPF 40
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Solar series SPF 50')
                                                     setTXTCategory('SPF 50')
                                                 }}> SPF 50
                                            </div>
                                        </div>
                                        <div className={'lowCategory'}>
                                            <div className={'categoryTitle'}
                                                 onClick={() => {
                                                     setTextCategory('Solar series self tanning')
                                                     setTXTCategory('??????????????????????')
                                                 }}> ??????????????????????
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={'middleCategoryNon'}>
                                        <div className={'categoryTitle'}>
                                            <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                          onClick={() => setShowMiddle15(!showMiddle15)}/>
                                            <div onClick={() => {
                                                setTextCategory('Solar series SPF 30,Solar series SPF 40,Solar series SPF 50,Solar series self tanning')
                                                setTXTCategory('?????????????? ??????????')
                                            }} className={'hoverText'}> ?????????????? ??????????
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            :

                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                  onClick={() => setShowBig5(!shoWBig5)}/>
                                    <div onClick={() => {
                                        setTextCategory('Hand antiseptics,Creams, lotions for the body,Body care oils,Anti-cellulite remedies,Hand care,Foot care,Liquid soap,Solid dish soap,Shower gels for bath,Body scrubs,Bath bombs and foams,Bath and shower accessories,Shaving machines and cartridges,Shaving cosmetics,Depilatory products,Women deodorants, antiperspirants,Men\'s deodorants, antiperspirants,Solar series SPF 30,Solar series SPF 40,Solar series SPF 50,Solar series self tanning')
                                        setTXTCategory('???????? ???? ??????????')
                                    }} className={'hoverText'}> ???????? ???? ??????????
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        shoWBig6 ?
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                  onClick={() => setShowBig6(!shoWBig6)}/>
                                    <div onClick={() => {
                                        setTextCategory('Jewelry,Hair accessories,Makeup accessories,Cosmetic bags')
                                        setTXTCategory('??????????????????')
                                    }} className={'hoverText'}> ??????????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Jewelry')
                                             setTXTCategory('????????????????')
                                         }}> ????????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Hair accessories')
                                             setTXTCategory('?????????????????? ?????? ??????????????')
                                         }}> ?????????????????? ?????? ??????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Makeup accessories')
                                             setTXTCategory('?????????????????? ?????? ??????????????')
                                         }}> ?????????????????? ?????? ??????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Cosmetic bags')
                                             setTXTCategory('????????????????????')
                                         }}> ????????????????????
                                    </div>
                                </div>
                            </div>
                            :

                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                  onClick={() => setShowBig6(!shoWBig6)}/>
                                    <div onClick={() => {
                                        setTextCategory('Jewelry,Hair accessories,Makeup accessories,Cosmetic bags')
                                        setTXTCategory('??????????????????')
                                    }} className={'hoverText'}> ??????????????????
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        shoWBig7 ?
                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactRight className={'hoverDropdown'}
                                                                  onClick={() => setShowBig7(!shoWBig7)}/>
                                    <div onClick={() => {
                                        setTextCategory('Gift for her,Gift for him,Gift perfumed sets')
                                        setTXTCategory('??????????????????, ????????????')
                                    }} className={'hoverText'}> ??????????????????, ????????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'} onClick={() => {
                                        setTextCategory('Gift for her')
                                        setTXTCategory('?????? ??????')
                                    }}> ?????? ??????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'} onClick={() => {
                                        setTextCategory('Gift for him')
                                        setTXTCategory('?????? ??????????')
                                    }}> ?????? ??????????
                                    </div>
                                </div>
                                <div className={'middleCategory'}>
                                    <div className={'categoryTitle'}
                                         onClick={() => {
                                             setTextCategory('Gift perfumed sets')
                                             setTXTCategory('?????????????????????? ????????????')
                                         }}> ?????????????????????? ????????????
                                    </div>
                                </div>
                            </div>
                            :

                            <div className={'bigCategoryNon'}>
                                <div className={'categoryTitle'}>
                                    <BsIcons.BsChevronCompactDown className={'hoverDropdown'}
                                                                  onClick={() => setShowBig7(!shoWBig7)}/>
                                    <div onClick={() => {
                                        setTextCategory('Gift for her,Gift for him,Gift perfumed sets')
                                        setTXTCategory('??????????????????, ????????????')
                                    }} className={'hoverText'}> ??????????????????, ????????????
                                    </div>
                                </div>
                            </div>
                    }
                </div> : <></>}

                <div style={{width: '100%', height: '93%', display: 'flex'}}>
                    <div className={'filtersBlock'}>

                        <div className={'nameFilter'}>
                            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                                ?????????? {searchObj.length === 0
                                ?
                                <div style={{marginLeft: '58%'}}></div>
                                :
                                <BsIcons.BsXCircleFill className={'priceFiltersButton'} style={{marginLeft: '50%'}}
                                                       onClick={() => {
                                                           setSearchObj('')
                                                       }}/>
                            }</div>
                            <div className={'searchFormFilter'}>
                                <div className='searchInputFilter'>
                                    <input type="text" value={searchObj} onChange={changeSearchObj}
                                           placeholder='???????????????? ???? ???? ???????????? ????????????'/>
                                </div>
                            </div>
                            {searchObj.length > 0 ? <div onClick={() => {
                                setSearchObj('')
                            }} className={'cancelSearch'}><BsIcons.BsXCircleFill/></div> : <></>}
                        </div>

                        <div className={'priceFilter'}>
                            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                                ???????? {(minPrice === 0 || minPrice === '0') && (maxPrice === 99999 || maxPrice === '99999')
                                ?
                                <div style={{marginLeft: '58%'}}></div>
                                :
                                <BsIcons.BsXCircleFill className={'priceFiltersButton'} style={{marginLeft: '50%'}}
                                                       onClick={() => {
                                                           setMaxPrice(99999)
                                                           setMinPrice(0)
                                                       }}/>
                            }</div>
                            <div className={'priceFilterInputs'}>
                                <div className={'minMaxPrice'}>
                                    <div>????????????????????</div>
                                    <input type="text" value={minPrice} onChange={changeMinPrice} placeholder={'Min'}/>
                                </div>
                                <div className={'minMaxPrice'}>
                                    <div>??????????????????????</div>
                                    <input type="text" value={maxPrice} onChange={changeMaxPrice} placeholder={'Max'}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={'homeProductsCenter'}>
                        {category === 'no' && minPrice === 0 && maxPrice === 99999 && searchObj.length === 0 ?
                            <>
                                <div className={'homeTitle'}>
                                    ?????? ????????????
                                </div>
                            </>
                            :
                            <></>
                        }
                        {products}
                        <div className={'pageLine'}>
                            {
                                pagesN < 4 ?
                                    <>{pages}</>
                                    :
                                    page >= 2 ?
                                        page >= pagesN - 1 ?
                                            <>
                                                {pages.slice(0, 1)}
                                                {pagesN >= 4 ? <Page number={'...'}/> : <></>}
                                                {pages.slice(pagesN - 2, pagesN + 1)}
                                            </>
                                            :
                                            <>
                                                {pages[0]}
                                                {page >= 3 ? <Page number={'...'}/> : <></>}
                                                {pages.slice(page - 1, page + 2)}
                                                {page <= pagesN - 3 ? <Page number={'...'}/> : <></>}
                                                {pages[pagesN]}
                                            </>
                                        :
                                        <>
                                            {pages.slice(0, 3)}
                                            {pagesN >= 4 ? <Page number={'...'}/> : <></>}
                                            {pages.slice(pagesN, pagesN + 1)}
                                        </>
                            }

                        </div>
                        {category === 'no' && minPrice === 0 && maxPrice === 99999 && searchObj.length === 0 ?
                            <>
                                {resentProducts.length > 0 ?
                                    <>
                                        <div className={'homeTitle'}>
                                            ?????????????? ??????????????????????
                                        </div>
                                        <div className={'productLnRec'}>{resentProducts}</div>
                                    </>
                                    :
                                    <></>
                                }
                                <div className={'homeTitle'}>
                                    ???????? ?????? ????????????????????
                                </div>
                                <div className={'productInterestingRec'}>{interestProducts}</div>
                                <div className={'homeTitle'}>
                                    ?????????????????? ??????????????
                                </div>
                                <div className={'productLnRec'}>{mostBuyed}</div>
                            </>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
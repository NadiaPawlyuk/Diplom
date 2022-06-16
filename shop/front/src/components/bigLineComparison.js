import React, {useEffect, useState} from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";
import Product from "./product";

function BigLineComparison({data, products, changeUpdate}) {

    const [showComponent, setShowComponent] = useState(false)

    const [readyProducts, setReadyProducts] = useState(<></>)

    const [name, setName] = useState('')

    function changeShowComponent() {
        setShowComponent(!showComponent)
    }

    useEffect(() => {
        const res = []
        products.forEach(data => {
            res.push(<Product product={JSON.parse(data)} comp={true} update={changeUpdate}/>)
        })
        setReadyProducts(res)
        if(data === 'Women\'s perfumery'){
            setName('Жіноча парфумерія')
        }
        if(data === 'Men\'s perfumery'){
            setName('Чоловіча парфумерія')
        }
        if(data === 'Unisex perfumery'){
            setName('Унісекс парфумерія')
        }
        if(data === 'Shower gels'){
            setName('Гелі для душу')
        }
        if(data === 'Body creams'){
            setName('Креми для тіла')
        }
        if(data === 'Body lotions'){
            setName('Лосьйони для тіла')
        }
        if(data === 'Body oils'){
            setName('Олії для тіла')
        }
        if(data === 'Soap'){
            setName('Мило')
        }
        if(data === 'Perfume gift sets for her'){
            setName('Парфумовані набори для неї')
        }
        if(data === 'Perfume gift sets for him'){
            setName('Парфумовані набори для нього')
        }
        if(data === 'Perfume gift sets unisex perfume'){
            setName('Парфумовані набори унісекс')
        }
        if(data === 'Solid perfumes'){
            setName('Тверді парфуми')
        }
        if(data === 'Mascaras'){
            setName('Туші для вій')
        }
        if(data === 'Eye pencils'){
            setName('Олівці для очей')
        }
        if(data === 'Eyeliners'){
            setName('Підводки для очей')
        }
        if(data === 'Eyeshadow'){
            setName('Тіні')
        }
        if(data === 'Eyebrow products'){
            setName('Декоративні засоби для брів')
        }
        if(data === 'Eyelash and eyebrow care'){
            setName('Догляд за бровами, віями')
        }
        if(data === 'False eyelashes'){
            setName('Накладні вії')
        }
        if(data === 'Skin foundation'){
            setName('Тональні засоби')
        }
        if(data === 'BB-cream'){
            setName('BB-крем')
        }
        if(data === 'CC-cream'){
            setName('CC-крем')
        }
        if(data === 'Blush'){
            setName('Рум’яна')
        }
        if(data === 'Bronzers'){
            setName('Бронзери')
        }
        if(data === 'Highlighters'){
            setName('Хайлайтери')
        }
        if(data === 'Face contouring'){
            setName('Контуринг для обличчя')
        }
        if(data === 'Face powders'){
            setName('Пудри')
        }
        if(data === 'Concealers, correctors'){
            setName('Консилери, коректори')
        }
        if(data === 'Bases, primers for makeup'){
            setName('Бази, праймери під макіяж')
        }
        if(data === 'Makeup setting spray'){
            setName('Спреї для фіксації макіяжу')
        }
        if(data === 'Lipsticks'){
            setName('Помади')
        }
        if(data === 'Liquid lipsticks'){
            setName('Рідкі матові помади')
        }
        if(data === 'Lip glosses'){
            setName('Блиски')
        }
        if(data === 'Lip pencils'){
            setName('Олівці для губ')
        }
        if(data === 'Care of the lips'){
            setName('Догляд за шкірою губ')
        }
        if(data === 'Micellar cleansing water'){
            setName('Міцелярна вода')
        }
        if(data === 'Removing makeup from the eyes'){
            setName('Зняття макіяжу з очей')
        }
        if(data === 'Reliance almond oil'){
            setName('Гідрофільна олія')
        }
        if(data === 'Cotton discs'){
            setName('Ватні диски')
        }
        if (data === 'Shampoo') {
            setName('Шампунь')
        }

        if (data === 'Dandruff shampoo') {
            setName('Шампунь проти лупи')
        }

        if (data === 'Dry shampoo') {
            setName('Сухий шампунь')
        }

        if(data === 'Anti-hair loss remedies'){
            setName('Засоби проти випадіння волосся')
        }

        if(data === 'Hair masks'){
            setName('Маски для волосся')
        }

        if(data === 'Hair balms'){
            setName('Бальзами для волосся')
        }

        if(data === 'Hair conditioners'){
            setName('Кондиціонери для волосся')
        }

        if(data === 'Hair sprays'){
            setName('Спреї для волосся')
        }

        if(data === 'Hair oils'){
            setName('Олія для волосся')
        }

        if(data === 'Hair styling sprays'){
            setName('Лаки для волосся')
        }
        if(data === 'Hair gels'){
            setName('Гелі для волосся')
        }
        if(data === 'Foams for hair'){
            setName('Пінки для волосся')
        }
        if(data === 'Hair mousses'){
            setName('Муси для волосся')
        }
        if(data === 'Tinted hair dyes'){
            setName('Відтінкові фарби')
        }
        if(data === 'Ammonia-free hair dyes'){
            setName('Безаміачні фарби')
        }
        if(data === 'Ammonia hair dyes'){
            setName('Аміачні фарби')
        }
        if(data === 'Hair lighteners'){
            setName('Освітлювачі')
        }
        if(data === 'Henna, basma for hair'){
            setName('Хна, басма')
        }
        if(data === 'Gel varnishes'){
            setName('Гель-лаки')
        }
        if(data === 'Gel polish removers'){
            setName('Засоби для зняття гель-лаку')
        }
        if(data === 'Nail scissors'){
            setName('Ножиці')
        }
        if(data === 'Nail clippers'){
            setName('Щипчики для нігтів')
        }
        if(data === 'Nail pushers'){
            setName('Пушери')
        }
        if(data === 'Heel graters and saws'){
            setName('Терки та пилки для п’яток')
        }
        if(data === 'Nail files'){
            setName('Пилочки')
        }
        if(data === 'Pedicure accessories'){
            setName('Аксесуари для педикюру')
        }

        if(data === 'Nail care'){
            setName('Догляд для нігтів')
        }

        if(data === 'Nail decor'){
            setName('Декор для нігтів')
        }

        if(data === 'Manicure and pedicure kits'){
            setName('Манікюрні та педикюрні набори')
        }

        if(data === 'Creams, lotions for the body'){
            setName('Креми, лосьйони для тіла')
        }

        if(data === 'Body care oils'){
            setName('Олії для тіла')
        }

        if(data === 'Anti-cellulite remedies'){
            setName('Антицелюлітні засоби')
        }

        if(data === 'Hand care'){
            setName('Догляд за руками')
        }

        if(data === 'Foot care'){
            setName('Догляд за ногами')
        }

        if(data === 'Hand antiseptics'){
            setName('Антисептики для рук')
        }

        if(data === 'Liquid soap'){
            setName('Рідке мило')
        }

        if(data === 'Solid dish soap'){
            setName('Тверде мило')
        }

        if(data === 'Shower gels for bath'){
            setName('Гелі для душу(догляд)')
        }

        if(data === 'Body scrubs'){
            setName('Скраби для тіла')
        }

        if(data === 'Bath bombs and foams'){
            setName('Бомбочки та піна для ванної')
        }

        if(data === 'Bath and shower accessories'){
            setName('Аксесуари для ванни та душу')
        }

        if(data === 'Shaving machines and cartridges'){
            setName('Станки та картриджі')
        }
        if(data === 'Shaving cosmetics'){
            setName('Косметика для гоління')
        }
        if(data === 'Depilatory products'){
            setName('Засоби для депіляції')
        }
        if(data === 'Women deodorants, antiperspirants'){
            setName('Жіночі дезодоранти')
        }
        if(data === 'Men\'s deodorants, antiperspirants'){
            setName('Чоловічі дезодоранти')
        }
        if(data === 'Solar series SPF 30'){
            setName('SPF 30')
        }
        if(data === 'Solar series SPF 40'){
            setName('SPF 40')
        }
        if(data === 'Solar series SPF 50'){
            setName('SPF 40')
        }
        if(data === 'Solar series SPF 50'){
            setName('SPF 50')
        }
        if(data === 'Solar series self tanning'){
            setName('Автозасмага')
        }
        if(data === 'Jewelry'){
            setName('Прикраси')
        }
        if(data === 'Hair accessories'){
            setName('Аксесуари для волосся')
        }
        if(data === 'Makeup accessories'){
            setName('Аксесуари для макіяжу')
        }
        if(data === 'Cosmetic bags'){
            setName('Косметички')
        }
        if(data === 'Gift for her'){
            setName('Подарунки для неї')
        }
        if(data === 'Gift for him'){
            setName('Подарунки для нього')
        }
        if(data === 'Gift perfumed sets'){
            setName('Унісекс подарунки')
        }

    }, [])

    return (
        <>
            <div className={'bigLine'} onClick={changeShowComponent}>
                <div style={{marginLeft: '14px'}}>
                    {name}
                </div>
                {
                    showComponent ?
                        <BsIcons.BsChevronUp style={{marginRight: '14px'}}/>
                        :
                        <BsIcons.BsChevronDown style={{marginRight: '14px'}}/>
                }
            </div>
            {
                showComponent ?
                    <div className={'endlessLine'}>
                        <div className={'insideEND'}>
                            {readyProducts}
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default BigLineComparison
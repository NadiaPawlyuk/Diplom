import '../index.css'
import React, {useEffect, useState} from "react";

function OrderProduct({data}) {

    const [image, setImage] = useState('')

    useEffect(() => {
        const im = data.productImage.split(';')
        setImage(im[0])
        console.log(data)
    }, [])

    return (
        <div className={'orderProduct'}>

            <div className={'imageOrder'}>
                <img src={image} alt={data.productName} className={'productImage'}/>
            </div>

            <div className={'prodTextOrd'} style={{width: '68%', display: 'flex', justifyContent: 'flex-start'}}>
                {data.productName}
            </div>

            <div className={'prodTextOrd'} style={{marginRight: '2%'}}>
                Кількість: {data.count}
            </div>

        </div>
    )
}

export default OrderProduct
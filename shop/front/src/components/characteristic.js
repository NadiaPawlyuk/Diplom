import React from "react";
import '../index.css'

function Characteristic({char, comp}) {

    return (
        <div className={comp ? 'characteristicBoxComp' : 'characteristicBox'}>
            <div>
                {char.key}
            </div>
            <div style={{marginLeft: '10px'}}>
                {char.value}
            </div>
        </div>
    )
}

export default Characteristic
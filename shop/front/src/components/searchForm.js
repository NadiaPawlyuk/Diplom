import React from "react";
import {useState} from "react";
import * as BsIcons from "react-icons/bs";

function SearchForm({page}){

    const [searchObj, setSearchObj] = useState('')

    function changeSearchObj(event){
        setSearchObj(event.target.value)
    }

    return(
        <div className={'searchForm'} style={page === 'Home' ? {marginLeft: '790px'} : {marginLeft: '15px'}}>
            <div className='searchInput'>
                <input type="text" value={searchObj} onChange={changeSearchObj} placeholder='Напишіть те що хочете знайти'/>
            </div>
            <div className={'searchButton'}> <BsIcons.BsSearch/> </div>
        </div>
    )
}

export default SearchForm
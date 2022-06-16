import React from "react";
import '../index.css'

function Page({number, changePage, page}) {

    return (
        <div className={page === number ? 'page currentPage' : 'page'} onClick={() => changePage(number)}>
            {number==='...' ? number : number + 1}
        </div>
    )
}

export default Page
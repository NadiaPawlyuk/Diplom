import React from "react";
import '../index.css'
import * as BsIcons from "react-icons/bs";

function Comment({comment}) {


    return (
        <div className={'commentMainBlock'}>

            <div className={'commentInfoBlock'}>

                <div className={'commentUserName'}>{comment.senderName}</div>

                <div className={'commentStars'}>
                    {comment.stars > 0 ? <BsIcons.BsStarFill className={'starFill'}/> : <BsIcons.BsStar className={'starEmpty'} />}
                    {comment.stars > 1 ? <BsIcons.BsStarFill className={'starFill'}/> : <BsIcons.BsStar className={'starEmpty'} />}
                    {comment.stars > 2 ? <BsIcons.BsStarFill className={'starFill'}/> : <BsIcons.BsStar className={'starEmpty'} />}
                    {comment.stars > 3 ? <BsIcons.BsStarFill className={'starFill'}/> : <BsIcons.BsStar className={'starEmpty'} />}
                    {comment.stars > 4 ? <BsIcons.BsStarFill className={'starFill'}/> : <BsIcons.BsStar className={'starEmpty'} />}
                </div>

            </div>

            <div className={'commentComment'}>{comment.comment}</div>


        </div>
    )
}

export default Comment
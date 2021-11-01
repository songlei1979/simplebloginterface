import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import {disLikePost, getThePost, getUserInfo, likePost} from "../Functions";

function PostDetail(props) {
    const location = new useLocation()
    const {postid} = location.state;
    const [allowToLike, setAllowToLike] = useState(null)
    const [title, setTitle] = useState('')
    const [header_image, setHeader_image] = useState('')
    const [title_tag, setTitle_tag] = useState('')
    const [snippet, setSnippet] = useState('')
    const [body, setBody] = useState('')
    const [user, setUser] = useState(0)
    const [category, setCategory] = useState(0)
    let cookies = new Cookies()
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState(false)

    useEffect(async () => {

        if (cookies.get('myToken')) {
            await getUserInfo(cookies.get("myToken")).then((data) => {
                setUser(data.id)
            })

            getThePost(postid).then((data) => {
                if (data.auther != user) {
                    setAllowToLike(true)
                } else {
                    setAllowToLike(false)
                }
                setTitle(data.title)
                setHeader_image(data.header_image)
                setTitle_tag(data.title_tag)
                setBody(data.body)
                setCategory(data.category)
                setSnippet(data.snippet)
                setLikes(data.likes)
                if (data.likes.indexOf(user) != -1 ){
                    setLiked(true)
                    }
            })

        }

    }, [allowToLike])

    const likeBtn = () => {
        alert("clicked like")
        likePost(cookies.get("myToken"), user, postid)
    }

    const disLikeBtn = () => {
        disLikePost(cookies.get("myToken"), user, postid)
    }

    return (
        <div>
            <h1>Post Detail</h1>
            <h2>{title}</h2>
            <p>{title_tag}</p>
            <p>{snippet}</p>
            <h3>body</h3>
            <p>{body}</p>
            <p>{likes.length}</p>
            {allowToLike ? (liked ? (<button onClick={disLikeBtn}>unLike</button>):(<button onClick={likeBtn}>Like</button>)) : (null)}
        </div>
    );
}

export default PostDetail;
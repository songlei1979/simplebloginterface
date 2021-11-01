import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {deletePost, getThePost, getUserInfo} from "../Functions";
import {Cookies} from "react-cookie";
import { useHistory } from "react-router-dom";

function DeletePost(props) {
    const location = new useLocation()
    const {postid} = location.state;
    const [auther, setAuther] = useState(0)
    let cookies = new Cookies()

    useEffect( ()=>{
        if (cookies.get('myToken')) {
            getUserInfo(cookies.get("myToken")).then((data) => {
                setAuther(data.id)
            })

            getThePost(postid).then((data) => {
                if (data.auther == auther) {
                    deletePost(cookies.get('myToken'), postid);
                    window.location.href = "/";
                }
            })
        }
    })

    return (
        <div>

        </div>
    );
}

export default DeletePost;
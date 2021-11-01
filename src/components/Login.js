import React, {useEffect, useState} from 'react';
import {userLogin} from '../Functions'
import {useHistory} from "react-router-dom";
import {Cookies} from "react-cookie";


function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('hello')
    let history = useHistory()
    let cookies = new Cookies()

    useEffect(()=>{
        if (cookies.get('myToken')){
             history.push('/')
        }
    }, [cookies.getAll()])

    const loginBtn =()=>{
       userLogin(username, password)
        setError("Login Failed")
    }

    return (
        <div>
            <h1>Login</h1>
            <div className = "mb-3">
                <label htmlFor={"username"} className={"form-label"}>Username</label>
                <input type={"text"} className={"form-control"} id={"username"}
                       placeholder={"Please enter username"}
                        value={username} onChange={e=>setUsername(e.target.value)}
                />
            </div>
            <div className = "mb-3">
                <label htmlFor={"password"} className={"form-label"}>Password</label>
                <input type={"password"} className={"form-control"} id={"password"}
                       placeholder={"Please enter password"}
                value={password} onChange={e=>setPassword(e.target.value)}
                />
            </div>
            <div className = "mb-3">
                <label htmlFor={"error"} className={"form-label"}>{error}</label>
            </div>
            <button className={"btn btn-primary"} onClick={loginBtn}>Login</button>
        </div>
    );
}

export default Login;
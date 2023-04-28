import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeNavAction, loginFailure, loginStart, loginSuccess} from "../store/reducer/userSlice";
import {CSSTransition} from "react-transition-group";
import axios from "axios";
import {auth,provider} from "../firebase";
import {signInWithPopup} from "firebase/auth"
import {Link} from "react-router-dom";


const Auth = () => {
    const dispatch = useDispatch()
    const {rightNav} = useSelector(state => state.user)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const closeNav = ()=>{
        dispatch(closeNavAction(false))
    }
    const handleLogin = async (e)=>{
        e.preventDefault()
        dispatch(loginStart())
        try {
            const res =  await axios.post("/auth/signin",{name,password})
            dispatch(loginSuccess(res.data))
            console.log(res.data)
            await closeNav()
        }catch (e){
            dispatch(loginFailure())
            console.log(e)
        }
    }
    const signInWithGoogle = async ()=>{
        signInWithPopup(auth,provider)
            .then((result)=>{
                axios.post("auth/google",{
                    name:result.user.displayName,
                    email:result.user.email,
                    img:result.user.photoURL,
                }).then((res)=>{
                    dispatch(loginSuccess(res.data))
                })

        }).catch(error=>{
            dispatch(loginFailure())
        })
    }

    return (
        <CSSTransition classNames={'authCONT'} in={rightNav} timeout={300} unmountOnExit>
            <div className={"container-right"}>
                <div onClick={closeNav} style={{position:"absolute",top:"10px", right:"10px", userSelect:"none",cursor:"pointer"}} className="close">×</div>
                <input onChange={e => setName(e.target.value)} placeholder={"имя пользователя"}/>
                <input type={"password"} onChange={e => setPassword(e.target.value)} placeholder={"пароль"}/>
                <Link to={'/register'}><a href={"/"} style={{fontSize:"14px",marginLeft:"5px",}}>создать аккаунт </a></Link>
                <button style={{margin: "20px 0px"}} onClick={handleLogin}>войти</button>
                <button onClick={signInWithGoogle}>Войти с помошью google</button>

            </div>
        </CSSTransition>
    );
};

export default Auth;
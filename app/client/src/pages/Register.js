import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import "../components/style/components.css"
import successful from "../img/check.png"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../store/reducer/userSlice";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Successful = styled.div`
  margin-top: 5px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #00a41f;
`;

const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [check,setCheck]=useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleReg = async ()=>{
        if(name && email && password){
            await axios.post("/auth/signup",{
                name:name,
                email:email,
                password:password
            })
            setCheck(true)
            const res = await axios.post("/auth/signin",{
                name:name,
                password:password
            })
            res.status === 200 &&navigate('/')
            dispatch(loginSuccess(res.data))
            setCheck(false)
        }else{
            alert("заполните все поля")
        }
    }

    return (
        <Container>
            <h2>Регистрация</h2>
            <input onChange={(e)=>setName(e.target.value)} className={"input"} placeholder={"имя пользователя"}/>
            <input onChange={(e)=>setEmail(e.target.value)} className={"input"} placeholder={"email"}/>
            <input onChange={(e)=>setPassword(e.target.value)} className={"input"} placeholder={"пароль"}/>
            <div onClick={handleReg} className={"button"}>создать аккаунт</div>
            {check && <Successful>
                <img src={successful} style={{marginRight: "5px"}}/>
                <span>аккаунт успешно создан</span>
            </Successful>}
        </Container>
    );
};

export default Register;
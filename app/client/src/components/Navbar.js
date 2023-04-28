import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {SearchOutlined,VideoCallOutlined} from "@mui/icons-material";
import "./style/style.css"
import {useDispatch, useSelector} from "react-redux";
import {closeNavAction, openUploadAction, popupAction} from "../store/reducer/userSlice";
import Upload from "./Upload";
import Auth from "./Auth";
import Setting from "./Setting";
import {useNavigate} from "react-router-dom";


const Container = styled.div`
  background: white;
  z-index: 1;
  font-family: inherit;
  height: 60px;
  color: ${({theme}) => theme.text};
  font-size: 16px;
  position: sticky;
  top: 0;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const SearchIcon = styled.svg`
  position: absolute;
`;

const Navbar = () => {
    const {upload}=useSelector(state=>state.user)
    const {currentUser}=useSelector(state=>state.user)
    const {popup}=useSelector(state=>state.user)

    const [q,setQ]=useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        if (!currentUser){
            dispatch(closeNavAction(false))
        }

    },[currentUser])
    const openNav = ()=>{
        dispatch(closeNavAction(true))
    }
    const openUpload = ()=>{
        dispatch(openUploadAction(true))
    }
    const openPopup = ()=>{
        console.log(12)
        dispatch(popupAction())
    }


    return (
        <>
            <Container>
                <div className={"wrapper nav-wrapper"}>
                    <div className={"searcher"}>
                        <Input placeholder="Search"
                        onChange={(e)=>setQ(e.target.value)}
                        />
                        <div className={SearchIcon}>
                            <SearchOutlined onClick={()=>navigate(`/search?q=${q}`)}/>
                        </div>
                    </div>
                    <div className="userFunc">
                        <div className="addVideo use-box">
                            <VideoCallOutlined onClick={openUpload}/>видео
                        </div>
                        {currentUser ?
                            <User>
                                <div style={{display:"flex",alignItems:"center"}} onClick={openPopup}>
                                    <Avatar style={{marginRight:"10px"}} src={currentUser.img}/>
                                    {currentUser.name}
                                </div>
                                {popup && <Setting/>}
                            </User>

                            : <div onClick={openNav} className="userIcon use-box">войти</div>}
                    </div>
                </div>
            </Container>
            {upload && <Upload/>}
        </>
    );
};

export default Navbar;
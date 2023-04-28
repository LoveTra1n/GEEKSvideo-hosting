import React from 'react';
import styled from "styled-components";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {logout, popupAction} from "../store/reducer/userSlice";
import {Link} from "react-router-dom";
import {fetchChannel} from "../store/reducer/videoSlice";

const PopUp =styled.div`
  position: absolute;
  top: 35px;
  right: 0px;
  min-width: 190px;
  min-height: 190px;
  border-radius: 15px;
  padding: 10px;
  background: #f2f4f8;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`
const PopSettings =styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Setting = () => {
    const dispatch= useDispatch()
    const handleLogout = ()=>{
        dispatch(logout())
    }
    const {currentUser} = useSelector(state=>state.user)

    const {popup} =useSelector(state=>state.user)
    const myChannel =()=>{
        dispatch(fetchChannel(currentUser))
        dispatch(popupAction(false))
    }
    return (
        <PopUp>
            <Link onClick={myChannel} to={`/channel/${currentUser._id}`} style={{textDecoration:"none",color:"black"}}>
                <PopSettings><AccountBoxIcon/>мой канал</PopSettings>
            </Link>
                <PopSettings><SettingsIcon/>настройки</PopSettings>
                <PopSettings onClick={handleLogout}><LogoutIcon/>выйти</PopSettings>
        </PopUp>
    );
};

export default Setting;
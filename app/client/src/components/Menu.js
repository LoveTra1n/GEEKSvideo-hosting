import React, {useEffect} from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import {Whatshot} from "@mui/icons-material";
import {Folder} from "@mui/icons-material";
import logo from "../img/logo.png"
import {Link} from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useDispatch, useSelector} from "react-redux";
import SubIcon from "./SubIcon";
import {loginSuccess} from "../store/reducer/userSlice";
import axios from "axios";
const Wrapper = styled.div`
  height: 100%;
  padding: 18px 16px;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  transition: 300ms;
  .svg{
    margin: 5px;
  }
  &:hover {
    border-radius: 10px;
    background-color: #fbe900;
  }
`;

const Menu = () => {
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchUser=async ()=>{
            const res= await axios.get(`/users/find/${currentUser._id}`)
            dispatch(loginSuccess(res.data))
        }
        fetchUser()
    },[])


    return (
        <div className={"container"}>
            <Wrapper>
                <div className={"logo-block"}>
                    <img src={logo} style={{height:"60px"}}/>
                    <span>VIDEO</span>
                </div>

                <div style={{textDecoration:"none", color:"inherit", marginBottom:"50px"}}>
                    <Link to={"/"} style={{textDecoration:"none", color:"inherit"}}>
                        <Item>
                            <HomeIcon/>
                            главная
                        </Item>
                    </Link>
                    <Link to={"trend"} style={{textDecoration:"none", color:"inherit"}}>
                        <Item>
                            <Whatshot/>
                            в тренде
                        </Item>
                    </Link>
                    <Link to={"subscriptions"} style={{textDecoration:"none", color:"inherit"}}>
                        <Item>
                            <Folder/>
                            подписки
                        </Item>
                    </Link>
                </div>
                <Link to={"/history"} style={{textDecoration:"none", color:"inherit"}}>
                    <Item>
                        <AccessTimeIcon/>
                        история
                    </Item>
                </Link>
                <div style={{marginLeft:"3px",marginTop:"10px",fontWeight:"bold"}}>Ваши подписки</div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    {currentUser.subscribedUsers.map((i)=><SubIcon id={i}/>)}
                </div>
            </Wrapper>
        </div>
    );
};

export default Menu;
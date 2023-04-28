import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import HistoryCard from "../components/HistoryCard";
import axios from "axios";
import {loginSuccess} from "../store/reducer/userSlice";
const History = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [videos,setVideos]= useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        const updateUser = async ()=>{
            const res = await axios.get(`/users/find/${currentUser._id}`)
            console.log(res.data)
            dispatch(loginSuccess(res.data))
        }
        updateUser()
        const sorted = [...new Set(currentUser?.viewed)]
        setVideos(sorted)

    },[])
    return (
        <div>
            <div style={{marginBottom:"20px", fontSize:"24px", fontWeight:"bold", color:"#gray"}}>Ваши недавние просмотры :)</div>
            {videos.map((i)=><HistoryCard id={i}/>)}

        </div>
    );
};

export default History;
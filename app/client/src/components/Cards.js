import React, {useEffect, useState} from 'react';
import "./style/style.css"
import {format} from "timeago.js";
import axios from "axios";
import {Link} from "react-router-dom";

const Cards = ({type,data}) => {

    const [channel,setChannel]=useState([])

    useEffect(()=>{
        const fetchChannel = async () =>{
            const res = await axios.get(`/users/find/${data.userId}`)
            setChannel(res.data)
        }
        fetchChannel()
    },[data.userId])

    return (
        <Link to={`/video/${data._id}`} style={{textDecoration:"none",color: "black"}}>
            <div className={"card"}>
                <img src={data.imgUrl}/>
                <div className="channel">
                    <div className="channelIMG">
                        <img src={channel.img}/>
                    </div>
                    <div className="channelInfo">
                        <p style={{fontWeight:"bold",fontSize:"20px", marginBottom:"-10px"}}>{data.title}</p>
                        <p style={{marginBottom:"-5px", color:"gray"}}>{channel.name}</p>
                        <p style={{color: "gray"}}>{data.views} просмотры  ● {format(data.createdAt)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Cards;
import React, {useEffect, useState} from 'react';
import axios, {get} from "axios";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import styled from "styled-components";

const Preview = styled.div`
margin-right: 10px;
`;
const Channel = styled.div``;
const Card = styled.div`
  display: flex;
  margin-bottom: 6px;
  width: 380px;
`;
const Img =styled.img`
  width: 200px;
  height: 120px;
  background: #b2b2b2;
`;

const MIniCard = ({id}) => {

    const [video,setVideo]=useState({})
    const [channel,setChannel]=useState({})

    useEffect(()=>{
        const fetchVideo = async() =>{
            const res = await axios.get(`/video/find/${id}`)
            setVideo(res.data)
            const user = await axios.get(`/users/find/${video.userId}`)
            setChannel(user.data)
        }
        fetchVideo()

    },[id])

    return (
       <Link to={`/video/${id}`} style={{textDecoration:"none",color: "black"}}>
           <Card>
               <Preview>
                   <Img src={video?.imgUrl}/>
               </Preview>
               <Channel>
                   <div className="channelInfo">
                       <p style={{fontWeight:"bold",fontSize:"20px", marginBottom:"-10px", marginTop:"3px"}}>{video?.title}</p>
                       <p style={{marginBottom:"-5px",marginTop:"20px", color:"gray"}}>{channel?.name}</p>
                       <p style={{color: "gray"}}>{video?.views} просмотры</p>
                       <p style={{color: "gray",marginTop:"-15px"}}>{format(video?.createdAt)}</p>
                   </div>
               </Channel>
           </Card>
       </Link>
    );
};

export default MIniCard;
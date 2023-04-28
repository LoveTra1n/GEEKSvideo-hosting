import React, {useEffect, useState} from 'react';
import axios from "axios";
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

const MIniCard = ({data,id}) => {
    const [channel,setChannel]=useState({})
    useEffect(()=>{
        const fetchData=async ()=>{
            try {
                const res = await axios.get(`/users/find/${data.userId}`)
                setChannel(res.data)
            }catch (e){}
        }
        fetchData()
    },[])




    return (
        <Link to={`/video/${data?._id}`} style={{textDecoration:"none",color: "black"}}>
            <Card>
                <Preview>
                    <Img src={data?.imgUrl}/>
                </Preview>
                <Channel>
                    <div className="channelInfo">
                        <p style={{fontWeight:"bold",fontSize:"20px", marginBottom:"-10px", marginTop:"3px"}}>{data?.title}</p>
                        <p style={{marginBottom:"-5px",marginTop:"20px", color:"gray"}}>{channel.name}</p>
                        <p style={{color: "gray"}}>{data?.views} просмотры</p>
                        <p style={{color: "gray",marginTop:"-15px"}}>{format(data?.createdAt)}</p>
                    </div>
                </Channel>
            </Card>
        </Link>
    );
};

export default MIniCard;
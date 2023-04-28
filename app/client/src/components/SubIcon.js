import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const SubIcon = ({id}) => {
    const [channel,setChannel]=useState({})
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(`/users/find/${id}`)
            setChannel(res.data)
            console.log(res.data)
        }
        fetchData()
    },[])

    return (
        <div>
            <div style={{display:"flex",alignItems:"center", marginTop:"10px"}}>
                <Avatar style={{marginRight:"10px"}} src={channel.img}/>
                {channel.name}
            </div>
        </div>
    );
};

export default SubIcon;
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {logout, subscription} from "../store/reducer/userSlice";
import MIniCard from "../components/MIniCard";
import Cards from "../components/Cards";

const Wallpaper = styled.div`
  width: 100%;
  height: 200px;
  background: #b2b2b2;
`


const ChannelInfo = styled.div`
  margin-top: 10px;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: #b2b2b2 1px solid;
  border-radius: 10px;
`;

const Image = styled.img`
  margin-bottom: 15px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
`;

const Left = styled.div`
  display: flex;
`;
const Right = styled.div`
  padding-top: 4px;
`
const Subscribe = styled.button`
  background-color: #fadd21;
  font-weight: 500;
  color: #000000;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-left: 5px;
  font-size: 18px;
  font-weight: bold;
`
const Render =styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
`

const Channel = () => {
    const {currentChannel}=useSelector(state=>state.video)
    const {currentUser}=useSelector(state=>state.user)
    const [video,setVideo]=useState([])
    const [thisVideos,setThisVideos]=useState([])

    const dispatch = useDispatch()

    const handleSub = async () => {
        currentUser.subscribedUsers.includes(currentChannel._id)
            ? await axios.put(`/users/unsub/${currentChannel._id}`)
            : await axios.put(`/users/sub/${currentChannel._id}`);
        dispatch(subscription(currentChannel._id));
    };

    const sortVideo = (data)=>{
        // const arr = data.includes(data.userId)
        for(let prop in data){
            const arr = data[prop]
            if (arr.userId === currentChannel._id){
                setThisVideos([...thisVideos,arr])
            }
        }
    }

    useEffect(()=>{
        const getVideo = async ()=>{
            const res = await axios.get("/video/random")
            setVideo(res.data)
        }
        getVideo()

    },[currentChannel])

    const [count,setCount]=useState(true)

    useEffect(()=>{
                sortVideo(video)
    },[video])


    return (
        <div>
            <Wallpaper></Wallpaper>
            <ChannelInfo>
                <Left>
                    <Image src={currentChannel.img}/>
                    <ChannelDetail>
                        <ChannelName>{currentChannel.name}</ChannelName>
                        <ChannelCounter>{currentChannel.subscribers} последователи</ChannelCounter>
                    </ChannelDetail>
                </Left>
                <Right>
                    {currentUser ?
                            <Subscribe onClick={handleSub}>
                                {
                                    currentUser.subscribedUsers?.includes(currentChannel._id)
                                        ? "ОТПИСАТЬСЯ"
                                        : "ПОДПИСАТЬСЯ"
                                }
                            </Subscribe>
                            :
                            <Subscribe>авторизуйтесь</Subscribe>
                    }
                </Right>
            </ChannelInfo>
            <Text>Видео ▶</Text>
            <Render>
                {thisVideos.map((video)=><Cards data={video}/> )}
            </Render>
        </div>
    );
};

export default Channel;
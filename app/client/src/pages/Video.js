import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation,Link} from "react-router-dom";
import axios from "axios";
import {dislike, fetchChannel, fetchSuccess, like} from "../store/reducer/videoSlice";
import styled from "styled-components";
import {format} from "timeago.js";
import Comments from "../components/Comments";
import {ThumbUpOutlined} from "@mui/icons-material";
import {ThumbDownOffAltOutlined} from "@mui/icons-material";
import ThumbDown from "@mui/icons-material/ThumbDown";
import ThumbUp from "@mui/icons-material/ThumbUp";
import {loginSuccess, subscription} from "../store/reducer/userSlice";
import MIniCard from "../components/MIniCard";

const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  max-width: 800px;
  height: 450px;
  width: 100%;
  object-fit: cover;
`;
const Title = styled.text`
  margin-top: -15px;
  font-size: 24px;
  font-weight: bold;
  color: #444343;
`;
const Details = styled.div`
  
  min-height: 80px;
  padding: 15px 15px;
  margin-top: -20px;
  border: #e7e8ea solid;
  background: #e7e8ea;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const Info = styled.span`
  color: black;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  text-decoration: none;
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

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

const RangeSub = styled.div`
  display: flex;
  align-items: center;
`


const Video = () => {

    const { currentUser } = useSelector(state => state.user);
    const { currentVideo } = useSelector(state => state.video);
    const[video,setVideo]= useState([])
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    const [channel, setChannel] = useState({});
    const handleLike = async ()=>{
        await axios.put(`/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
    }
    const handleDislike = async ()=>{
        await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))
    }
    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`/users/unsub/${channel._id}`)
            : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`/video/find/${path}`);
                const channelRes = await axios.get(
                    `/users/find/${videoRes.data.userId}`
                );
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
            } catch (err) {}
        };
        fetchData();
    }, [path, dispatch]);

    const channelFetch = ()=>{
        dispatch(fetchChannel(channel))
    }

    useEffect(()=>{
        const addView = async ()=>{
            await axios.put(`/video/view/${currentVideo._id}`)
        }
        const viewed = async ()=>{
            await axios.put(`/users/viewed/${currentVideo._id}`)
        }
        const updateUser = async ()=>{
            const res = await axios.get(`/users/find/${currentUser._id}`)
            dispatch(loginSuccess(res.data))
        }
        addView()
        viewed()
        updateUser()
    },[])
    useEffect(()=>{
        const fetchVideo =async ()=>{
            const res = await axios.get("/video/random")
            setVideo(res.data)
        }
        fetchVideo()
    },[])

    return (
        <div style={{display:"flex"}}>
            <Container>
                <VideoWrapper>
                    <VideoFrame src={currentVideo?.videoUrl} controls />
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Channel>
                    <Link onClick={channelFetch} to={`/channel/${channel._id}`} style={{textDecoration:"none",color:"black"}}>
                        <ChannelInfo>
                            <Image src={channel?.img} />
                            <ChannelDetail>
                                <ChannelName>{channel?.name}</ChannelName>
                                <ChannelCounter>{channel?.subscribers} последователи</ChannelCounter>
                            </ChannelDetail>
                        </ChannelInfo>
                    </Link>
                    <RangeSub>
                        <Buttons style={{height:"30px", marginRight:"15px"}}>
                            <Button onClick={handleLike}>
                                {currentVideo?.likes?.includes(currentUser?._id) ? (
                                    <ThumbUp />
                                ) : (
                                    <ThumbUpOutlined />
                                )}{" "}
                                {currentVideo?.likes?.length}
                            </Button>
                            <Button onClick={handleDislike}>
                                {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                                    <ThumbDown />
                                ) : (
                                    <ThumbDownOffAltOutlined />
                                )}{" "}

                            </Button>


                        </Buttons>
                        {currentUser ?
                            <Subscribe onClick={handleSub}>
                                {
                                    currentUser?.subscribedUsers?.includes(channel._id)
                                        ? "ОТПИСАТЬСЯ"
                                        : "ПОДПИСАТЬСЯ"
                                }
                            </Subscribe>
                            :
                            <Subscribe>авторизуйтесь</Subscribe>
                        }
                    </RangeSub>

                </Channel>
                <Details>
                    <Info>
                        {currentVideo?.views} просмотров • {format(currentVideo?.createdAt)}
                    </Info>
                    <Description>
                        {currentVideo?.desc}
                    </Description>
                </Details>

                <Comments videoId={currentVideo?._id}/>

            </Container>
            <div style={{marginLeft:"40px",display:"flex",flexDirection:"column"}}>
                {video.map((i)=><MIniCard data={i}/> )}
            </div>

        </div>
    );
};

export default Video;
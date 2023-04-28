import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cards from "../components/Cards";
import "../components/style/style.css"

const Home = ({type}) => {
    const [videos,setVideos]=useState([])



    useEffect(()=>{
        const fetchVideo = async () =>{
            const res = await axios.get(`/video/${type}`)
            setVideos(res.data)
            console.log(res.data)
        }
        fetchVideo()
    },[type])

    return (
        <div className={"wrapper"}>
            {videos.map((video)=><Cards data={video}/>)}
        </div>
    );
};

export default Home;
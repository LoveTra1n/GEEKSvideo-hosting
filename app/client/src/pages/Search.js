import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MIniCard from "../components/MIniCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/video/search${query}`);
            setVideos(res.data);
            console.log(res.data)
        };
        fetchVideos();
    }, [query]);

    return <Container>
        {videos.map(video=>(
            <MIniCard key={video._id} data={video}/>
        ))}
    </Container>;
};

export default Search;
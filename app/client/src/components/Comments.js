import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import Comment from "./Comment";
import axios from "axios";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {
    const {currentUser}=useSelector(state=>state.user)
    const [comments,setComments] = useState([])
    const [userComment,setUserComment] = useState("")

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {}
        };
        fetchComments();
    }, []);

    const sendComment = async(e)=>{
        if (e.keyCode == 13) {
            console.log(1222)
            await axios.post("/comments",{"desc":`${userComment}`,"videoId":`${videoId}`})
            setUserComment("")
        }
    }
    const handleComment = (e)=>{
        setUserComment(e.target.value)
    }

    return (
        <Container>
            <NewComment>
                <Avatar src={currentUser && currentUser.img} />
                <Input value={userComment} onChange={handleComment} onKeyDown={currentUser && sendComment} placeholder={currentUser?"добавить комметарий":"авторизуйтесь что оставить комментарий"}/>
            </NewComment>
            {comments.map((item)=> <Comment comment={item} key={item._id}/>)}
        </Container>
    );
};

export default Comments;
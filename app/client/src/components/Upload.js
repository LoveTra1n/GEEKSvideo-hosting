import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../firebase";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {openUploadAction} from "../store/reducer/userSlice";

const Container = styled.div`
  z-index: 3;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  border-radius: 15px;
  width: 600px;
  height: 600px;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  align-items: center;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  max-width: 502px;
  border: 1px solid gray;
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  outline: none;
  
  
`;
const Desc = styled.textarea`
  width: 80%;
  border: 1px solid gray;
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  resize: none;
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  outline: none;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Video= styled.div`
`
const Preview= styled.div`
  
`
const VideoAndPreviewUploading= styled.div`
  width: 502px;
  display: flex;
  justify-content: space-between;
`

const Upload = ({setOpen}) => {
    const navigate = useNavigate()
    const [img,setImg]=useState(undefined)
    const [video,setVideo]=useState(undefined)
    const [videoPerc,setVideoPerc]=useState(undefined)
    const [imgPerc,setImgPerc]=useState(undefined)
    const [inputs,setInputs]=useState({})
    const [tags,setTags]=useState([])
    const {upload}=useSelector(state=>state.user)

    const handleText = (e)=>{
        const arr =e.target.value.split(",")
        setTags(arr)
    }
    const handleChange = (e)=>{
        setInputs(prevState => {
            return {...prevState, [e.target.name]:e.target.value}
        })
    }
    const uploadFile =(file, urlType)=>{
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prevState => {
                        return {...prevState, [urlType]: downloadURL}
                    })
                });
            }
            )
    }


    useEffect(()=>{
        video && uploadFile(video, "videoUrl")

    },[video])
    useEffect(()=>{
        img && uploadFile(img, "imgUrl")

    },[img])

    const handleUpload = async (e)=>{
        e.preventDefault()
        const res = await axios.post("/video", {...inputs,tags})
        res.status ===200 && navigate(`/video/${res.data._id}`)
        upload(false)

    }
    const dispatch = useDispatch()
    const close = ()=>{
        dispatch(openUploadAction(false))
    }
    return (
        <Container>
            <Wrapper>
                <Close onClick={close}>×</Close>
                <Title>Загрузите видео</Title>
                <VideoAndPreviewUploading>
                    {videoPerc>0? ("загрузжено" + videoPerc):<Video>
                        <Label>Видео</Label>
                        <Input placeholder={"видео"} type={"file"} accept={"video/*"}
                               onChange={e => setVideo(e.target.files[0])}/>
                    </Video>}
                    <Preview>
                        <Label>Превью:</Label>
                        {imgPerc > 0 ? ("загружено" + imgPerc) :<Input placeholder={"првеью"} type={"file"} accept={"image/*"}
                                onChange={e => setImg(e.target.files[0])}/>}
                    </Preview>
                </VideoAndPreviewUploading>
                <Input onChange={handleChange}
                       style={{width:"502px",boxSizing:"border-box"}}
                       type={"tex"}
                       placeholder={"название"}
                       name="title"
                />

                <Desc
                    onChange={handleChange}
                    placeholder={"описание"} rows={8}
                    name="desc"
                />
                <Input onChange={handleText} style={{width:"502px",boxSizing:"border-box"}} placeholder={"тэги"} rows={8}/>
                <Button onClick={handleUpload}>создать видео</Button>
            </Wrapper>
        </Container>
    );
};

export default Upload;
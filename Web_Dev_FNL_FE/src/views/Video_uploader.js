import jwtDecode from "jwt-decode";
import React from "react";
import {Video_uploader} from '../components/Basic_Templates/Video_uploader.jsx';
import {ImageUpload} from '../components/ImageUpload/ImageUpload.js';
import { useState } from "react";
import { Button } from "@mui/material";
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
import { get_videos,Upload_video,add_video_to_course } from "../APIs/TeacherAPI.jsx";
import { Col, Row } from "reactstrap";
// import "./styleSheet.css"

function Videos(){
    // const [VideoData, setVideoData] = useState();
    const [VideoName, setVideoName] = useState();
    // const [VideoThumbnail, setVideoThumbnail] = useState();

    async function handleSubmit(){

        let url = window.sessionStorage.getItem("VideoURL");
        let thumbnail = window.sessionStorage.getItem("ThumbnailURL");
        await Upload_video(VideoName  ,url ,thumbnail).then(async (res)=>{
            let x =  await get_videos();
            console.log(x)
            return x;
        }).then(async (res)=>{
            console.log(res)
            let y = await add_video_to_course(res);
            console.log(y)
        }).then(()=>{
            let token = window.localStorage.getItem("authtoken");

            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            if(role == "2"){
            window.location.href = "/teacher/course";}
            else{
                window.location.href = "/admin/course";
            }
        }).catch((err)=>{
            console.log(err);
        })
        
    }

    return(
        <div className = "content">
            <MDBCard>
                <MDBCardBody>
                <Video_uploader/>
                <Col>
                <ImageUpload/>
                <MDBInput wrapperClass='mb-4' label='Name*' value={VideoName} onChange={(e)=> setVideoName(e.target.value)} id='form1' type='text' />
                <Row style={{justifyContent : "center"}}>
                <Button onClick = {handleSubmit}  style={{justifySelf : "flex-center"  ,color : "#A31ACD"}}>Upload</Button>
                </Row>
                </Col>
                </MDBCardBody>
            </MDBCard>
        </div>
    )

}

export default Videos;
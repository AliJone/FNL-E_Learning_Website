import React from "react";
import jwtDecode from "jwt-decode";
import {FileUpload} from '../components/DocUpload/Document_Upload.js';
// import {ImageUpload} from '../components/ImageUpload/ImageUpload.js';
import { useState } from "react";
import { Button } from "@mui/material";
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
import { get_Material,Upload_Material,add_Material_to_course} from "../APIs/TeacherAPI.jsx";
import { Col, Row } from "reactstrap";

export function Material_Upload(){
    const [MaterialName, setMaterialName] = useState();

    const HandleUpload = async () =>{
        let url = window.sessionStorage.getItem("MaterialURL");
        // let thumbnail = window.sessionStorage.getItem("ThumbnailURL");
        await Upload_Material(MaterialName  ,url ).then(async (res)=>{
            let x =  await get_Material();
            console.log(x)
            return x;
        }).then(async (res)=>{
            console.log(res)
            let y = await add_Material_to_course(res);
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

    return (
        <div className="content">
        <MDBCard >
            <MDBCardBody>
            <FileUpload/>
            <br/>
            <MDBInput wrapperClass='mb-4' label='Name*'  id='form1' type='text' value = {MaterialName}  onChange={(e) => {setMaterialName(e.target.value)}}/>
            <Col>
            <Row style={{justifyContent : "center"}} >
            <Button onClick={HandleUpload}  style={{justifySelf : "flex-center"  ,color : "#A31ACD"}}>Upload</Button>
            </Row>
            </Col>
            </MDBCardBody>
        </MDBCard>
        </div>
    );
}
export default Material_Upload;
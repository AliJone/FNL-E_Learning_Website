import React from "react";
import { create_Course,get_Course_id,add_Course_to_teacher } from "APIs/TeacherAPI.jsx";
import jwtDecode from "jwt-decode";
// import {ImageUpload} from '../components/ImageUpload/ImageUpload.js';
import { useState } from "react";
import { Button } from "@mui/material";
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
import { Col, Row } from "reactstrap";

export function CourseUpload(){

  const [Name, setName] = useState("");
  const [Language, setLanguage] = useState("");
  const [Topic, setTopic] = useState("");
  const [Description, setDescription] = useState("");

  const onSubmit = async () =>{
    // console.log(` Name : ${Name}`,`Language: ${Language}`, Topic,Description)
      await create_Course(Name ,Language, Topic , Description ).then(async (res)=>{
        let x =  await get_Course_id();
        console.log(x)
        return x;
    })
    .then(async (res)=>{
        console.log(res)
        let y = await add_Course_to_teacher(res);
        console.log(y)
    })
    .then(()=>{
      let token = window.localStorage.getItem("authtoken");
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (role ==="2"){
        window.location.href = "/teacher/Course_Offered";
      }
      else{
        window.location.href = "/admin/Course_Offered";
      }
    }).catch((err)=>{
        console.log(err);
    })

  }
  
  return (
      <>
      <div className="content">
        <MDBCard>
          <MDBCardBody>
            <Row>
              <Col md="12">
                <h3>Course Upload</h3>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <MDBInput label="Course Name" type="text" value = {Name} onChange={(e)=>{setName(e.target.value)}} />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <MDBInput label="Language" type="text" value = {Language} onChange={(e)=>{setLanguage(e.target.value)}}/>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <MDBInput label="Topic" type="text" value = {Topic} onChange={(e)=>{setTopic(e.target.value)}}/>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <MDBInput label="Course Description" type="text" value = {Description} onChange={(e)=>{setDescription(e.target.value)}} />
              </Col>
            </Row>
            <Row style = {{justifyContent :"center"}}>
                <Button variant="text" style = {{color : '#c44b99'}} onClick={onSubmit}>Upload</Button>
            </Row>

          </MDBCardBody>
          </MDBCard>
      </div>
      </>
  );
}
export default CourseUpload;
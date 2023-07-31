import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button } from "@mui/material";
import { getStudentTeacherData,deleteStudentTeacherData } from "../APIs/userAPIs.jsx";
import "../components/Basic_Templates/styleSheet.css";

function AddNDelete() {
  const [data, setData] = useState(null);
  const handleStudentDelete = async (UserName) => {
    console.log("UserName", UserName);
    await deleteStudentTeacherData(UserName);
    fetchStudentTeacherData();
  };
  
  const handleTeacherDelete = async (UserName) => {
    console.log("UserName", UserName);
    await deleteStudentTeacherData(UserName);
    fetchStudentTeacherData();
  };
  
  const UserCard = ({ user }) => (
    <Card className="inCard">
      <div onClick = {()=>handleStudentDelete(user?.UserName)} style = {{justifySelf : "flex-end" , color : '#c44b99', cursor: 'pointer',paddingLeft:"10px"}}>Delete</div>
      <CardHeader>
        <h3 className="title">{user.Name}</h3>
      </CardHeader>
      <CardBody>
        <p>Email: {user.Email}</p>
        <p>Bio: {user.BIO}</p>
        {/* Add more user details here */}
      </CardBody>
    </Card>
  );
  
  const TeacherCard = ({ teacher }) => (
    <Card className="inCard">
      <div onClick = {()=>handleTeacherDelete(teacher?.UserName)} style = {{justifySelf : "flex-end" , color : '#c44b99', cursor:'pointer',paddingLeft:"10px"}}>Delete</div>
      <CardHeader>
        <h3 className="title">{teacher.Name}</h3>
      </CardHeader>
      <CardBody>
        <p>Email: {teacher.Email}</p>
        <p>Bio: {teacher.BIO}</p>
        {/* Add more teacher details here */}
      </CardBody>
    </Card>
  );
  function fetchStudentTeacherData() {
    getStudentTeacherData()
      .then((fetchedData) => {
        console.log("fetchedData", fetchedData);
        setData(fetchedData);
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
  
  fetchStudentTeacherData();
}, []);


  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h3 className="title">Student Information</h3>
        </CardHeader>
        {data &&
          data?.studentData?.message &&
          data?.studentData?.message?.map((x) => <UserCard user={x} />)}
      </Card>
      <Card>
        <CardHeader>
          <h3 className="title">Teacher Information</h3>
        </CardHeader>

        {data &&
          data?.teacherData?.message &&
          data?.teacherData?.message.map((x) => <TeacherCard teacher={x} />)}
      </Card>
    </div>
  );
}

export default AddNDelete;

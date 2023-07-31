import React from "react";
import {  Col} from "reactstrap";
import {Button} from "@mui/material";
import "./styleSheet.css";
import jwtDecode from 'jwt-decode';
import { IoCloseCircleSharp } from "react-icons/io5";
import { remove_Course_from_teacher,delete_Course } from "APIs/TeacherAPI";





export const CourseOfferedCardTemplate = (props) => {
    const id = props._id;
    
    

    function handleButtonClick(){
        
        window.sessionStorage.setItem("CourseID", id);
        let token = window.localStorage.getItem("authtoken");

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        if(role == "2"){
        window.location.href = "/teacher/course";}
        else if(role == "1"){
            window.location.href = "/admin/course";
            }
        else{
            window.location.href = "/student/course";
            }
    
    }

    function handleDelete(){
        async function Delete(){
      
            await remove_Course_from_teacher(props._id)
            await delete_Course(props._id);
          }
        Delete();
    }

    return (
    <>
        <Col lg="3" md="6" sm="4" className="content">
        
        {props.isDelete? <></> : <IoCloseCircleSharp onClick = {handleDelete} style = {{justifySelf : "flex-end" , color : '#c44b99'}} size = {30}/>}
            <div className="font-icon-list" >
            <div className="font-icon-detail">
            
                <i className="tim-icons icon-coins" />
                <div className = "Title">
                {props.title}
                </div>
                <div className="Description">
                {props.desc}
                </div>
                <Button variant="text" onClick={handleButtonClick} className="Button"  >Show Details</Button>
                
            </div>
            </div>
        </Col>  
    </>
    );
}
